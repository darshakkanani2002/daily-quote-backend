const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vColorId: Joi.string().required().label("vColorId"),
  arrColorsFrame: Joi.array().label("arrColors").allow(""),
  arrColorsBorder: Joi.array().label("arrColorsBorder").allow(""),
});

module.exports = updateSchema;
