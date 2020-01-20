const Joi = require("@hapi/joi");

const createUserValidation = Joi.object().keys({
  name: Joi.string().required(),
  flightId: Joi.string().required(),
  bags: Joi.number()
    .min(1)
    .max(5)
    .required(),
});

const updateUserValidation = Joi.object().keys({
  name: Joi.string(),
  flightId: Joi.string(),
  bags: Joi.number()
    .min(0)
    .max(5),
});

const createUserValidator = (user) => createUserValidation.validate(user);

const updateUserValidator = (user) => updateUserValidation.validate(user);

module.exports = {
  createUserValidator,
  updateUserValidator,
};
