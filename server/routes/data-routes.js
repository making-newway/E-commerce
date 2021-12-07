const router = require("express").Router();
const { data } = require("../controller/data-auth");

router.get("/", data);

module.exports = router;