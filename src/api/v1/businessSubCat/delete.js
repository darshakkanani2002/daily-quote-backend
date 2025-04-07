const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vSubCatId: Joi.string().required().label("vSubCatId"),
});

module.exports = deleteSchema;
