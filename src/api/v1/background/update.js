const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vBackgroundId: Joi.string().required().label("vBackgroundId"),
});

module.exports = updateSchema;
