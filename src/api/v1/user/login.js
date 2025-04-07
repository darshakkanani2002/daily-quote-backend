const { Joi } = require("../../../utils/schemaValidate");

const loginSchema = Joi.object({
  vEmail: Joi.string().email().required().label("vEmail").trim(),
  // vPassword: Joi.string().required().label("Password"),
  vName: Joi.string().label("vName").allow(""),
  vMobile: Joi.string().label("vName").allow(""),
  vImage: Joi.string().label("vImage").allow(""),
});

module.exports = loginSchema
