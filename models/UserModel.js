const mongoose = require('mongoose')
const fs = require('fs')
const validator = require('validator');
const bcrypt = require('bcryptjs')

/* firstname:{type:String, trim: true, minlength: 3},
    lastname:{type:String, trim: true, minlength: 3},
    avatar: {data: Buffer, contentType: String },
    short_desc:{type:String, maxLength: 50},
    description:{type:String, minlength: 150},
    occupation:{type:String},
    score:{type:Number},
    country:{type:String},*/
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
    adverts:[{type:Schema.ObjectId, ref:'ADVERT' }],
    orders:[{type:Schema.ObjectId, ref:'ORDER' }]
},{
    timestamps:true,
})

// Encrypting Passwords before Saving
userSchema.pre('save',async function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    if (user.password) {
        await bcrypt
            .genSalt(10, function (err, salt) {
                if (err)
                    return next(err);
                bcrypt
                    .hash(user.password, salt, null, function (err, hash) {
                        if (err)
                            return next(err);
                        user.password = hash;
                        next(err);
                    });
            });
    }
});

//Compare password in database
userSchema.methods.comparePassword = async function(enterPassword){
    try {
        return await bcrypt.compare(enterPassword.toString(), this.password);
    } catch (err) {
        return false;
    }
}


const USER = mongoose.model('USER', userSchema)



module.exports=USER;