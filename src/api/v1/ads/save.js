const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  Adstart: Joi.boolean().required().label("bAdstart"),
  GBanner: Joi.string().required().label("vGBanner"),
  GInter: Joi.string().required().label("vGInter"),
  GNative: Joi.string().required().label("vGNative"),
  GOpanApp: Joi.string().required().label("vGOpanApp"),
  GReward: Joi.string().required().label("vGReward"),
  FBanner: Joi.string().required().label("vFBanner"),
  FInter: Joi.string().required().label("vFInter"),
  FNative: Joi.string().required().label("vFNative"),
  AdPlatform: Joi.string().required().label("vAdPlatform"),
  InterTime: Joi.number().required().label("vInterTime"),
  UpdateApp: Joi.number().required().label("vUpdateApp"),
  UnderWork: Joi.boolean().required().label("vUnderWork"),
  AdxBanner: Joi.string().required().label("vAdxBanner"),
  AdxInter: Joi.string().required().label("vAdxInter"),
  AdxNative: Joi.string().required().label("vAdxNative"),
  AdxOpanApp: Joi.string().required().label("vAdxOpanApp"),
  AdxReward: Joi.string().required().label("vAdxReward"),
  OtherLink: Joi.string().required().label("OtherLink"),
  FNativeBanner: Joi.string().label("FNativeBanner").allow(""),
  NativePosition: Joi.number().label("NativePosition").allow(""),
  PostLimit: Joi.number().label("PostLimit").allow(""),

});


module.exports = saveSchema