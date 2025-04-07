const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId").trim(),
  vName: Joi.string().required().label("vName").trim(),
  vIcon: Joi.string().required().label("vIcon"),
  vLanguageId: Joi.string().required().label("vLanguageId").trim(),
  iAppType: Joi.number().required().label("iAppType"),
  iNumber: Joi.number().required().label("iNumber"),
});

module.exports = updateSchema;
