const mongoose = require('mongoose');

const {Schema} = mongoose

const userSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    firstname:{type:String, required:true, trim: true, minlength: 3},
    lastname:{type:String, required:true, trim: true, minlength: 3},
    avatar: {data: Buffer, contentType: String},
    username:{type:String, required:true, unique: true, trim: true, minlength: 3},
    short_desc:{type:String, required:true, maxLength: 50},
    description:{type:String, required:true, minlength: 150},
    occupation:{type:String, required:true},
    score:{type:Number},
    country:{type:String, required:true},
},{
    timestamps:true,
});

const USER = mongoose.model('USER', userSchema);




module.exports=USER;