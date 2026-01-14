const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

class User {
  static async create(userData) {
    const { email, password, name, googleId, avatarUrl } = userData;
    
    // If password provided, hash it; otherwise it's Google OAuth
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, google_id, name, avatar_url, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [email, hashedPassword, googleId || null, name, avatarUrl || null]
    );
    
    return result.insertId;
  }

  static async findByGoogleId(googleId) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE google_id = ?',
      [googleId]
    );
    return rows[0];
  }

  static async findOrCreateGoogleUser(profile) {
    // Check if user exists by Google ID
    let user = await this.findByGoogleId(profile.id);
    
    if (user) {
      return user;
    }
    
    // Check if user exists by email
    user = await this.findByEmail(profile.emails[0].value);
    
    if (user) {
      // Link Google account to existing user
      await pool.execute(
        'UPDATE users SET google_id = ?, avatar_url = ? WHERE id = ?',
        [profile.id, profile.photos[0]?.value || null, user.id]
      );
      return await this.findById(user.id);
    }
    
    // Create new user
    const userId = await this.create({
      email: profile.emails[0].value,
      name: profile.displayName || profile.name.givenName + ' ' + profile.name.familyName,
      googleId: profile.id,
      avatarUrl: profile.photos[0]?.value || null
    });
    
    return await this.findById(userId);
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, name, google_id, avatar_url, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    if (!hashedPassword) {
      return false; // User doesn't have a password (OAuth user)
    }
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateProfile(userId, updates) {
    const fields = [];
    const values = [];
    
    if (updates.name) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    
    if (updates.email) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    
    if (fields.length === 0) return null;
    
    values.push(userId);
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(userId);
  }
}

module.exports = User;

