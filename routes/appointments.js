var express = require("express");
var router = express.Router();
const { validator, roles } = require("../utils/validator");
const controllers = require("../controllers/appointments");

router.post("/earch", validator(controllers.search, roles.authorized));
router.post("/create", validator(controllers.create, roles.authorized));
router.get("/getAll", validator(controllers.getAll, roles.authorized));
router.post("/update", validator(controllers.update, roles.authorized));

module.exports = router;
