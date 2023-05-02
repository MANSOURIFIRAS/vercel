const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    latitude: { type: Number },
    longitude: { type: Number },
    type: { type: String, default: '' },
    area: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    plants: [{
        plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
        position: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 }
        },
        _id: false
        
      }],
      
      animals: [{
        animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
        position: {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 }
        },
        _id: false
      }],
});



const farmModel = mongoose.model('Farm', farmSchema);

module.exports = farmModel;

