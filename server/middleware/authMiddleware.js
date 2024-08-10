// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');

// // exports.protect = async (req, res, next) => {
// //   let token;

// //   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //     token = req.headers.authorization.split(' ')[1];
// //   }

// //   if (!token) {
// //     return res.status(401).json({ message: 'Not authorized, no token' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decoded.id).select('-password');
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: 'Not authorized, token failed' });
// //   }
// // };
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };
// In authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};