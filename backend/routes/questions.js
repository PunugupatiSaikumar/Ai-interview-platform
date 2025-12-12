const express = require('express');
const { body, validationResult } = require('express-validator');
const AIService = require('../services/aiService');
const Question = require('../models/Question');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');
const { getSampleQuestion } = require('../utils/sampleQuestions');

const router = express.Router();

// Generate a new question
router.post('/generate', authenticate, [
  body('type').isIn(['coding', 'behavioral']),
  body('category').notEmpty(),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, category, difficulty = 'medium', provider = 'auto' } = req.body;

    try {
      const result = await AIService.generateQuestion(type, category, difficulty, provider);
      res.json({
        question: result.question,
        provider: result.provider,
        type,
        category,
        difficulty
      });
    } catch (error) {
      logger.error('Question generation error:', error);
      
      // If both APIs fail, provide a sample question as fallback
      logger.warn('Using sample question as fallback');
      const sampleQuestion = getSampleQuestion(type, category, difficulty);
      
      res.json({
        question: sampleQuestion + '\n\n⚠️ **Note:** This is a sample question. AI generation is unavailable. Please check your API keys:\n- OpenAI: https://platform.openai.com/account/billing\n- Gemini: https://makersuite.google.com/app/apikey',
        provider: 'sample',
        type,
        category,
        difficulty,
        warning: 'AI APIs unavailable - showing sample question'
      });
    }
  } catch (error) {
    logger.error('Unexpected error:', error);
    res.status(500).json({ 
      error: 'An unexpected error occurred',
      details: error.message
    });
  }
});

// Get user's question history
router.get('/history', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const questions = await Question.findByUserId(req.user.id, limit, offset);

    res.json({ questions });
  } catch (error) {
    logger.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get question by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question || question.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ question });
  } catch (error) {
    logger.error('Question fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

module.exports = router;

