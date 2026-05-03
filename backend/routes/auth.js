// // // const express = require('express');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');
// // // const User = require('../models/User');
// // // const router = express.Router();

// // // router.post('/signup', async (req, res) => {
// // //   const { name, email, password, skills } = req.body;
// // //   const hashed = await bcrypt.hash(password, 12);
// // //   const user = new User({ name, email, password: hashed, skills });
// // //   await user.save();
// // //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // //   res.json({ token, user: { id: user._id, name, email } });
// // // });

// // // router.post('/login', async (req, res) => {
// // //   const { email, password } = req.body;
// // //   const user = await User.findOne({ email });
// // //   if (!user || !await bcrypt.compare(password, user.password)) {
// // //     return res.status(400).json({ msg: 'Invalid credentials' });
// // //   }
// // //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // //   res.json({ token, user: { id: user._id, name: user.name, email } });
// // // });

// // // module.exports = router;









// // router.post('/signup', async (req, res) => {
// //   try {
// //     console.log('Signup body:', req.body);  // Debug log
    
// //     const { name, email, password, skills = [] } = req.body;
    
// //     // Basic validation
// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: 'Name, email, and password required' });
// //     }
    
// //     // Check existing user
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Email already exists' });
// //     }
    
// //     const hashed = await bcrypt.hash(password, 12);
// //     const user = new User({ 
// //       name: name.trim(), 
// //       email: email.toLowerCase().trim(), 
// //       password: hashed, 
// //       skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean)
// //     });
    
// //     const savedUser = await user.save();
// //     const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
// //     console.log('User created:', savedUser.email);  // Success log
    
// //     res.status(201).json({ 
// //       token, 
// //       user: { 
// //         id: savedUser._id, 
// //         name: savedUser.name, 
// //         email: savedUser.email 
// //       } 
// //     });
// //   } catch (error) {
// //     console.error('Signup error:', error);  // Full error log
// //     if (error.name === 'ValidationError') {
// //       const errors = Object.values(error.errors).map(e => e.message).join(', ');
// //       return res.status(400).json({ message: `Validation failed: ${errors}` });
// //     }
// //     res.status(500).json({ message: 'Server error: ' + error.message });
// //   }
// // });












// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   console.log('📥 Signup attempt:', req.body);
  
//   try {
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields required' });
//     }
    
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email exists' });
    
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
    
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '24h' });
    
//     console.log('✅ User created:', user.email);
//     res.status(201).json({
//       token,
//       user: { id: user._id, name: user.name, email }
//     });
//   } catch (err) {
//     console.error('❌ Signup error:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   console.log('🔑 Login attempt:', req.body.email);
  
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user || !await bcrypt.compare(password, user.password)) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
    
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '24h' });
    
//     console.log('✅ Login success:', user.email);
//     res.json({ token, user: { id: user._id, name: user.name, email } });
//   } catch (err) {
//     console.error('❌ Login error:', err.message);
//     res.status(500).json({ message: 'Login failed' });
//   }
// });

// module.exports = router;









const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  console.log('📨 Signup received:', req.body);
  res.status(201).json({
    message: 'Signup success!',
    token: 'fake-jwt-token-for-test',
    user: { id: '1', name: req.body.name || 'Test User', email: req.body.email }
  });
});

router.post('/login', (req, res) => {
  console.log('🔑 Login:', req.body.email);
  res.json({
    message: 'Login success!',
    token: 'fake-jwt-token-for-test',
    user: { id: '1', name: 'Test User', email: req.body.email }
  });
});

module.exports = router;