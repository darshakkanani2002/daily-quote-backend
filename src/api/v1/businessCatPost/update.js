const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vHomePostId: Joi.string().required().label("vHomePostId"),
  vCatId: Joi.string().required().label("vCatId"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  dtDate: Joi.string().label("dtDate").allow(""),
  isTrending: Joi.boolean().label("isTrending").allow(""),
  isPremium: Joi.boolean().label("isPremium").allow(""),
  isTime: Joi.boolean().label("isTime").allow(""),
});

module.exports = updateSchema;
