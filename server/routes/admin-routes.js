const User = require("../models/user-models");
const router = require("express").Router();
const { signup , signin, signout } = require("../controller/admin-auth");
const { validate, isValidate } = require("../controller/validators");
const { requireSignIn } = require("../middleware/middleware");

router.route("/").get((req, res) => {
    User.find({role: "seller"})
       .then(users => res.json(users))
       .catch(err => res.status(502).json(`Error : ${err}`))        
});

router.post("/signup", validate, isValidate, signup );
router.post("/signin", signin );
router.post("/signout", requireSignIn, signout)

module.exports = router;