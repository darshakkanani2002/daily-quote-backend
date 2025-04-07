const { Joi } = require("../../../utils/schemaValidate");

const updateBannerSchema = Joi.object({
  vBannerId: Joi.string().label("BannerId").allow(""),
  vImageName: Joi.string().label("vImageDescrip").allow(""),
});

module.exports = updateBannerSchema;
