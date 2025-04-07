const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/background",
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
// const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const save = require("../../../services/background/save");
const list = require("../../../services/background/list");
// const update = require("../../../services/background/update");
const deleteImage = require("../../../services/background/delete");

router.post(
  "/details",
  upload.array("vImages", 10),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.post(
  "/list",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

// router.put(
//   "/details",
//   commonResolver.bind({
//     modelService: update,
//     isRequestValidateRequired: true,
//     schemaValidate: updateSchema,
//   })
// );

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteImage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
