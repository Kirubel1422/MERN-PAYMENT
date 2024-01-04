require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = express();
const URL = process.env.DB_URL;

const userRouter = require("./routes/userRouter");
const paymentRouter = require("./routes/paymentRouter");
const PORT = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.error(error);
  }
};

connect();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/account", userRouter);
// Authorization
app.use("/payment", paymentRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
