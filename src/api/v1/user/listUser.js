const { Joi } = require("../../../utils/schemaValidate");


const listUserSchema = Joi.object({
  vUserId: Joi.string().label("vUserId").allow(""),
});


module.exports = listUserSchema




