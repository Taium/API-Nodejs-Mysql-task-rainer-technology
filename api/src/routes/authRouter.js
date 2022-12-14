const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");

const router = express.Router();
const authController = controller.authController;

router.post('/login', authController.login )
router.get('/user', authController.findUser )

router.post('/register', authController.register )
// handleValidation(validators.authSchemaValidate),

module.exports = router;
