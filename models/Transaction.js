const mongoose = require('mongoose');
const { TRANSACTION_TYPES, CATEGORIES } = require('../constants/enums');

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Transaction', transactionSchema);
