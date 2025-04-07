const { Joi } = require("../../../utils/schemaValidate");


 const listSchema = Joi.object({
  vCatId: Joi.string().required().label("vCatId"),
  vTime:Joi.string().label("vTime").allow("")
});


module.exports = listSchema



