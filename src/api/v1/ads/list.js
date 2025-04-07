const { Joi } = require("../../../utils/schemaValidate");


 const listSchema = Joi.object({
  vDrCatId: Joi.string().label("vDrCatId").allow(""),
});


module.exports = listSchema



