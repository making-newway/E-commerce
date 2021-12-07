const router = require("express").Router();
const { addItemCart } = require("../controller/cart-auth");
const { buyerMiddleware, requireSignIn } = require("../middleware/middleware");


router.post("/addcart", requireSignIn, buyerMiddleware, addItemCart);

module.exports = router;