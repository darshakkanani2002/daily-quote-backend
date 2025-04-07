const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vName: Joi.string().required().label("vName"),
  vCatId: Joi.string().required().label("vCatId"),
  vIcon: Joi.string().label("vIcon").allow(""),
  iNumber: Joi.number().label("iNumber").allow(""),
});

module.exports = saveSchema;
