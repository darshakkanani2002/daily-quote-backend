const { Joi } = require("../../../utils/schemaValidate");


const deleteSchema = Joi.object({
  vImageId: Joi.string().required().label("vImageId"),
});


module.exports = deleteSchema






