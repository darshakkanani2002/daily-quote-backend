const { Joi } = require("../../../utils/schemaValidate");


 const deleteSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId"),
});


module.exports = deleteSchema




 

