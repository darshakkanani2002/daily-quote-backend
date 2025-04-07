const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  // vImageName: Joi.string().required().label("vImageName"),
});


module.exports = saveSchema