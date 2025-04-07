const { Joi } = require("../../../utils/schemaValidate");

const updateBannerSchema = Joi.object({
  vEventId: Joi.string().required().label("vEventId"),
  vName: Joi.string().required().label("vName"),
  dtDate: Joi.string().required().label("dtDate"),
  vLanguageId: Joi.string().required().label("vLanguageId"),
});

module.exports = updateBannerSchema;
