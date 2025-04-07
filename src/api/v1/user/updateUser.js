const { Joi } = require("../../../utils/schemaValidate");

const updateUserSchema = Joi.object({
  vMobile: Joi.string().label("vMobile").allow(""),
  vImage: Joi.string().label("vImage").allow(""),
  vName: Joi.string().label("vName").allow(""),
  vAddress: Joi.string().label("vAddress").allow(""),
  vDesignation: Joi.string().label("vDesignation").allow(""),
});

module.exports = updateUserSchema;
