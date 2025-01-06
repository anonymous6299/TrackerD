const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
  date:String,
  day:String,
  TasksCompleted:String,
  Tasks:String
});

const WorkTrack = mongoose.model('worktrack', WorkSchema);
module.exports = WorkTrack;