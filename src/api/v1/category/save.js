const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vLanguageId: Joi.string().required().label("vLanguageId"),
  vName: Joi.string().required().label("vName"),
  vIcon: Joi.string().required().label("vIcon"),
  iAppType: Joi.number().label("iAppType").allow(""),
  iNumber: Joi.number().label("iNumber").allow(""),
});

module.exports = saveSchema;
