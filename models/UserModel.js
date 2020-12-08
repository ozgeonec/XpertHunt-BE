const mongoose = require('mongoose')
const fs = require('fs')

const {Schema} = mongoose

const userSchema = new Schema({
    firstname:{type:String, required:true, trim: true, minlength: 3},
    lastname:{type:String, required:true, trim: true, minlength: 3},
    avatar: {type: String, data: Buffer },
    username:{type:String, required:true, unique: true, trim: true, minlength: 3},
    short_desc:{type:String, required:true, maxLength: 50},
    description:{type:String, required:true, minlength: 150},
    occupation:{type:String, required:true},
    score:{type:Number},
    country:{type:String, required:true},
},{
    timestamps:true,
})

const USER = mongoose.model('USER', userSchema)

// let user =new USER
// user.avatar.data = fs.readFileSync('public/images/profilpic.jpg')
// user.avatar.contentType = 'image/jpg'



module.exports=USER;