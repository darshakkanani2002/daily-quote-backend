const { Joi } = require("../../../utils/schemaValidate");

const updateBannerSchema = Joi.object({
  vDaySpecialId: Joi.string().label("vDaySpecialId").allow(""),
  vLanguageId: Joi.string().label("vLanguageId").allow(""),
});

module.exports = updateBannerSchema;
