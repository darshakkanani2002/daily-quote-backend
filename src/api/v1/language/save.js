const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vName: Joi.string().required().label("vName"),
  vCode: Joi.string().required().label("vCode"),
});

module.exports = saveSchema;
