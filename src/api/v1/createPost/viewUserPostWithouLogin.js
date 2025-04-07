const { Joi } = require("../../../utils/schemaValidate");


const UserPostWithoutLoginSchema = Joi.object({
  // vCatId: Joi.string().required().label("vCatId"),
  vUserId: Joi.string().required().label("vUserId"),
  iPage: Joi.number().required().label("iPage").default(1),
  iLimit: Joi.number().required().label("iLimit").default(10),
});


module.exports = UserPostWithoutLoginSchema








