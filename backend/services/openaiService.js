const OpenAI = require('openai');
const logger = require('../utils/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class OpenAIService {
  static async generateQuestion(type, category, difficulty = 'medium') {
    try {
      const systemPrompt = `You are an expert interview coach. Generate ${type} interview questions.
        - Type: ${type} (coding or behavioral)
        - Category: ${category}
        - Difficulty: ${difficulty}
        - Provide clear, realistic interview questions
        - For coding questions, include problem description and expected approach
        - For behavioral questions, focus on common interview scenarios`;

      const userPrompt = type === 'coding' 
        ? `Generate a ${difficulty} level coding question about ${category}. Include:
           - Problem statement
           - Example input/output
           - Constraints
           - Hints (but don't give away the solution)`
        : `Generate a behavioral question about ${category}. Include:
           - The question
           - What the interviewer is looking for
           - Key points to cover in the answer`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to generate question with OpenAI');
    }
  }

  static async provideHint(question, currentAnswer = '') {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful coding interview coach. Provide hints that guide without giving away the solution.'
          },
          {
            role: 'user',
            content: `Question: ${question}\n\nCurrent attempt: ${currentAnswer || 'No attempt yet'}\n\nProvide a helpful hint:`
          }
        ],
        temperature: 0.5,
        max_tokens: 300
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error('OpenAI hint generation error:', error);
      throw new Error('Failed to generate hint');
    }
  }

  static async evaluateAnswer(question, answer, questionType) {
    try {
      const systemPrompt = questionType === 'coding'
        ? 'You are an expert technical interviewer. Evaluate coding solutions based on correctness, efficiency, code quality, and best practices. Provide a score from 0-100.'
        : 'You are an expert behavioral interviewer. Evaluate answers based on clarity, use of STAR method, relevance, and depth. Provide a score from 0-100.';

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Question: ${question}\n\nAnswer: ${answer}\n\nProvide evaluation and score (0-100):`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      });

      const response = completion.choices[0].message.content;
      
      // Extract score from response (look for number between 0-100)
      const scoreMatch = response.match(/\b(\d{1,2}|100)\b/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

      return {
        score,
        feedback: response,
        provider: 'openai'
      };
    } catch (error) {
      logger.error('OpenAI evaluation error:', error);
      throw new Error('Failed to evaluate answer');
    }
  }

  static async chatCompletion(messages) {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error('OpenAI chat error:', error);
      throw new Error('Failed to get chat response');
    }
  }
}

module.exports = OpenAIService;

