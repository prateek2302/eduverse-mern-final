
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');
const User = require('../models/User');
dotenv.config();

const courses = [
  {id:'c1', title:'Complete React & Node.js Bootcamp 2025', description:'Master full-stack development', thumbnail:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800', gradient:'from-violet-600 to-indigo-600', category:'Development', level:'Intermediate', price:2499, originalPrice:8999, duration:'54h 20m', rating:4.8, reviewsCount:12432, students:48290, language:'English, Hindi', lastUpdated:'Oct 2025', bestseller:true, whatYouLearn:['Build production React apps','Design secure REST APIs'], modules:[{id:'m1', title:'React Fundamentals', lessons:[{id:'l1', title:'Why React?', duration:'08:12', type:'video', preview:true}]}]},
  {id:'c2', title:'UI/UX Design Mastery: Figma to Framer', description:'Learn to design delightful products.', thumbnail:'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', gradient:'from-fuchsia-600 to-pink-600', category:'Design', level:'Beginner', price:1999, originalPrice:5999, duration:'32h', rating:4.9, students:21340, whatYouLearn:['Figma','Design systems'], modules:[]},
  {id:'c3', title:'Python for Data Science & ML', description:'From pandas to PyTorch.', thumbnail:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', gradient:'from-blue-600 to-cyan-600', category:'Data Science', level:'Beginner', price:2999, duration:'48h', rating:4.7, students:32000, whatYouLearn:['ML'], modules:[]},
  {id:'c4', title:'Business Strategy & Analytics', description:'Frameworks by McKinsey', thumbnail:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', gradient:'from-amber-600 to-orange-600', category:'Business', level:'Advanced', price:3499, duration:'26h', rating:4.6, students:12000, whatYouLearn:['Strategy'], modules:[]},
  {id:'c5', title:'Digital Marketing 2025', description:'Grow any business online.', thumbnail:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', gradient:'from-emerald-600 to-teal-600', category:'Marketing', level:'Beginner', price:1499, duration:'22h', rating:4.5, students:18000, whatYouLearn:['SEO'], modules:[]},
];

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');
  await User.deleteMany({});
  await Course.deleteMany({});
  const pwd = await bcrypt.hash('password123',10);
  const instructors = await User.insertMany([{name:'Aarav Mehta', email:'aarav@eduverse.com', password:pwd, role:'instructor'},{name:'Ananya Rao', email:'ananya@eduverse.com', password:pwd, role:'instructor'}]);
  await User.create({name:'Demo Student', email:'student@eduverse.com', password:pwd, role:'student'});
  for(let i=0;i<courses.length;i++){
    await Course.create({...courses[i], instructor:instructors[i%instructors.length]._id, instructorMeta:{name:instructors[i%instructors.length].name}});
  }
  console.log('Seeded');
  process.exit(0);
}
seed();
