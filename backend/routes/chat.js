const express = require('express');
const { body, validationResult } = require('express-validator');
const AIService = require('../services/aiService');
const Session = require('../models/Session');
const Question = require('../models/Question');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Start a new chat session
router.post('/session', authenticate, [
  body('question_type').isIn(['coding', 'behavioral'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question_type } = req.body;
    const initialMessages = [
      {
        role: 'system',
        content: `You are an expert ${question_type} interview coach. Help the user practice and improve their interview skills.`
      }
    ];

    logger.info('Creating session for user:', req.user.id);
    logger.info('Session data:', { user_id: req.user.id, question_type, messages: initialMessages });
    
    const sessionId = await Session.create({
      user_id: req.user.id,
      question_type,
      messages: initialMessages
    });

    logger.info('Session created successfully:', sessionId);
    res.json({ sessionId, messages: initialMessages });
  } catch (error) {
    logger.error('Session creation error:', error);
    logger.error('Error stack:', error.stack);
    logger.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });
    res.status(500).json({ 
      error: 'Failed to create session',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { details: error.stack })
    });
  }
});

// Send a message in chat
router.post('/message', authenticate, [
  body('sessionId').notEmpty(),
  body('message').notEmpty(),
  body('action').optional().isIn(['question', 'hint', 'evaluate', 'chat'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sessionId, message, action = 'chat', provider = 'auto' } = req.body;

    // Get session
    const session = await Session.findById(sessionId);
    if (!session || session.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Session not found' });
    }

    let response;
    let questionData = null;

    // Add user message
    const updatedMessages = [
      ...session.messages,
      { role: 'user', content: message }
    ];

    switch (action) {
      case 'question':
        // Generate a new question
        const questionResult = await AIService.generateQuestion(
          session.question_type,
          'general',
          'medium',
          provider
        );
        response = questionResult.question;
        questionData = {
          question: questionResult.question,
          provider: questionResult.provider
        };
        break;

      case 'hint':
        // Provide a hint
        response = await AIService.provideHint(message, '', provider);
        break;

      case 'evaluate':
        // Evaluate an answer
        const evaluation = await AIService.evaluateAnswer(
          session.messages.find(m => m.role === 'assistant')?.content || message,
          message,
          session.question_type,
          provider
        );
        response = evaluation.feedback;
        
        // Save question and evaluation
        if (questionData) {
          await Question.create({
            user_id: req.user.id,
            type: session.question_type,
            category: 'general',
            question_text: questionData.question,
            answer: message,
            score: evaluation.score,
            ai_provider: evaluation.provider
          });
        }
        break;

      default:
        // Regular chat
        try {
          response = await AIService.chatCompletion(updatedMessages, provider);
        } catch (aiError) {
          logger.error('AI chat error:', aiError);
          // Provide helpful error message
          if (aiError.message.includes('quota') || aiError.message.includes('429')) {
            response = 'I apologize, but the AI service quota has been exceeded. Please check your API credits:\n- OpenAI: https://platform.openai.com/account/billing\n- Gemini: https://makersuite.google.com/app/apikey\n\nPlease add credits or verify your API keys are valid.';
          } else if (aiError.message.includes('API key') || aiError.message.includes('401')) {
            response = 'I apologize, but there\'s an issue with the API authentication. Please verify your API keys are correct in the .env file.';
          } else {
            response = `I apologize, but I encountered an error: ${aiError.message}. Please check your API keys and credits.`;
          }
          throw aiError; // Re-throw to trigger fallback
        }
    }

    // Add assistant response
    updatedMessages.push({ role: 'assistant', content: response });

    // Update session
    await Session.update(sessionId, updatedMessages);

    res.json({
      response,
      questionData,
      messages: updatedMessages
    });
  } catch (error) {
    logger.error('Chat message error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get session history
router.get('/sessions', authenticate, async (req, res) => {
  try {
    const sessions = await Session.findByUserId(req.user.id);
    res.json({ sessions });
  } catch (error) {
    logger.error('Sessions fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get specific session
router.get('/session/:id', authenticate, async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    logger.info('Fetching session:', sessionId, 'for user:', req.user.id);
    
    if (isNaN(sessionId)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }
    
    const session = await Session.findById(sessionId);
    
    if (!session) {
      logger.warn('Session not found:', sessionId);
      return res.status(404).json({ error: 'Session not found' });
    }
    
    if (session.user_id !== req.user.id) {
      logger.warn('Unauthorized access attempt:', { sessionId, userId: req.user.id, sessionUserId: session.user_id });
      return res.status(403).json({ error: 'Access denied' });
    }

    logger.info('Session fetched successfully:', sessionId);
    res.json({ session });
  } catch (error) {
    logger.error('Session fetch error:', error);
    logger.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch session',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { details: error.stack })
    });
  }
});

module.exports = router;

