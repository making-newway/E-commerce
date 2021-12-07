const User = require("../models/user-models");
const router = require("express").Router();
const { signup , signin } = require("../controller/user-auth");
const { isValidate, validate } = require("../controller/validators");
const { requireSignIn } = require("../middleware/middleware");

router.route("/").get((req, res) => {
    User.find({role: "buyer"})
       .then(users => res.json(users))
       .catch(err => res.status(400).json(`Error : ${err}`))        
});

router.post("/signup", validate, isValidate, signup);
router.post("/signin", signin );
router.post("/profile", requireSignIn, (req, res) => {
    res.status(201).json({ user : "Profile" })
});

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(`Error : ${err}`))
})

router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.mobile = Number(req.body.mobile);
            user.address = req.body.address;

            user.save()
                .then(() => res.body.json("User Updated"))
                .catch((err) => res.status(503).json(`Error : ${err}`))
        })
        .catch(err => res.status.apply(500).json(`Error : ${err}`))
});

router.route("/delete/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted"))
        .catch(err => res.status(503).json(`Error : ${err}`))
})

module.exports = router;