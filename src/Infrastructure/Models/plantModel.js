const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    scientificName: { type: String, required: true },
    image: { type: String },
    growthPeriod: { type: String },
    matureHeight: { type: Number },
    matureWidth: { type: Number },
    soilType: { type: String },
    wateringNeeds: { type: String },
    sunlightNeeds: { type: String },
    temperatureRange: { type: String },
    harvestTime: { type: String },
    quantity: { type: Number },
    spacing: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    Farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' }
});


const plantModel = mongoose.model('Plant', plantSchema);
module.exports = plantModel;