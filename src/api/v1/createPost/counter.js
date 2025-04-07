const { Joi } = require("../../../utils/schemaValidate");


const counterSchema = Joi.object({
  // vCatId: Joi.string().required().label("vCatId"),
  vCatId: Joi.string().label("vCatId").allow(""),
  vLanguageId: Joi.string().label("vLanguageId").allow(""),
  vAnniversaryId: Joi.string().label("vAnniversaryId").allow(""),
  vBirthdayId: Joi.string().label("vBirthdayId").allow(""),
});


module.exports = counterSchema



