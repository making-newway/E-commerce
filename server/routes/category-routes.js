const router = require("express").Router();
const { addCategory, getCategories } = require("../controller/category-auth");
const { sellerMiddleware, requireSignIn } = require("../middleware/middleware");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const { updateCategory } = require("../controller/category-auth");

const storage = multer.diskStorage({
    destination : function(req, res, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename : function(req, file, cb) {
        cb(null, uuid.v4() + '-' + file.originalname)
    }
})

const upload = multer({storage});


router.post("/create", requireSignIn, sellerMiddleware, upload.single('categoryImages'), addCategory);
router.get("/getCategory", getCategories);
router.get("/update", upload.array('categoryImages'), updateCategory);

module.exports = router;