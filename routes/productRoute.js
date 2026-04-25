const express = require("express");
const {
  createProduct,
  getProducts,
  getProductsByCategory,
} = require("../controllers/productController");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);

router.get("/:categoryId", getProductsByCategory);

module.exports = router;
