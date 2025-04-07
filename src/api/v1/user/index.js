const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(null, `$${file.originalname}:-${Date.now()}`);
  },
});

const upload = multer({
  storage: storageEngine,
});
// SCHEMA
const signUpSchema = require("./signUp");
const loginSchema = require("./login");
const updateUserSchema = require("./updateUser");
// const deleteUserSchema = require("./deleteUser");
const listUserSchema = require("./listUser");
const premiumSchema = require("./premium");

// SERVICES
const onSignUp = require("../../../services/user/signUp");

const updateUser = require("../../../services/user/updateUser");

const deleteUser = require("../../../services/user/deleteUser");

const viewUser = require("../../../services/user/viewUserList");

const Login = require("../../../services/user/login");
const premium = require("../../../services/user/premium");

router.post(
  "/signUp",
  upload.single("vImage"),
  commonResolver.bind({
    modelService: onSignUp,
    isRequestValidateRequired: true,
    schemaValidate: signUpSchema,
  })
);

router.post(
  "/login",
  commonResolver.bind({
    modelService: Login,
    isRequestValidateRequired: true,
    schemaValidate: loginSchema,
  })
);

router.put(
  "/updateUser",
  upload.single("vImage"),
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: updateUser,
    isRequestValidateRequired: true,
    schemaValidate: updateUserSchema,
  })
);

router.delete(
  "/deleteUser",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: deleteUser,
    isRequestValidateRequired: false,
    // schemaValidate: deleteUserSchema,
  })
);

router.get(
  "/viewUser",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: viewUser,
    isRequestValidateRequired: false,
    // schemaValidate: listUserSchema,
  })
);

router.post(
  "/premiumUser",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: premium,
    isRequestValidateRequired: true,
    schemaValidate: premiumSchema,
  })
);

module.exports = router;
