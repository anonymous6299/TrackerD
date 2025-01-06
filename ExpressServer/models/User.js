const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email:String,
  name:String,
  username:String,
  password:String
});

const User = mongoose.model('user', UserSchema);
module.exports = User;