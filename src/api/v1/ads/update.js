const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vAdsId: Joi.string().label("vAdsId").allow(""),
  Adstart: Joi.boolean().label("bAdstart").allow(""),
  GBanner: Joi.string().label("vGBanner").allow(""),
  GInter: Joi.string().label("vGInter").allow(""),
  GNative: Joi.string().label("vGNative").allow(""),
  GOpanApp: Joi.string().label("vGOpanApp").allow(""),
  GReward: Joi.string().label("vGReward").allow(""),
  FBanner: Joi.string().label("vFBanner").allow(""),
  FInter: Joi.string().label("vFInter").allow(""),
  FNative: Joi.string().label("vFNative").allow(""),
  // FNativeBanner: Joi.string().label("FNativeBanner").allow(""),
  AdPlatform: Joi.string().label("vAdPlatform").allow(""),
  InterTime: Joi.number().label("vInterTime").allow(""),
  UpdateApp: Joi.number().label("vUpdateApp").allow(""),
  UnderWork: Joi.boolean().label("vUnderWork").allow(""),
  AdxBanner: Joi.string().label("vAdxBanner").allow(""),
  AdxInter: Joi.string().label("vAdxInter").allow(""),
  AdxNative: Joi.string().label("vAdxNative").allow(""),
  AdxOpanApp: Joi.string().label("vAdxOpanApp").allow(""),
  AdxReward: Joi.string().label("vAdxReward").allow(""),
  OtherLink: Joi.string().label("OtherLink").allow(""),
  FNativeBanner: Joi.string().label("FNativeBanner").allow(""),
  NativePosition: Joi.number().label("NativePosition").allow(""),
  PostLimit: Joi.number().label("PostLimit").allow(""),
});


module.exports = updateSchema

