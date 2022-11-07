const Joi = require("joi");

const schema = 
    Joi.object().keys({
        doctor_id: Joi.number().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
    });

const validate = (data) => {
    const result = schema.validate(data );
    result.value = data;
    return result;
};

module.exports = validate;