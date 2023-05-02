const contServ =require('../../Application/UseCases/contract/contratService');

const addContract = async (req,res) => {
    try {
        const contract = req.body.data;
         await contServ.addContract(contract);
         console.log(contract);
        res.status(200).send(contract);
        
    } catch (err) {
        console.error(err);
        throw new Error('Could not create contract');
    }
}
const FindContractByUserID = async (req,res) => {
    try {
        const userid = req.params.userid;
        const cont= await contServ.FindContractByUserID(userid);
         console.log("cont c id",userid);
        res.status(200).json(cont);
        
    } catch (err) {
        console.error(err);
        throw new Error('Could not  find user  contract');
    }
}

const saveSignaturecontroller =async(req,res)=>{
    try{
        const signature=req.body.signature;
        const userid=req.body.userid;
        const sig=await contServ.saveSignature(signature,userid);
        res.status(200).send(sig);
    }catch(e){
        console.log(e,"could not save signature")
    }
}
const getAllContractController=async(req,res)=>{
    try{
        const contracts=await contServ.getAllContracts();
        res.status(200).send(contracts);
    }
    catch(e){
        console.log(e,"could not get all contracts")
    }
}
const acceptContract=async(req,res)=>{
    try{
        const contractid=req.params.contractid;
        const contract=await contServ.acceptContract(contractid);
        res.status(200).send(contract);
        console.log("accepted contract and role modified")
    }catch(e){
        console.log(e,"could not accept contract");
    }
}
module.exports={addContract,FindContractByUserID,saveSignaturecontroller,getAllContractController,acceptContract}; 