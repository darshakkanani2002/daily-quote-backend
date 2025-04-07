const { Router } = require("express");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const commonResolver = require("../../../utils/commonResolver");

const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/upcomingEvent",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
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
// services
const save = require("../../../services/upcomingEvent/save");
const list = require("../../../services/upcomingEvent/list");
const update = require("../../../services/upcomingEvent/update");
const deleteDaySpecial = require("../../../services/upcomingEvent/delete");

// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

router.post(
  "/details",
  upload.single("vImages"),
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
  // upload.single("vimage"),
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

module.exports = router;
