const { response } = require('express');
const Commande =require('../../Infrastructure/Models/commandModel');
const shipmentServ = require('.././../Application/UseCases/Shipment/shipmentService');
const findCommandesNotDelivered=async (req,res)=>{

        try {
            const commande = await Commande.find({status:false});
            res.status(200).send(commande);
            console.log(commande);
        } catch (error) {
            console.log(error,"could not find any commande ")
    
        } 
    }
       
 
    const addShipment =async (req,res)=>{
        try {
            const shipment = req.body;
             await shipmentServ.addShipment(shipment);
            res.status(200).send(shipment);
            console.log(shipment);
            
        } catch (err) {
            console.error(err);
            throw new Error('Could not create shipment');
        }
    }
const getMyshipment=async (req,res)=>{
    try {
        const id = req.params.id;
        const myshipment = await shipmentServ.getMyShipment(id);
        res.status(200).send(myshipment);
        console.log(myshipment);
    } catch (error) {
        console.log(error,"could not get my shipment ")
    }
}
const updateMylocation=async(req,res)=>{
    try{
        const agent_id=req.params.agent_id;
          const position=req.body.position
        const user=await shipmentServ.updateMylocation(position,agent_id);
        res.status(200).send(user);
        console.log("location updated")
    }catch(e){
        console.log(e,"could not update location")
    }
}
const getMyOderLocation=async(req,res)=>{
    try{
        const trackid=req.params.trackid;
        console.log("trackidcontroller",trackid)
        const myorders= await shipmentServ.getMyOrderLocation(trackid);
        res.status(200).send(myorders);
        console.log(myorders);
    }catch(e){
        console.log(e,"could not get my order location")
    }
}
const makeEndOfamission =async(req,res)=>{
    try{
        const idmission=req.params.idmission; 
        console.log("idmission:"+idmission);
        const endmission=await shipmentServ.makeEndOfamission(idmission);
        res.status(200).send(endmission);
        console.log(endmission);
    }catch(e){
        console.log(e,"could not make end of the shipment ");
    }
}
module.exports={
    findCommandesNotDelivered,addShipment,getMyshipment,updateMylocation,getMyOderLocation,makeEndOfamission
}