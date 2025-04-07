const { Router } = require("express");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const commonResolver = require("../../../utils/commonResolver");

const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/images",
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
const save = require("../../../services/banner/save");
const list = require("../../../services/banner/list");
const update = require("../../../services/banner/update");
const deleteBanner = require("../../../services/banner/delete");

// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SERVICES

// import { acceptSeva } from "../../../services/seva/acceptSeva";

router.post(
  "/details",
  upload.single("vBannerImg"),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveBannerSchema,
  })
);

router.get(
  "/details",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listBannerSchema,
  })
);

router.put(
  "/details",
  upload.single("vBannerImg"),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateBannerSchema,
  })
);
router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteBanner,
    isRequestValidateRequired: true,
    schemaValidate: deleteBannerSchema,
  })
);

module.exports = router;
