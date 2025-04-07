const { Joi } = require("../../../utils/schemaValidate");


 const deleteSchema = Joi.object({
  vFrameId: Joi.string().required().label("vFrameId"),
});


module.exports = deleteSchema




 

