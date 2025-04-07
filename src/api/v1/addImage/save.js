const { Joi } = require("../../../utils/schemaValidate");

 const saveSchema = Joi.object({
  // vFrameName: Joi.string().required().label("vFrameName"),
  // vCatId: Joi.string().required().label("vCatId"),
});


module.exports = saveSchema