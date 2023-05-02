const express = require('express');
const router = express.Router();

const shipmentController =require('../controllers/shipmentController'); 

router.get('/listnotDelivred',shipmentController.findCommandesNotDelivered);
router.post('/addnewShipment',shipmentController.addShipment);
router.get('/MyMission/:id',shipmentController.getMyshipment);
router.put('/updateMylocation/:agent_id',shipmentController.updateMylocation);
router.get('/getMyOrderLocation/:trackid',shipmentController.getMyOderLocation);
router.put('/makeEndOfMission/:idmission',shipmentController.makeEndOfamission);
module.exports = router;