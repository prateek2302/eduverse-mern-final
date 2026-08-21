
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async(req,res)=>{
  try{
    const {name,email,password,role='student'} = req.body;
    if(!email||!password) return res.status(400).json({msg:'Email & password required'});
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({msg:'Email already registered'});
    const hash = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hash,role});
    const token = jwt.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(e){ res.status(500).json({msg:e.message}) }
});

router.post('/login', async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'User not found'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({msg:'Wrong password'});
    const token = jwt.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(e){ res.status(500).json({msg:e.message}) }
});

module.exports = router;
