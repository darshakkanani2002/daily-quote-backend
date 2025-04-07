const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vName: Joi.string().label("vName").allow(""),
  vBusinessCatId: Joi.string().label("vBusinessCatId").allow(""),
  vAddress: Joi.string().label("vAddress").allow(""),
  vMobile: Joi.string().label("vMobile").allow(""),
  vImage: Joi.string().label("vImage").allow(""),
  vEmail: Joi.string().label("vEmail").allow(""),
  vWpNumber: Joi.string().label("vWpNumber").allow(""),
  vWebLink: Joi.string().label("vWebLink").allow(""),
  vSocialId: Joi.string().label("vSocialId").allow(""),
});

module.exports = saveSchema;
