const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vLanguageId: Joi.string().required().label("vLanguageId"),
  vName: Joi.string().required().label("vName"),
  iNumber: Joi.number().label("iNumber").allow(""),
  vIcon: Joi.string().label("vIcon").allow(""),
  iAppType: Joi.number().label("iAppType").allow(""),
});

module.exports = saveSchema;
