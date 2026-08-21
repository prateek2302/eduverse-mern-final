
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const router = express.Router();

router.post('/:courseId', auth, async(req,res)=>{
  const user = await User.findById(req.user.id);
  let course = await Course.findOne({$or:[{_id:req.params.courseId},{id:req.params.courseId}]});
  if(!course) return res.status(404).json({msg:'Course not found'});
  const exists = user.enrolledCourses.find(c=>c.course.toString()===course._id.toString());
  if(exists) return res.json({msg:'Already enrolled'});
  user.enrolledCourses.push({course:course._id, progress:0, completedLessons:[]});
  await user.save();
  course.students = (course.students||0)+1;
  await course.save();
  res.json({msg:'Enrolled', courseId:course._id});
});

router.put('/progress', auth, async(req,res)=>{
  const {courseId, lessonId} = req.body;
  const user = await User.findById(req.user.id);
  let course = await Course.findOne({$or:[{_id:courseId},{id:courseId}]});
  const entry = user.enrolledCourses.find(c=>c.course.toString()===course?._id.toString());
  if(!entry) return res.status(404).json({msg:'Not enrolled'});
  if(!entry.completedLessons.includes(lessonId)) entry.completedLessons.push(lessonId);
  const total = course?.modules?.reduce((acc,m)=>acc+m.lessons.length,0) || 10;
  entry.progress = Math.min(100, Math.round(entry.completedLessons.length/total*100));
  await user.save();
  res.json(entry);
});

router.get('/my', auth, async(req,res)=>{
  const user = await User.findById(req.user.id).populate('enrolledCourses.course');
  res.json(user.enrolledCourses);
});

module.exports = router;
