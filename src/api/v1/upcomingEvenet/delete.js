const { Joi } = require("../../../utils/schemaValidate");

const deleteBannerSchema = Joi.object({
  arrEventId: Joi.array().required().label("arrEventId"),
});

module.exports = deleteBannerSchema;
