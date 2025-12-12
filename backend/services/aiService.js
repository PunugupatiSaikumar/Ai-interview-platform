const OpenAIService = require('./openaiService');
const GeminiService = require('./geminiService');
const logger = require('../utils/logger');

class AIService {
  static selectProvider(preference = 'auto') {
    // Simple round-robin or preference-based selection
    if (preference === 'openai') return 'openai';
    if (preference === 'gemini') return 'gemini';
    
    // Auto: prefer OpenAI first (has credits), fallback to Gemini
    return 'openai';
  }

  static async generateQuestion(type, category, difficulty = 'medium', provider = 'auto') {
    const selectedProvider = provider === 'auto' ? this.selectProvider() : provider;
    
    try {
      if (selectedProvider === 'openai') {
        return {
          question: await OpenAIService.generateQuestion(type, category, difficulty),
          provider: 'openai'
        };
      } else {
        return {
          question: await GeminiService.generateQuestion(type, category, difficulty),
          provider: 'gemini'
        };
      }
    } catch (error) {
      logger.error(`Error with ${selectedProvider}, trying fallback...`, error);
      // Fallback to other provider
      const fallbackProvider = selectedProvider === 'openai' ? 'gemini' : 'openai';
      try {
        if (fallbackProvider === 'openai') {
          return {
            question: await OpenAIService.generateQuestion(type, category, difficulty),
            provider: 'openai'
          };
        } else {
          return {
            question: await GeminiService.generateQuestion(type, category, difficulty),
            provider: 'gemini'
          };
        }
      } catch (fallbackError) {
        logger.error('Both AI providers failed', fallbackError);
        throw new Error('Failed to generate question from AI providers');
      }
    }
  }

  static async provideHint(question, currentAnswer = '', provider = 'auto') {
    const selectedProvider = provider === 'auto' ? this.selectProvider() : provider;
    
    try {
      if (selectedProvider === 'openai') {
        return await OpenAIService.provideHint(question, currentAnswer);
      } else {
        return await GeminiService.provideHint(question, currentAnswer);
      }
    } catch (error) {
      logger.error(`Hint generation error with ${selectedProvider}`, error);
      throw error;
    }
  }

  static async evaluateAnswer(question, answer, questionType, provider = 'auto') {
    const selectedProvider = provider === 'auto' ? this.selectProvider() : provider;
    
    try {
      if (selectedProvider === 'openai') {
        return await OpenAIService.evaluateAnswer(question, answer, questionType);
      } else {
        return await GeminiService.evaluateAnswer(question, answer, questionType);
      }
    } catch (error) {
      logger.error(`Evaluation error with ${selectedProvider}`, error);
      throw error;
    }
  }

  static async chatCompletion(messages, provider = 'auto') {
    const selectedProvider = provider === 'auto' ? this.selectProvider() : provider;
    
    try {
      if (selectedProvider === 'openai') {
        return await OpenAIService.chatCompletion(messages);
      } else {
        return await GeminiService.chatCompletion(messages);
      }
    } catch (error) {
      logger.error(`Chat completion error with ${selectedProvider}, trying fallback...`, error);
      // Fallback to other provider
      const fallbackProvider = selectedProvider === 'openai' ? 'gemini' : 'openai';
      try {
        if (fallbackProvider === 'openai') {
          return await OpenAIService.chatCompletion(messages);
        } else {
          return await GeminiService.chatCompletion(messages);
        }
      } catch (fallbackError) {
        logger.error('Both AI providers failed for chat', fallbackError);
        throw new Error('Failed to get chat response from AI providers');
      }
    }
  }
}

module.exports = AIService;

