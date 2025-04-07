const { Joi } = require("../../../utils/schemaValidate");

const deleteBannerSchema = Joi.object({
  arrDaySpecialId: Joi.array().required().label("arrDaySpecialId"),
});

module.exports = deleteBannerSchema;
