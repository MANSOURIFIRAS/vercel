const express = require('express');
const router = express.Router();
const commandsController = require('../controllers/commandsController');
const auth = require('../middlwares/auth');

//Add new command
router.post('/', auth,commandsController.addCommand);

//Get command by id
router.get('/:id',commandsController.getCommandById);


module.exports = router;
