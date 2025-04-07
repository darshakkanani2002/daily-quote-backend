const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vName: Joi.string().required().label("vName").trim(),
  vCode: Joi.string().required().label("vCode").trim(),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = updateSchema;
