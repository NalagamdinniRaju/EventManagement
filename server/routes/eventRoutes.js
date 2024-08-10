const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createEvent,
  getAllEvents,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  exportAttendees
} = require('../controllers/eventController');
const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', getAllEvents);
router.get('/myevents', protect, getMyEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/:id/register', protect, registerForEvent);
router.get('/:id/attendees', protect, exportAttendees);

module.exports = router;

