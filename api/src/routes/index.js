const express = require('express');

const authRouter = require('./authRouter');
const doctorRouter = require('./doctorRouter');
const appointmentRouter = require('./appointmentRouter');


const controller = require('../controllers');
const authController = controller.authController;


let router = express.Router();
router.use('/', authRouter)
router.use('/', doctorRouter)
router.use('/', appointmentRouter)

// router.use('/login', authController.login )
// router.post('/register', authController.register )


module.exports = router;
