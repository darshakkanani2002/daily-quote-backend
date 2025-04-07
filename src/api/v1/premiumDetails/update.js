const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vPremiumId: Joi.string().required().label("vPremiumId"),
  vTitle: Joi.string().required().label("vFestivalTitle"),
  isFestival: Joi.boolean().required().label("isFestival"),
  vFestivalDiscount: Joi.string().required().label("vFestivalDiscount"),
  arrOfferDetails: Joi.array().required().label("vFestivalDiscount"),
  arrPremium: Joi.array().items({
    vDay: Joi.string().required().label("vDay"),
    vPrice: Joi.string().required().label("vPrice"),
    vDiscountPrice: Joi.string().required().label("vDiscountPrice"),
  }),
});

module.exports = updateSchema;
