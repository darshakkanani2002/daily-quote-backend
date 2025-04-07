const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vTitle: Joi.string().required().label("vFestivalTitle"),
  isFestival: Joi.boolean().required().label("isFestival"),
  vFestivalDiscount: Joi.string().required().label("vFestivalDiscount"),
  arrBenefits: Joi.array().required().label("arrBenefits"),
  arrPremium: Joi.array()
    .items({
      vDay: Joi.string().required().label("vDay"),
      vPrice: Joi.string().required().label("vPrice"),
      vDiscountPrice: Joi.string().required().label("vDiscountPrice"),
    })
    .allow(""),
});

module.exports = saveSchema;
