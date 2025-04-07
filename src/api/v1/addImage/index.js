const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
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
const saveSchema = require("./save");
// const listSchema = require("./list");
// const updateSchema = require("./update");
// const deleteSchema = require("./delete");

// SERVICES
const saveFrame = require("../../../services/addImage/save");
// const listCat = require("../../../services/frame/list");
// const update = require("../../../services/frame/update");
// const deleteFrame = require("../../../services/frame/delete");

router.post(
  "/details",
  // upload.fields([{ name: "vThumbImage" }, { name: "vOriginalImage" }]),
  upload.single("vImage"),
  commonResolver.bind({
    modelService: saveFrame,
    isRequestValidateRequired: false,
    schemaValidate: saveSchema,
  })
);

// router.post(
//   "/frameBycatId",
//   commonResolver.bind({
//     modelService: listCat,
//     isRequestValidateRequired: true,
//     schemaValidate: listSchema,
//   })
// );

// router.put(
//   "/details",
//   upload.fields([{ name: "vThumbImage" }, { name: "vOriginalImage" }]),
//   commonResolver.bind({
//     modelService: update,
//     isRequestValidateRequired: true,
//     schemaValidate: updateSchema,
//   })
// );

// router.delete(
//   "/details",
//   commonResolver.bind({
//     modelService: deleteCat,
//     isRequestValidateRequired: true,
//     schemaValidate: deleteSchema,

//   })
// );

module.exports = router;
