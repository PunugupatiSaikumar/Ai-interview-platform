const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiService {
  static async generateQuestion(type, category, difficulty = 'medium') {
    try {
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });

      const prompt = type === 'coding'
        ? `Generate a ${difficulty} level coding interview question about ${category}. Include:
           - Problem statement
           - Example input/output
           - Constraints
           - Hints (but don't give away the solution)
           
           Format your response clearly.`
        : `Generate a behavioral interview question about ${category}. Include:
           - The question
           - What the interviewer is looking for
           - Key points to cover in the answer`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Gemini API error:', error);
      throw new Error('Failed to generate question with Gemini');
    }
  }

  static async provideHint(question, currentAnswer = '') {
    try {
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });

      const prompt = `Question: ${question}\n\nCurrent attempt: ${currentAnswer || 'No attempt yet'}\n\nProvide a helpful hint that guides without giving away the solution:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Gemini hint generation error:', error);
      throw new Error('Failed to generate hint');
    }
  }

  static async evaluateAnswer(question, answer, questionType) {
    try {
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });

      const prompt = questionType === 'coding'
        ? `You are an expert technical interviewer. Evaluate this coding solution:
           
           Question: ${question}
           Answer: ${answer}
           
           Evaluate based on:
           - Correctness
           - Efficiency
           - Code quality
           - Best practices
           
           Provide feedback and a score from 0-100.`
        : `You are an expert behavioral interviewer. Evaluate this answer:
           
           Question: ${question}
           Answer: ${answer}
           
           Evaluate based on:
           - Clarity
           - Use of STAR method
           - Relevance
           - Depth
           
           Provide feedback and a score from 0-100.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract score from response
      const scoreMatch = text.match(/\b(\d{1,2}|100)\b/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

      return {
        score,
        feedback: text,
        provider: 'gemini'
      };
    } catch (error) {
      logger.error('Gemini evaluation error:', error);
      throw new Error('Failed to evaluate answer');
    }
  }

  static async chatCompletion(messages) {
    try {
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-pro' });

      // Convert messages to Gemini format - build conversation context
      let prompt = '';
      
      // Build conversation history
      for (const msg of messages) {
        if (msg.role === 'system') {
          prompt += `${msg.content}\n\n`;
        } else if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      }
      
      // Ensure we end with Assistant: for the response
      if (!prompt.endsWith('Assistant: ')) {
        prompt += 'Assistant: ';
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Gemini chat error:', error);
      logger.error('Error details:', error.message);
      throw new Error('Failed to get chat response');
    }
  }
}

module.exports = GeminiService;

