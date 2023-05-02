const mongoose=require('mongoose');

const contractModel=new mongoose.Schema({
    typeContract :{ type:String , require:true},
    dateContract :{ type:Date , default :Date.now},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    salary:{type:Number ,require:false },
    vehicle:{  
   
         typeVehicle :{ type:String , require:false},
         marque :{ type:String , require:false},
         model:{type:String,require:false},
         color :{ type:String , require:false},
         matricule :{ type:String , require:false},
         dateCirculation :{ type:Date , require:false},
         Capacite: {type : String ,require:false},
         kilometrage:{type:Number,require:false}    
           
},
    statuscontract:{type:Boolean,default:false, require:false},
    signature :{type:String,default:"",require:false}


}


)
const Contract = mongoose.model('Contract', contractModel);
module.exports=Contract;
