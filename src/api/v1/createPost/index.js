const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/userImage",
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
const allUserlistSchema = require("./allUserList");
const allUserWithoutlistSchema = require("./allUserListWithoutLogin");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
const viewUserPostSchema = require("./viewUserPost");
const staticSchema = require("./Static");
const UserPostWithoutLoginSchema = require("./viewUserPostWithouLogin");

// SERVICES
const save = require("../../../services/createPost/save");
const allUserlist = require("../../../services/createPost/allUserList");
const allUserListWithoutLogin = require("../../../services/createPost/allUserListWithoutLogin");
const list = require("../../../services/createPost/list");
const update = require("../../../services/createPost/update");
const staticData = require("../../../services/createPost/static");
const deleteImage = require("../../../services/createPost/delete");
const viewUserPost = require("../../../services/createPost/viewUserPost");
const viewUserPostWithoutLogin = require("../../../services/createPost/viewUserPostWithoutLogin");

router.post(
  "/details",
  userAuthentication.bind({}),
  upload.single("vImage"),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.post(
  "/allUserlist",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: allUserlist,
    isRequestValidateRequired: true,
    schemaValidate: allUserlistSchema,
  })
);

router.post(
  "/allUserListWithoutLogin",
  commonResolver.bind({
    modelService: allUserListWithoutLogin,
    isRequestValidateRequired: true,
    schemaValidate: allUserWithoutlistSchema,
  })
);


router.post(
  "/list",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

router.post(
  "/userPost",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: viewUserPost,
    isRequestValidateRequired: true,
    schemaValidate: viewUserPostSchema,

  })
);

router.post(
  "/userPostWithoutLogin",
  commonResolver.bind({
    modelService: viewUserPostWithoutLogin,
    isRequestValidateRequired: true,
    schemaValidate: UserPostWithoutLoginSchema,

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

router.post(
  "/postDSLCount",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: staticData,
    isRequestValidateRequired: true,
    schemaValidate: staticSchema,
  })
);

router.delete(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: deleteImage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,

  })
);

module.exports = router;
