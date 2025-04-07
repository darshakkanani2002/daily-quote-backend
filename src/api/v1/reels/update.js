const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vFrameId: Joi.string().required().label("vFrameId"),
});

module.exports = updateSchema;
