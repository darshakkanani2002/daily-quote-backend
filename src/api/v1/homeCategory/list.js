const { Joi } = require("../../../utils/schemaValidate");


const listSchema = Joi.object({
  vLanguageId: Joi.string().required().label("vLanguageId"),
});


module.exports = listSchema



