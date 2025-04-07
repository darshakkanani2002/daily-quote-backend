const { Joi } = require("../../../utils/schemaValidate");

const allCatDataListSchema = Joi.object({
  vHomePostId: Joi.string().label("vHomePostId").allow(""),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  iPage: Joi.number().label("iPage").allow("").default(1),
  iLimit: Joi.number().label("iLimit").allow("").default(20),
});

module.exports = allCatDataListSchema;
