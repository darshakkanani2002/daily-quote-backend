const { Joi } = require("../../../utils/schemaValidate");

const deleteBannerSchema = Joi.object({
  vBannerId: Joi.string().required().label("vBannerId"),
});

module.exports = deleteBannerSchema;
