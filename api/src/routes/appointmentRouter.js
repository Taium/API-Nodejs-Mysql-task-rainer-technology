const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");

const router = express.Router();
const appointmentController = controller.appointmentController;

router.get('/appointment', appointmentController.findAll )
router.get('/allappointment', appointmentController.findAllitems )
router.post('/addappointment', appointmentController.store )
router.post('/singleappointment', appointmentController.findSingle )
router.post('/updateappointment', appointmentController.updateTimeDate )


module.exports = router;
