const { Joi } = require("../../../utils/schemaValidate");

 const updateSchema = Joi.object({
  vFrameId: Joi.string().required().label("vFrameId"),
  vFrameName: Joi.string().required().label("vFrameName").trim(),
});


module.exports = updateSchema

