const express = require('express');
const router = express.Router();
const farmModel = require('../../Infrastructure/Models/farmModel');

//Getting all
router.get('/', async (req, res) => {

    try{
        const farms = await farmModel.find()
            .populate('plants.plant')
            .populate('animals.animal')
        
        res.status(200).json(farms)
    } catch(err) {
        res.status(500).json({message: err.message})
    }

});



//Getting One 

router.get('/:id', getFarm , (req, res) => {
    res.json(res.farm)

});


//Creating Farm
router.post('/add', async (req, res) => {
    console.log(req.body)
    const farm = new farmModel({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        type: req.body.type,
        area: req.body.area,
        user: req.body.user,
        plants: req.body.plants,
        animals: req.body.animals
    });
    try {
        const newFarm = await farm.save()
        res.status(201).json(newFarm)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

});


//Updating Farm

router.patch('/:id', getFarm, async (req, res) => {
    if(req.body.name!=null){
        res.farm.name=req.body.name
    }
    if(req.body.latitude!=null){
        res.farm.latitude=req.body.latitude
    }
    if(req.body.longitude!=null){
        res.farm.longitude=req.body.longitude
    }
    if(req.body.type!=null){
        res.farm.type=req.body.type
    }
    if(req.body.area!=null){
        res.farm.area=req.body.area
    }
    if(req.body.user!=null){
        res.farm.user=req.body.user
    }
    if(req.body.plants!=null){
        res.farm.plants=req.body.plants
    }
    if(req.body.animals!=null){
        res.farm.animals=req.body.animals
    }
    try {
        const updatedFarm = await res.farm.save()
        res.json(updatedFarm)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});



//Deleting Farm
router.delete('/:id', getFarm ,async (req, res) => {
    
    try {
        await res.farm.remove()
        res.json({ message: 'Deleted Farm' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getFarm(req, res, next) {

    let farm
    try {
        farm = await farmModel.findById(req.params.id)
        if (farm == null) {
            return res.status(404).json({ message: 'Cannot find farm' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.farm = farm
    next()

}


module.exports = router;