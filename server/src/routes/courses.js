
const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async(req,res)=>{
  const {search, category, level, sort} = req.query;
  let filter={};
  if(category) filter.category=category;
  if(level) filter.level=level;
  if(search) filter.title={$regex:search, $options:'i'};
  let query = Course.find(filter).populate('instructor','name email');
  if(sort==='rating') query = query.sort({rating:-1});
  if(sort==='popular') query = query.sort({students:-1});
  const courses = await query;
  res.json(courses);
});

router.get('/:id', async(req,res)=>{
  const course = await Course.findOne({$or:[{id:req.params.id},{_id:req.params.id}]}).populate('instructor','name email');
  if(!course) return res.status(404).json({msg:'Not found'});
  res.json(course);
});

router.post('/', auth, async(req,res)=>{
  const course = await Course.create({...req.body, instructor:req.user.id});
  res.json(course);
});

router.put('/:id', auth, async(req,res)=>{
  const course = await Course.findOneAndUpdate({$or:[{id:req.params.id},{_id:req.params.id}]}, req.body, {new:true});
  res.json(course);
});

router.delete('/:id', auth, async(req,res)=>{
  await Course.findOneAndDelete({$or:[{id:req.params.id},{_id:req.params.id}]});
  res.json({msg:'Deleted'});
});

module.exports = router;
