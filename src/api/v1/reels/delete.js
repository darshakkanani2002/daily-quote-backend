const { Joi } = require("../../../utils/schemaValidate");


const deleteSchema = Joi.object({
  arrReelsId: Joi.array().required().label("arrReelsId"),
});


module.exports = deleteSchema






