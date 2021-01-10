const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const {Schema} = mongoose

const OrderSchema = new Schema({
    buyer: { type: Schema.ObjectId, ref: 'USER' },
    seller: [{ type: Schema.ObjectId, ref: 'USER' }],
    description: {type: String, maxLength: 1200},
    budget: {type: Number, min:5},
    applied: [{type: String, unique: true}],
    created: { type: Date, default: Date.now }
});


const ORDER = mongoose.model('ORDER', OrderSchema);

module.exports = ORDER