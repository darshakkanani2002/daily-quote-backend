const { Joi } = require("../../../utils/schemaValidate");

 const listBannerSchema = Joi.object({
  vBannerId:Joi.string().label("vBannerId").allow(""),
});

module.exports = listBannerSchema;