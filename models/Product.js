const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    weight: { type: String },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0, min: 0 },
    expiry: { type: Date },
    image: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
