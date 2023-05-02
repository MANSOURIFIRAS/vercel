const express = require('express');
const router = express.Router();
const compostsController = require('../controllers/compostsController');
const auth = require('../middlwares/auth');

//Get all composts
router.get('/all', compostsController.getAllComposts);

//Get seller composts
router.get('/GetSellerComposts',auth, compostsController.getSellerComposts);

//Get top rated composts
router.get('/topRated', compostsController.getTopRatedComposts);

//Get recently added composts
router.get('/recentlyAdded', compostsController.getRecentlyAddedComposts);

//Get recently added composts
router.get('/topSelled', compostsController.getTopSelledComposts);

//Get a compost details by id
router.get('/:id', compostsController.getCompostById);

//Add new compost
router.post('/', auth,compostsController.addCompost);

//update a compost by id
router.put('/:id', compostsController.updateCompost);

//delete a compost by id
router.delete('/:id', compostsController.deleteCompost);


module.exports = router;
