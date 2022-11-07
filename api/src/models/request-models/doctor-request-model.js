const Joi = require("joi");

const schema = 
    Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().required(),
        hos_name: Joi.string().required(),
    });

const validate = (data) => {
    const result = schema.validate(data );
    result.value = data;
    return result;
};

module.exports = validate;