
const Expense = require("../models/Transaction");

const getExpenses = async (req, res) => {
  const {
    category,
    startDate,
    endDate,
    sortBy = "date",
    order = "desc",
    page = 1,
    limit = 10,
  } = req.query;
  const filter = { user: req.user._id };
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  const sort = { [sortBy]: order === "asc" ? 1 : -1 };
  const skip = (Number(page) - 1) * Number(limit);
  const [expenses, total] = await Promise.all([
    Expense.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Expense.countDocuments(filter),
  ]);
  res.json({
    expenses,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

const createExpense = async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user._id });
  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json(expense);
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json({ message: "Expense deleted" });
};

const getSummary = async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const [thisMonth, thisYear, byCategory] = await Promise.all([
    Expense.aggregate([
      { $match: { user: userId, date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Expense.aggregate([
      { $match: { user: userId, date: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]),
  ]);
  res.json({
    totalThisMonth: thisMonth[0]?.total || 0,
    totalThisYear: thisYear[0]?.total || 0,
    highestCategory: byCategory[0]?._id || null,
    byCategory,
  });
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary,
};

