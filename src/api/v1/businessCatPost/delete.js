const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  arrImageId: Joi.array().required().label("arrImageId"),
});

module.exports = deleteSchema;
