const { Schema, model } = require('mongoose')

const schema = new Schema({
    brand:  String,
    color:  String,
    oldPrice:  Number,
    newPrice:  Number,
    sizes: [Number],
    gallery: [String],
    mainLink:  String
})

module.exports = model('Sneakers', schema);