const mongoose = require('mongoose');

const compostSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
  },
   image: {
    type: String,
  },
   description: {
    type: String,
  },
   type: {
    type: String,
    enum: ['compost', 'fertilizer', 'organic', 'non-organic'],
  },
  brandName: {
    type: String,
  },
  quantityWeight: {
    type: Number,
  },
  unitPrice: {
    type: Number,
  },
  availability: {
    type: String,
    enum: ['in stock', 'out of stock', 'pre-order'],
  },
  customerRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  customerReview: {
    type: String,
  },
  manufacturer:{
    type:String,
  },
  nutrientContent: {
    type: String,
  },
  certification: {
    type: String,
  },
  usageInstructions: {
    type: String,
  },
  expirationDate: {
    type: Date,
  },
  countryOfOrigin: {
    type: String,
  },
  packagingType: {
    type: String,
  },
  discountOffered: {
    type: Number,
  },
  _idSeller:{
    type: mongoose.Schema.Types.ObjectId
  },
  rating:{
    type: Number
  }
}, {
  timestamps: true,
});

const Compost = mongoose.model('Compost', compostSchema);

module.exports = Compost;
