const { Joi } = require("../../../utils/schemaValidate");


const listSchema = Joi.object({
  vLanguageId: Joi.string().label("vLanguageId").allow(""),
});


module.exports = listSchema



