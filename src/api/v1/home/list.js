const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vLanguageId: Joi.string().required().label("vLanguageId"),
  iAppType: Joi.number().required().label("iAppType"),
  iPage: Joi.number().label("iPage").default(1),
  iLimit: Joi.number().label("iLimit").default(30),
});

module.exports = listSchema;
