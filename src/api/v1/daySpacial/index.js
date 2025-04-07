const { Router } = require("express");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const commonResolver = require("../../../utils/commonResolver");

const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/daySpacial",
  filename: (req, file, cb) => {
    cb(null, `$${file.originalname}:-${Date.now()}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

// SCHEMA
const saveBannerSchema = require("./save");
const listBannerSchema = require("./list");
const updateBannerSchema = require("./update");
const deleteBannerSchema = require("./delete");
const staticSchema = require("./Static");
// services
const save = require("../../../services/daySpacial/save");
const list = require("../../../services/daySpacial/list");
const update = require("../../../services/daySpacial/update");
const deleteDaySpecial = require("../../../services/daySpacial/delete");
const staticData = require("../../../services/daySpacial/static");

// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();


router.post(
  "/details",
  upload.array("vImages", 10),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveBannerSchema,
  })
);

router.post(
  "/list",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listBannerSchema,
  })
);

router.put(
  "/details",
  upload.single("vimage"),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateBannerSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteDaySpecial,
    isRequestValidateRequired: true,
    schemaValidate: deleteBannerSchema,
  })
);

router.delete(
  "/static",
  commonResolver.bind({
    modelService: staticData,
    isRequestValidateRequired: true,
    schemaValidate: staticSchema,
  })
);

module.exports = router;
