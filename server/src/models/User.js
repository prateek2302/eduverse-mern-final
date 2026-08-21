
const mongoose = require('mongoose');
const enrolledSchema = new mongoose.Schema({
  course:{type:mongoose.Schema.Types.ObjectId, ref:'Course'},
  progress:{type:Number, default:0},
  completedLessons:[String],
  enrolledAt:{type:Date, default:Date.now}
});
const userSchema = new mongoose.Schema({
  name:String, email:{type:String, unique:true, required:true}, password:{type:String, required:true},
  role:{type:String, enum:['student','instructor','both'], default:'student'},
  enrolledCourses:[enrolledSchema],
  wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
},{timestamps:true});
module.exports = mongoose.model('User', userSchema);
