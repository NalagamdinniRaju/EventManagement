const Session = require('../models/Session');

exports.createSession = async (req, res) => {
  try {
    const session = new Session({
      user: req.user.id,
      loginTime: new Date(),
      ipAddress: req.ip,
    });
    await session.save();
    res.status(201).json({ message: 'Session created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error: error.message });
  }
};

exports.endSession = async (req, res) => {
  try {
    const session = await Session.findOne({ user: req.user.id, logoutTime: null });
    if (session) {
      session.logoutTime = new Date();
      await session.save();
    }
    res.json({ message: 'Session ended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending session', error: error.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort('-loginTime');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
};