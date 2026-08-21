
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const enrollRoutes = require('./routes/enroll');
dotenv.config();
const app = express();
app.use(cors({origin: process.env.CLIENT_URL, credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);

app.get('/api/health', (req,res)=>res.json({status:'EduVerse API running', time:new Date()}));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{ app.listen(process.env.PORT||5000, ()=>console.log('🚀 EduVerse API on http://localhost:'+(process.env.PORT||5000))) })
.catch(e=>console.error('Mongo error', e));
