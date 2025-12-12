const pool = require('../config/database');

class Question {
  static async create(questionData) {
    const { user_id, type, category, question_text, answer, score, ai_provider } = questionData;
    
    const [result] = await pool.execute(
      `INSERT INTO questions (user_id, type, category, question_text, answer, score, ai_provider, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [user_id, type, category, question_text, answer, score, ai_provider]
    );
    
    return result.insertId;
  }

  static async findByUserId(userId, limit = 50, offset = 0) {
    const [rows] = await pool.execute(
      `SELECT * FROM questions 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM questions WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async getStatsByCategory(userId) {
    const [rows] = await pool.execute(
      `SELECT category, 
              COUNT(*) as total,
              AVG(score) as avg_score,
              MAX(score) as max_score,
              MIN(score) as min_score
       FROM questions 
       WHERE user_id = ? 
       GROUP BY category`,
      [userId]
    );
    return rows;
  }

  static async getStatsByType(userId) {
    const [rows] = await pool.execute(
      `SELECT type, 
              COUNT(*) as total,
              AVG(score) as avg_score
       FROM questions 
       WHERE user_id = ? 
       GROUP BY type`,
      [userId]
    );
    return rows;
  }

  static async getRecentQuestions(userId, days = 7) {
    const [rows] = await pool.execute(
      `SELECT * FROM questions 
       WHERE user_id = ? 
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       ORDER BY created_at DESC`,
      [userId, days]
    );
    return rows;
  }
}

module.exports = Question;

