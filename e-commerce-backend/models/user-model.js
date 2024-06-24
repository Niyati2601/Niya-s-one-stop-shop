const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  role: {
    type: String,
  }
});

const userModel =  mongoose.model("user",userSchema)
module.exports = userModel;
