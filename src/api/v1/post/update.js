const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vPostId: Joi.string().required().label("vPostId"),
  vCatId: Joi.string().required().label("vCatId"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  isTrending: Joi.boolean().required().label("isTrending"),
  isPremium: Joi.boolean().required().label("isPremium"),
  isTime: Joi.boolean().required().label("isTime"),
});

module.exports = updateSchema;
