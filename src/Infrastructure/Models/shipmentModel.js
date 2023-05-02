const mongoose=require('mongoose');

const shipmentSchema=new mongoose.Schema({
    shipment_track_id :{ type:String , require:false},
    shipment_date_creation :{ type:Date , default :Date.now,require:false},
    shipment_agent:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    shipment_status:{type:Boolean,default:false, require:false},
    shipment_items:[
        {
            commande_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Command'}
        }
        
    ]
   

}


)
const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports=Shipment;
