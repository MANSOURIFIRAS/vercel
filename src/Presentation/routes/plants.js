const express = require('express');
const router = express.Router();
const plantModel = require('../../Infrastructure/Models/plantModel');

//Getting all
router.get('/', async (req, res) => {

    try{
        const plants=await plantModel.find()
        res.status(200).json(plants)
    }catch(err){
        res.status(500).json({message:err.message})
    }

});



//Getting One 

router.get('/:id', getPlant , (req, res) => {
    res.json(res.plant)

});


//Creating Plant
router.post('/add', async (req, res) => {
    const plant = new plantModel({
        name: req.body.name,
        scientificName: req.body.scientificName,
        image: req.body.image,
        growthPeriod: req.body.growthPeriod,
        matureHeight: req.body.matureHeight,
        matureWidth: req.body.matureWidth,
        soilType: req.body.soilType,
        wateringNeeds: req.body.wateringNeeds,
        sunlightNeeds: req.body.sunlightNeeds,
        temperatureRange: req.body.temperatureRange,
        harvestTime: req.body.harvestTime,
        quantity: req.body.quantity,
        spacing: req.body.spacing,
        user: req.body.user,
        Farm: req.body.Farm
    });
    try {


        const newPlant = await plant.save()
        res.status(201).json(newPlant)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

});


//Updating Plant

router.patch('/:id', getPlant, async (req, res) => {
    if(req.body.name!=null){
        res.plant.name=req.body.name
    }
    if(req.body.scientificName!=null){
        res.plant.scientificName=req.body.scientificName
    }
    if(req.body.image!=null){
        res.plant.image=req.body.image
    }
    if(req.body.growthPeriod!=null){
        res.plant.growthPeriod=req.body.growthPeriod
    }
    if(req.body.matureHeight!=null){
        res.plant.matureHeight=req.body.matureHeight
    }
    if(req.body.matureWidth!=null){
        res.plant.matureWidth=req.body.matureWidth
    }
    if(req.body.soilType!=null){
        res.plant.soilType=req.body.soilType
    }
    if(req.body.wateringNeeds!=null){
        res.plant.wateringNeeds=req.body.wateringNeeds
    }
    if(req.body.sunlightNeeds!=null){
        res.plant.sunlightNeeds=req.body.sunlightNeeds
    }
    if(req.body.temperatureRange!=null){
        res.plant.temperatureRange=req.body.temperatureRange
    }
    if(req.body.harvestTime!=null){
        res.plant.harvestTime=req.body.harvestTime
    }
    if(req.body.quantity!=null){
        res.plant.quantity=req.body.quantity
    }
    if(req.body.spacing!=null){
        res.plant.spacing=req.body.spacing
    }
    if(req.body.Farm!=null){
        res.plant.Farm=req.body.Farm
    }
  
    try {
        const updatedPlant = await res.plant.save()
        res.json(updatedPlant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});



//Deleting Plant
router.delete('/:id', getPlant ,async (req, res) => {
    
    try {
        await res.plant.remove()
        res.json({ message: 'Deleted Plant' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getPlant(req, res, next) {

    let plant
    try {
        plant = await plantModel.findById(req.params.id)
        if (plant == null) {
            return res.status(404).json({ message: 'Cannot find plant' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.plant = plant
    next()

}


module.exports = router;