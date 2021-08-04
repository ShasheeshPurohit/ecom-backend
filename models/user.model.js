const mongoose = require('mongoose')

const {Schema} = mongoose;
require('mongoose-type-email')

const userSchema = new Schema({
  name:{
    type: String,
    required: "Cannot create user without name, please enter a name",
  },
  email:{
    type: mongoose.SchemaTypes.Email,
    required: "Cannot create user without email, please enter a valid email",
    unique: "Email already registered, please log in",
  },
  username:{
    type: String,
    required: "Cannot create user without username, please enter a user name",
    unique:"Username already taken, please try a different username",
  },
  password: {
    type: String,
    required: "Cannot create user without password, please enter a password",
    minLength: [8, "Password should minimum be 8 characters long"]
  }
  
})

const User = mongoose.model('User', userSchema)

module.exports = {User}