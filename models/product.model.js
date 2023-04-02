const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema


let productSchema = new Schema({
    product: { type: String, required: true, unique: true, trim: true, lowercase: true },
    cost: { type: Number },
    description: { type: String },
    quantity: { type: Number}
}, {
    collection: 'products',
    timestamps: true
})


productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema);