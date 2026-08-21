
const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({ id:String, title:String, duration:String, type:{type:String, default:'video'}, preview:Boolean });
const moduleSchema = new mongoose.Schema({ id:String, title:String, lessons:[lessonSchema] });
const courseSchema = new mongoose.Schema({
  id:String,
  title:{type:String, required:true},
  description:String, longDesc:String,
  thumbnail:String, gradient:String,
  instructor:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  instructorMeta:{name:String, initials:String, bio:String},
  rating:Number, reviewsCount:Number, students:Number,
  price:Number, originalPrice:Number,
  duration:String, level:String, category:String,
  modules:[moduleSchema],
  whatYouLearn:[String],
  language:String, lastUpdated:String, bestseller:Boolean,
  quiz:[{ question:String, options:[String], answer:Number }]
},{timestamps:true});
module.exports = mongoose.model('Course', courseSchema);
