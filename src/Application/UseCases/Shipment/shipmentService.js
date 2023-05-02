const Shipment= require('../../../Infrastructure/Models/shipmentModel'); 
const Commande=require('../../../Infrastructure/Models/commandModel');
const mailBeginShipment =require ('../../../Presentation/utils/mailBeginShipment');
const User = require('../../../Infrastructure/Models/userModel');
const getSmsToken = require('../../../Presentation/middlwares/getSmsToken');
const addShipment = async (s)=>{
    // Add shipment
    try{
        const commandes=s.shipment_items; 
        commandes.forEach(async (c)=>{
            const updatestatus={status:true};
            const idcommande=c.commande_id;
            await Commande.findOneAndUpdate({_id:idcommande},updatestatus,{new:true}).then((res)=>{
                console.log("status commande updated ", idcommande +"to"+ res);
                   
            })
        });
            console.log("all commandes updated")
            s.shipment_track_id=s.shipment_agent;
            
            const shipment=  await Shipment.create(s).then((res)=>{
                if(res){
                      commandes.forEach(async (order) => {
                        const idc=order.commande_id;
                        await Commande.findOne({_id:idc}).then(async(res)=>{
                            if(res){
                              const   buyersearched=res.buyer; 
                                const buyer =await  User.findById({_id:buyersearched});
                            if(buyer){
                                if (buyer.email){
                                    console.log("buyer contact ",buyer.email)
                                    await  mailBeginShipment(buyer.email,s.shipment_track_id);
                                    
                                }
                                else if (buyer.phone){
                                    console.log("buyer contact ",buyer.phone);
                                    const clientId = 'SkRqc3REeEVHQ09UdHFFUlZQS0kwVEdZMjNvalhJTHk6NFQwdmoxVVlZVnc0M0FmOA==';
                                    const context_shipment='Your Order has been created and soon it will be shipped soon , you can track your order with this id : ';
                                    await getSmsToken(clientId,buyer.phone,s.shipment_track_id,context_shipment);                                }
                            }else{
                                console.log("could not find user to send the tracking id  ");
                            }

                                    
                            }else{
                               console.log("could not find commande to send mail");   
                            }
                        });
                     
                       
                      });
                }else{
                    console.log("could not create shipment ");
                }
            }); 
            return shipment;
        }
           

    
    catch(e){
        console.log(e,"could not add shipment");
    }
 
}
const getMyShipment= async ( id )=>{

    try{
        const mymission= Shipment.findOne({shipment_agent:id,shipment_status:false});
        return mymission;
    }catch(e){
        console.log(e,"could not get my shipment")
    }
  
}

const updateMylocation= async(position,agent_id)=>{
   const u={position:position}
console.log('position',position)
console.log(agent_id)
    try{
       
        const user= await User.findOneAndUpdate({_id:agent_id},u,{new:true});
        return user;

    }catch(e){
        console.log(e,"could not update location");
    }

}
const getMyOrderLocation = async (trackid) => {
    try {
      const myOrder = await Shipment.findOne({ shipment_track_id: trackid });
  
      if (!myOrder) {
        return "Order not found";
      }
  
      const s = myOrder.shipment_agent;
      const agentInfo = await User.findById({_id:s});
  
      if (!agentInfo) {
        return "Agent not found";
      }
  
      return agentInfo.position;
  
    } catch (e) {
      console.log(e);
      return "Could not get order location";
    }
  }
   const makeEndOfamission=async(idmission)=>{
    
    try{
        const mission =await Shipment.findById({_id:idmission});
        if(mission){
            mission.shipment_status=true; 
            mission.save();
            return mission;
        }
            
    }catch(e){
     console.log(e);
     return "could not make end of shipment"
    }
  }
  
module.exports={addShipment,getMyShipment,updateMylocation,getMyOrderLocation,makeEndOfamission};
