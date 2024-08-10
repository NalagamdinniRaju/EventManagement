const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jpfjsloioyyjvbekuttd.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZmpzbG9pb3l5anZiZWt1dHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MjQwNDYsImV4cCI6MjAzODIwMDA0Nn0.9G4n_arImfOC2XrMJoNfXlBcK3W9F6R7RWlSGNATNQ4';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL and Key are required.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Now you can use the `supabase` client


// exports.register = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({ email, password: hashedPassword, name });
//     await newUser.save();

//     const { user, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) throw error;

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

// abpve os correct

exports.register = async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = new User({ email, password: hashedPassword, name });
      await newUser.save();
  
    //   const { error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });
  
    //   if (error) throw error;
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };
  
  // exports.login = async (req, res) => {
    
  //   try {
  //     const { email, password } = req.body;
  
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ message: 'Invalid credentials' });
  //     }
  
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ message: 'Invalid credentials' });
  //     }
  
  //   //   const { data, error } = await supabase.auth.signInWithPassword({
  //   //     email,
  //   //     password,
  //   //   });
  
  //   //   if (error) throw error;
  
  //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  //     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error logging in', error: error.message });
  //   }
  // };
  // In authController.js

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message, stack: error.stack });
  }
};