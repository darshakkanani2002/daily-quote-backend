const { Joi } = require("../../../utils/schemaValidate");

const saveBannerSchema = Joi.object({
  vImageName: Joi.string().label("vImageName"),
});

module.exports = saveBannerSchema;
