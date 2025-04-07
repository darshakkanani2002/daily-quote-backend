const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
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
const staticSchema = require("./Static");
const staticWithoutLoginSchema = require("./StaticWithoutLogin");
const withoutLoginlistSchema = require("./listWithoutLogin");

// SERVICES
const save = require("../../../services/homePost/save");
const list = require("../../../services/homePost/list");
const update = require("../../../services/homePost/update");
const deleteImage = require("../../../services/homePost/delete");
const staticData = require("../../../services/homePost/static");
const staticWithoutLoginData = require("../../../services/homePost/staticWithoutlogin");
const withoutLoginlist = require("../../../services/homePost/listWithoutLogin");

router.post(
  "/details",
  upload.array("vImages"),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.post(
  "/frameBycatId",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

router.post(
  "/postDSLCount",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: staticData,
    isRequestValidateRequired: true,
    schemaValidate: staticSchema,
  })
);

router.post(
  "/postDSLCountWithoutLogin",
  // userAuthentication.bind({}),
  commonResolver.bind({
    modelService: staticWithoutLoginData,
    isRequestValidateRequired: true,
    schemaValidate: staticWithoutLoginSchema,
  })
);

router.post(
  "/withoutLoginList",
  commonResolver.bind({
    modelService: withoutLoginlist,
    isRequestValidateRequired: true,
    schemaValidate: withoutLoginlistSchema,
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
    modelService: deleteImage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
