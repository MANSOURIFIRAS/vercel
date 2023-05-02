const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },  
  rating :{type : Number},
  categorie: {type : String},
  quantityWeight: {type : Number},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pic : {type : String},

});

const productModel = mongoose.model('Product', productSchema);


module.exports = productModel;
