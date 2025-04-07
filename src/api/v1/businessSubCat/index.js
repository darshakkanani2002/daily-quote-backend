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
const listSchema = require("./list");
const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const saveCat = require("../../../services/businessSubCat/save");
const listCat = require("../../../services/businessSubCat/list");
const updateCat = require("../../../services/businessSubCat/update");
const deleteCat = require("../../../services/businessSubCat/delete");

router.post(
  "/details",
  commonResolver.bind({
    modelService: saveCat,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.post(
  "/list",
  commonResolver.bind({
    modelService: listCat,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

router.put(
  "/details",
  commonResolver.bind({
    modelService: updateCat,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteCat,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
