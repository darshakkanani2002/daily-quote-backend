const { Joi } = require("../../../utils/schemaValidate");

const staticSchema = Joi.object({
  vPostId: Joi.string().required().label("vPostId"),
  iDownload: Joi.boolean().label("iDownload").allow(""),
  iShare: Joi.boolean().label("iShare").allow(""),
  iLike: Joi.string().label("iLike").allow(""),
  iBDownload: Joi.boolean().label("iBDownload").allow(""),
  iBShare: Joi.boolean().label("iBShare").allow(""),
  iBLike: Joi.string().label("iBLike").allow(""),
});

module.exports = staticSchema;
