const { Joi } = require("../../../utils/schemaValidate");

const premiumSchema = Joi.object({
  vPaymentId: Joi.string().required().label("vPaymentId").trim(),
  vAmount: Joi.string().required().label("vAmount"),
  vPaymentMethod: Joi.string().required().label("vPaymentMethod").trim(),
  vPaymentDetails: Joi.string().label("vPaymentDetails").allow(""),
  iPremiumType: Joi.number().required().label("iPremiumType"),
});

module.exports = premiumSchema;
