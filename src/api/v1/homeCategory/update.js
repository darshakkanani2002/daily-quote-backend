const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId").trim(),
  vName: Joi.string().required().label("vName").trim(),
  vLanguageId: Joi.string().required().label("vLanguageId"),
  iNumber: Joi.number().required().label("iNumber"),
  vIcon: Joi.string().label("vIcon").allow(""),
  iAppType: Joi.number().required().label("iAppType"),
});

module.exports = updateSchema;
