const { Joi } = require("../../../utils/schemaValidate");


 const deleteSchema = Joi.object({
  vLanguageId: Joi.string().required().label("vLanguageId"),
});


module.exports = deleteSchema




 

