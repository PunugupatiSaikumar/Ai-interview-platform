const express = require('express');
const Question = require('../models/Question');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Get all user history
router.get('/', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const questions = await Question.findByUserId(req.user.id, limit, offset);

    res.json({ questions, total: questions.length });
  } catch (error) {
    logger.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get recent questions
router.get('/recent', authenticate, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const questions = await Question.getRecentQuestions(req.user.id, days);

    res.json({ questions });
  } catch (error) {
    logger.error('Recent history fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch recent history' });
  }
});

module.exports = router;

