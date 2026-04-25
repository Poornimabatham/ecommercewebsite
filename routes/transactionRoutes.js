const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const { validate } = require("../validations/transactionValidation");
const { CATEGORIES } = require("../constants/enums");

const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} = require("../controllers/transactionController");
const expenseRules = [
  body("title").notEmpty(),
  body("amount").isNumeric(),
  body("category").isIn(CATEGORIES),
];

router.use(protect);
router.get("/summary", getSummary);
router.route("/").get(getExpenses).post(expenseRules, validate, createExpense);
router
  .route("/:id")
  .put(expenseRules, validate, updateExpense)
  .delete(deleteExpense);

module.exports = router;