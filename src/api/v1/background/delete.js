const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  arrBackgroundId: Joi.array().required().label("arrBackgroundId"),
});

module.exports = deleteSchema;
