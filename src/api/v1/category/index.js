const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
// const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const listSchema = require("./list");
const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const saveCat = require("../../../services/category/save");
const listCat = require("../../../services/category/list");
const updateCat = require("../../../services/category/update");
const deleteCat = require("../../../services/category/delete");

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
