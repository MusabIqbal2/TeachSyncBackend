var express = require("express");
var router = express.Router();
const { validator, roles } = require("../utils/validator");
const schemas = require("../schemas/auth");
const controllers = require("../controllers/auth");

router.post("/signUp", validator(controllers.signup, roles.unauthorized, schemas.signUp));
router.post("/login", validator(controllers.login, roles.unauthorized, schemas.login));

module.exports = router;
