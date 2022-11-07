const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");

const router = express.Router();
const doctorController = controller.doctorController;

router.get("/doctor", doctorController.findAll);


module.exports = router;
