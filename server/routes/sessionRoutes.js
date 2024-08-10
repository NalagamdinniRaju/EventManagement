const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createSession, endSession, getAllSessions } = require('../controllers/sessionController');
const router = express.Router();

router.post('/', protect, createSession);
router.put('/end', protect, endSession);
router.get('/', protect, getAllSessions);

module.exports = router;