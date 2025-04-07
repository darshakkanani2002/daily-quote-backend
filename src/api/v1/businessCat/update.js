const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId").trim(),
  vName: Joi.string().required().label("vName"),
  vIcon: Joi.string().label("vIcon").allow(""),
  iNumber: Joi.number().label("iNumber").allow(""),
});

module.exports = updateSchema;
