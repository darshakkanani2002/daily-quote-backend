const { Joi } = require("../../../utils/schemaValidate");

const listBannerSchema = Joi.object({
  vDaySpecialId: Joi.string().label("vDaySpecialId").allow(""),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = listBannerSchema;
