const { Joi } = require("../../../utils/schemaValidate");

const withoutLoginlistSchema = Joi.object({
  vHomePostId: Joi.string().label("vHomePostId").allow(""),
  vCatId: Joi.string().label("vCatId").allow(""),
  vLanguageId: Joi.string().label("vLanguageId").allow(""),
  iPage: Joi.number().required().label("iPage").default(1),
  iLimit: Joi.number().required().label("iLimit").default(20),
});

module.exports = withoutLoginlistSchema;
