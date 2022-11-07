const express = require('express');

const postRouter = require('./postRouter');
const followRouter = require('./followRouter');
const likesRouter = require('./likesRouter');
const authRouter = require('./authRouter');
const productRouter = require('./productRouter');
const doctorRouter = require('./doctorRouter');
const appointmentRouter = require('./appointmentRouter');


const controller = require('../controllers');
const authController = controller.authController;


let router = express.Router();

router.use('/', postRouter)
router.use('/', followRouter)
router.use('/', likesRouter)
router.use('/', authRouter)
router.use('/', productRouter)
router.use('/', doctorRouter)
router.use('/', appointmentRouter)

// router.use('/login', authController.login )
// router.post('/register', authController.register )


module.exports = router;
