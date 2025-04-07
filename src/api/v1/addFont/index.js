const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/font",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
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
const saveFont = require("../../../services/addFont/save");
const listFont = require("../../../services/addFont/list");
// const update = require("../../../services/frame/update");
const deleteFont = require("../../../services/addFont/delete");

router.post(
  "/details",
  upload.array('font', 10),
  commonResolver.bind({
    modelService: saveFont,
    isRequestValidateRequired: false,
    schemaValidate: saveSchema,
  })
);

router.post(
  "/list",
  commonResolver.bind({
    modelService: listFont,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

// router.put(
//   "/details",
//   upload.fields([{ name: "vThumbImage" }, { name: "vOriginalImage" }]),
//   commonResolver.bind({
//     modelService: update,
//     isRequestValidateRequired: true,
//     schemaValidate: updateSchema,
//   })
// );

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteFont,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,

  })
);

module.exports = router;
