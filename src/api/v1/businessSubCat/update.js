const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vSubCatId: Joi.string().required().label("vSubCatId").trim(),
  vName: Joi.string().required().label("vName"),
  vCatId: Joi.string().required().label("vCatId"),
  vIcon: Joi.string().required().label("vIcon"),
  iNumber: Joi.number().label("iNumber").allow(""),
});

module.exports = updateSchema;
