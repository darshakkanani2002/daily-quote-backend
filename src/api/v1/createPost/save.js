const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  // vImageName: Joi.string().required().label("vImageName"),
  // vCatId: Joi.string().required().label("vCatId"),
  // vStartColor: Joi.string().label("vStartColor").allow(""),
  // vEndColor: Joi.string().label("vEndColor").allow(""),
  // vLanguageId: Joi.string().label("vLanguageId").allow(""),
  // vTextColor: Joi.string().label("vTextColor").allow(""),
  // isTrending: Joi.bool().label("isTrending").allow(""),
});


module.exports = saveSchema