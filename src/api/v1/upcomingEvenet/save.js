const { Joi } = require("../../../utils/schemaValidate");

const saveBannerSchema = Joi.object({
  vName: Joi.string().required().label("vName"),
  dtDate: Joi.string().required().label("dtDate"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = saveBannerSchema;
