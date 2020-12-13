const mongoose = require('mongoose')
const fs = require('fs')
const validator = require('validator');
const bcrypt = require('bcryptjs')

const {Schema} = mongoose

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.default.isEmail, 'Please enter a valid email address']
    },
    username:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 4
    },
    password :{
        type: String,
        required: [true, 'Please enter password for your account'],
        minlength: [6, 'Your password must be a t least 6 characters long'],
        select: false
    },
    firstname:{type:String, required:true, trim: true, minlength: 3},
    lastname:{type:String, required:true, trim: true, minlength: 3},
    avatar: {data: Buffer, contentType: String },
    short_desc:{type:String, required:true, maxLength: 50},
    description:{type:String, required:true, minlength: 150},
    occupation:{type:String, required:true},
    score:{type:Number},
    country:{type:String, required:true},
},{
    timestamps:true,
})

//Encrypting Passwords before Saving
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
})

//Compare password in database
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}
userSchema.methods.gravatar = function (size){
    if (!size)
        size = 200;
    if (!this.email)
        return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    let md5 = crypto
        .createHash('md5')
        .update(this.email)
        .digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}
const USER = mongoose.model('USER', userSchema)

// let user =new USER
// user.avatar.data = fs.readFileSync('public/images/profilpic.jpg')
// user.avatar.contentType = 'image/jpg'

module.exports=USER;