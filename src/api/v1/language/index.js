const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
// const multer = require("multer");

// const storageEngine = multer.diskStorage({
//   destination: "./public/images",
//   filename: (req, file, cb) => {
//     cb(null, `$${file.originalname}:-${Date.now()}`);
//   },
// });

// const upload = multer({
//   storage: storageEngine,
// });
// SCHEMA
const saveSchema = require("./save");
const listSchema = require("./list");
const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const save = require("../../../services/language/save");
const list = require("../../../services/language/list");
const update = require("../../../services/language/update");
const deletelanguage = require("../../../services/language/delete");


router.post(
  "/details",
  // upload.single("vIcon"),
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
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

router.put(
  "/details",
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deletelanguage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,

  })
);

module.exports = router;
