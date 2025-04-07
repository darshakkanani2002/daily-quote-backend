const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vHomePostId: Joi.string().label("vHomePostId").allow(""),
  vCatId: Joi.string().label("vCatId").allow(""),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  iAppType: Joi.number().label("iAppType").allow("").default(0),
  iPage: Joi.number().required().label("iPage").default(1),
  iLimit: Joi.number().required().label("iLimit").default(20),
});

module.exports = listSchema;
