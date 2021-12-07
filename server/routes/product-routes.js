const router = require("express").Router();
const multer = require("multer");
const { createProduct, findProductBySlug } = require("../controller/product-auth");
const { requireSignIn, sellerMiddleware } = require("../middleware/middleware");
const Product = require("../models/product-model");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
    destination : function(req, res, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename : function(req, file, cb) {
        cb(null, uuid.v4() + '-' + file.originalname)
    }
})

const upload = multer({storage});


router.post("/create", requireSignIn, sellerMiddleware, upload.array("productPictures"), createProduct);
router.get("/:slug", findProductBySlug);

module.exports = router;