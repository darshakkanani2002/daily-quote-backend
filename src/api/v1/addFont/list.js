const { Joi } = require("../../../utils/schemaValidate");


const listSchema = Joi.object({

  vFontId: Joi.string().label("vFontId").allow("")
});


module.exports = listSchema



