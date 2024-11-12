const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','admin'],
        default:'student'
    },
    job:{
        type:Schema.Types.ObjectId,
        ref:'Job'
    }
},{
    timestamps:true
})

// Password hashing before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // If password hasn't changed
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method to compare password
  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User',userSchema)

module.exports = User;