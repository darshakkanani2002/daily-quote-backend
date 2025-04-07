const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vSubCatId: Joi.string().label("vSubCatId").allow(""),
  vCatId: Joi.string().required().label("vCatId"),
});

module.exports = listSchema;
