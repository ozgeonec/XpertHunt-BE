const mongoose = require('mongoose')
const {Schema} = mongoose
const validator = require('validator');
const bcrypt = require('bcryptjs')


const loginSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.default.isEmail, 'Please enter a valid email address']
    },
    password :{
        type: String,
        required: [true, 'Please enter password for your account'],
        minlength: [6, 'Your password must be a t least 6 characters long'],
        select: false
    }
})

//Encrypting Passwords before Saving
loginSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
})

//Compare password in database
loginSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

const LOGIN = mongoose.model('LOGIN', loginSchema)

module.exports=LOGIN;