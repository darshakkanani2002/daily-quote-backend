const { Joi } = require("../../../utils/schemaValidate");


const deleteSchema = Joi.object({
  vFontId: Joi.string().required().label("vFontId"),
});


module.exports = deleteSchema






