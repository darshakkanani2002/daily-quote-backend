const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vColorId: Joi.string().required().label("vColorId"),
});

module.exports = deleteSchema;
