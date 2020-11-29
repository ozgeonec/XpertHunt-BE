const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String, required:true, unique: true, trim: true, minlength: 3},
    description:{type:String, required:true},
    occupation:{type:String, required:true}
});

const USER = mongoose.model('User', userSchema);

let ozge = new USER({
    username:"ozgeonec",
    description:"developer",
    occupation: "developer"
});
mo