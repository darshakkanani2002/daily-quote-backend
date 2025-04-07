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
const saveSchema = require("./save");
const listSchema = require("./list");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
// services
const save = require("../../../services/frameColor/save");
const list = require("../../../services/frameColor/list");
const update = require("../../../services/frameColor/update");
const deleteFrameColor = require("../../../services/frameColor/delete");

// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SERVICES


router.post(
  "/details",
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
    modelService: deleteFrameColor,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
