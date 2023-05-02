const express = require('express');
const router = express.Router();
const animalModel = require('../../Infrastructure/Models/animalModel');
const animalController = require('../controllers/animalController');


router.post('/getIAObjects', animalController.getIAObjects);
  

//Getting all
router.get('/', animalController.getAllAnimals);



//Getting One 

router.get('/:id', getAnimal , animalController.getOneAnimal);


//Creating Animal
router.post('/add',animalController.addAnimal);


//Updating Animal

router.patch('/:id', getAnimal, animalController.updateAnimal);



//Deleting Animal
router.delete('/:id', getAnimal ,animalController.deleteAnimal);

async function getAnimal(req, res, next) {

    let animal
    try {
        animal = await animalModel.findById(req.params.id)
        if (animal == null) {
            return res.status(404).json({ message: 'Cannot find animal' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.animal = animal
    next()

}


module.exports = router;