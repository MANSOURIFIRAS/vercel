const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ratingValue: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    compost: { type: mongoose.Schema.Types.ObjectId, ref: 'Compost' },
 
});

const ratingModel = mongoose.model('Rating', ratingSchema);


module.exports = ratingModel;
//