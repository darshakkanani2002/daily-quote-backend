const { Joi } = require("../../../utils/schemaValidate");

const saveBannerSchema = Joi.object({
  vImageName: Joi.string().label("vImageName"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = saveBannerSchema;
