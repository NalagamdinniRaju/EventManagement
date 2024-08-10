const Event = require('../models/Event');
const weatherService = require('../services/weatherService');
const emailService = require('../services/emailService');

// exports.createEvent = async (req, res) => {
//   try {
//     const { name, date, location, description } = req.body;
//     const event = new Event({
//       name,
//       date,
//       location,
//       description,
//       createdBy: req.user.id,
//     });
//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating event', error: error.message });
//   }
// };

exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const event = new Event({
      name,
      date,
      location,
      description,
      createdBy: req.user.id,
      images: req.files.map(file => file.path) // Save file paths if you store images
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your events', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const weatherInfo = await weatherService.getWeather(event.location);
    res.json({ ...event.toObject(), weatherInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.description = description || event.description;
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    event.attendees.push(req.user.id);
    await event.save();
    await emailService.sendEventRegistrationEmail(req.user.email, event);
    res.json({ message: 'Successfully registered for the event' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error: error.message });
  }
};

exports.exportAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to export attendees for this event' });
    }
    const attendees = event.attendees.map(attendee => ({
      name: attendee.name,
      email: attendee.email
    }));
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting attendees', error: error.message });
  }
};