const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  isTrending: Joi.boolean().label("isTrending").allow(""),
  isPremium: Joi.boolean().label("isPremium").allow(""),
  isTime: Joi.boolean().label("isTime").allow(""),
});

module.exports = saveSchema;
