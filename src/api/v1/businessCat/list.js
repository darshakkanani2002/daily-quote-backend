const { Joi } = require("../../../utils/schemaValidate");


const listSchema = Joi.object({
  vCatId: Joi.string().label("vCatId").allow(""),
});


module.exports = listSchema



