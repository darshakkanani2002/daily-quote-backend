const { Joi } = require("../../../utils/schemaValidate");

const signUpSchema = Joi.object({
  vName: Joi.string().required().label("vName").trim(),
  vMobile: Joi.string().required().label("vMobile").allow(""),
  vEmail: Joi.string().email().required().label("vEmail").trim(),
  vPassword: Joi.string().required().label("Password"),
});

module.exports = signUpSchema