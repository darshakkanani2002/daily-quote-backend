const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/premiumDetails",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

// SCHEMA
const saveSchema = require("./save");
const listSchema = require("./list");
const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const save = require("../../../services/premiumDetails/save");
const list = require("../../../services/premiumDetails/list");
const update = require("../../../services/premiumDetails/update");
const deleteImage = require("../../../services/premiumDetails/delete");

router.post(
  "/details",
  upload.single("vFestivalImage"),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.get(
  "/details",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: false,
    schemaValidate: listSchema,
  })
);

router.put(
  "/details",
  upload.single("vFestivalImage"),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteImage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
