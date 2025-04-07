const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vPremiumId: Joi.string().required().label("vPremiumId"),
});

module.exports = deleteSchema;
