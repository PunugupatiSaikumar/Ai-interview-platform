const pool = require('../config/database');

class Session {
  static async create(sessionData) {
    try {
      const { user_id, question_type, messages } = sessionData;
      
      const [result] = await pool.execute(
        `INSERT INTO chat_sessions (user_id, question_type, messages, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [user_id, question_type, JSON.stringify(messages)]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Session.create error:', error);
      throw error;
    }
  }

  static async update(sessionId, messages) {
    await pool.execute(
      `UPDATE chat_sessions 
       SET messages = ?, updated_at = NOW() 
       WHERE id = ?`,
      [JSON.stringify(messages), sessionId]
    );
  }

  static async findByUserId(userId, limit = 20) {
    const [rows] = await pool.execute(
      `SELECT * FROM chat_sessions 
       WHERE user_id = ? 
       ORDER BY updated_at DESC 
       LIMIT ?`,
      [userId, limit]
    );
    
    return rows.map(row => {
      // Handle JSON column - MySQL returns JSON as string or object
      let messages;
      if (typeof row.messages === 'string') {
        messages = JSON.parse(row.messages);
      } else if (typeof row.messages === 'object') {
        messages = row.messages;
      } else {
        messages = [];
      }
      
      return {
        ...row,
        messages: messages
      };
    });
  }

  static async findById(sessionId) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM chat_sessions WHERE id = ?',
        [sessionId]
      );
      
      if (rows.length === 0) return null;
      
      const row = rows[0];
      // Handle JSON column - mysql2 returns it as Array or object
      let messages;
      if (Array.isArray(row.messages)) {
        // Already an array, use it directly
        messages = row.messages;
      } else if (typeof row.messages === 'string') {
        // If it's a string, parse it
        try {
          messages = JSON.parse(row.messages);
        } catch (e) {
          console.error('Error parsing messages string:', e);
          messages = [];
        }
      } else if (row.messages && typeof row.messages === 'object') {
        // Already an object/array, use it directly
        messages = row.messages;
      } else {
        // Fallback to empty array
        messages = [];
      }
      
      return {
        ...row,
        messages: messages
      };
    } catch (error) {
      console.error('Session.findById error:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }
}

module.exports = Session;

