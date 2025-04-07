const { Joi } = require("../../../utils/schemaValidate");

const staticSchema = Joi.object({
    vPostId: Joi.string().required().label("vPostId"),
    iDownload: Joi.boolean().label("iDownload").allow(""),
    iShare: Joi.boolean().label("iShare").allow(""),
    iLike: Joi.boolean().label("iLike").allow(""),

});


module.exports = staticSchema

