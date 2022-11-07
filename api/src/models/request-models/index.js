const postValidate = require('./post-request-model')
const followValidate = require('./follow-request-model')
const likeValidate = require('./likes-request-model')
const authValidate = require('./auth-request-model')
const productValidate = require('./product-request-model')
const doctorValidate = require('./doctor-request-model')
const appointmentValidate = require('./appointment-request-model')



const validators = {
    postSchemaValidate: postValidate,
    followSchemaValidate: followValidate,
    likesSchemaValidate :likeValidate,
    authSchemaValidate :authValidate,
    productSchemaValidate :productValidate,
    doctorSchemaValidate:doctorValidate,
    appointmentSchemaValidate:appointmentValidate
};

module.exports = validators;

