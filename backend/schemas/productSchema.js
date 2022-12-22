const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    productTitle: {type: Schema.Types.String},
    productDescription: {type: Schema.Types.String},
    productPrice: {type: Schema.Types.String},
    productDiscount: {type: Schema.Types.String},
    productRating: {type: Schema.Types.Number},
    productStock: {type: Schema.Types.Number},
    createdAt: { type: Schema.Types.Date, default: Date.now },
})

const product = mongoose.model('product', productSchema)

module.exports = product;