const authValidate = require('./auth-request-model')
const doctorValidate = require('./doctor-request-model')
const appointmentValidate = require('./appointment-request-model')



const validators = {
    authSchemaValidate :authValidate,
    doctorSchemaValidate:doctorValidate,
    appointmentSchemaValidate:appointmentValidate
};

module.exports = validators;

