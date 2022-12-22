const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId},
    productIds: [{type: Schema.Types.ObjectId, ref: 'product'}],
    totalPrice: {type: Schema.Types.String},
    createdAt: { type: Schema.Types.Date, default: Date.now },
})

const cart = mongoose.model('cart', cartSchema)

module.exports = cart;