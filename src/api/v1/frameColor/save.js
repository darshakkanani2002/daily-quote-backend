const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  arrColorsFrame: Joi.array().required().label("arrColorsFrame"),
  arrColorsBorder: Joi.array().required().label("arrColorsBorder"),
});

module.exports = saveSchema;
