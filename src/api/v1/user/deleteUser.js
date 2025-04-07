const { Joi } = require("../../../utils/schemaValidate");


const deleteUserSchema = Joi.object({
  vUserId: Joi.string().required().label("userId"),
});


module.exports = deleteUserSchema