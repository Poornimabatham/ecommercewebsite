const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/transactionRoutes");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use(errorHandler);

module.exports = app;
