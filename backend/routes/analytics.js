const express = require('express');
const Question = require('../models/Question');
const { authenticate } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Get analytics by category
router.get('/category', authenticate, async (req, res) => {
  try {
    const stats = await Question.getStatsByCategory(req.user.id);
    res.json({ stats });
  } catch (error) {
    logger.error('Category analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch category analytics' });
  }
});

// Get analytics by type
router.get('/type', authenticate, async (req, res) => {
  try {
    const stats = await Question.getStatsByType(req.user.id);
    res.json({ stats });
  } catch (error) {
    logger.error('Type analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch type analytics' });
  }
});

// Get overall statistics
router.get('/overview', authenticate, async (req, res) => {
  try {
    const [categoryStats] = await Promise.all([
      Question.getStatsByCategory(req.user.id),
      Question.getStatsByType(req.user.id)
    ]);

    const typeStats = await Question.getStatsByType(req.user.id);
    const recentQuestions = await Question.getRecentQuestions(req.user.id, 30);

    const totalQuestions = recentQuestions.length;
    const avgScore = recentQuestions.length > 0
      ? recentQuestions.reduce((sum, q) => sum + (q.score || 0), 0) / recentQuestions.length
      : 0;

    res.json({
      totalQuestions,
      avgScore: Math.round(avgScore * 100) / 100,
      categoryStats,
      typeStats,
      recentActivity: recentQuestions.slice(0, 10)
    });
  } catch (error) {
    logger.error('Overview analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch overview analytics' });
  }
});

module.exports = router;

