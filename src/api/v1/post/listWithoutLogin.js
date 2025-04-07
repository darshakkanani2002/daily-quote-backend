const { Joi } = require("../../../utils/schemaValidate");

const withoutLoginlistSchema = Joi.object({
  vPostId: Joi.string().label("vPostId").allow(""),
  vCatId: Joi.string().label("vCatId").allow(""),
  vLanguageId: Joi.string().label("vLanguageId").allow(""),
  iPage: Joi.number().required().label("iPage").default(1),
  iLimit: Joi.number().required().label("iLimit").default(10),
  iAppType: Joi.number().label("iAppType").allow(""),
});

module.exports = withoutLoginlistSchema;
