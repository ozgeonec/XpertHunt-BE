const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const {Schema} = mongoose

const OrderSchema = new Schema({
    buyer: { type: Schema.ObjectId, ref: 'USER' },
    seller: [{ type: Schema.ObjectId, ref: 'USER' }],
    description: {type: String, minLength: 50, maxLength: 1200},
    budget: {type: Number, min:5},
    created: { type: Date, default: Date.now }
});

OrderSchema.plugin(deepPopulate);
const ORDER = mongoose.model('ORDER', OrderSchema);

module.exports = ORDER