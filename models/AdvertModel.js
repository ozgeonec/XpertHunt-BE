const mongoose = require('mongoose')
const {Schema} = mongoose

const advertSchema = new Schema({
    owner: {type: Schema.ObjectId, ref: 'User'},
    title: {type: String},
    about:{type: String,  maxLength: 50},
    price: {type: Number},
    created: {type: Date, default: Date.now}
})
const ADVERT = mongoose.model('ADVERT', advertSchema)

module.exports=ADVERT