const { Joi } = require("../../../utils/schemaValidate");

const listBannerSchema = Joi.object({
  vEventId: Joi.string().label("vEventId").allow(""),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = listBannerSchema;
