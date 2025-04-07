const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  dtDate: Joi.string().label("dtDate").allow(""),
  iAppType: Joi.number().label("iAppType").allow("").default(0),
  isTrending: Joi.boolean().label("isTrending").allow(""),
  isPremium: Joi.boolean().label("isPremium").allow(""),
  isTime: Joi.boolean().label("isTime").allow(""),
});

module.exports = saveSchema;
