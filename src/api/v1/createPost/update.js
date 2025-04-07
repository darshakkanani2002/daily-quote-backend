const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vFrameId: Joi.string().required().label("vFrameId"),
  vFrameName: Joi.string().label("vFrameName").allow("").trim(),
  vStartColor: Joi.string().label("vStartColor").allow(""),
  vEndColor: Joi.string().label("vCatId").allow(""),
  vTextColor: Joi.string().label("vTextColor").allow(""),

});


module.exports = updateSchema

