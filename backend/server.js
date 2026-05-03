require('dotenv').config();
console.log('🔍 ENV Check:');
console.log('MONGO:', process.env.MONGO_URI ? '✅ Loaded' : '❌ Missing');
console.log('JWT:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Missing');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/freelancerdb');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(5000, () => console.log('Server on 5000'));