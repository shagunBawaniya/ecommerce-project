const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: { type: String, required: true }
});
 
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;