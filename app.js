import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
//need explanation
app.use(express.urlencoded({ extended: true }));
dotenv.config();
//----

const URI = process.env.MONGODB_URI;
const PORT = 5000;
mongoose
  .connect(URI)
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log("mongoDB ERROR!", err));

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`),
);
