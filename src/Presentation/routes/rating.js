const express = require('express');
const router = express.Router();
const ratingModel = require('../../Infrastructure/Models/productModel.js');
const ratingController = require('../controllers/ratingController.js');
const exportRatings = require('../middlwares/ExelGenerator.js');
const exportProducts = require('../middlwares/productGenerator.js');
const auth = require('../middlwares/auth');

//*************** rating product ********************** 
router.get('/exportratings/', exportProducts);
router.get('/exportratings/', exportRatings);
router.get('/exportproducts/', exportProducts );

router.post('/', ratingController.addRating);
router.get('/',ratingController.getRatings );

router.get('/:product', ratingController.getRating);
router.patch('/:id' ,ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);


//*************** rating compost ********************** 
router.post('/:idCompost/:ratingValue',auth, ratingController.rateCompost);





module.exports = router;
