import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipiesModel from "./models/recipies.js";
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

app.post("/api/recipies", async (req, res) => {
  console.log("our Request ", req.body);
  const body = req.body;
  // const {
  //   title,
  //   catgory,
  //   prepTime,
  //   difficulty,
  //   description,
  //   ingredients,
  //   instructions,
  // } = body;
  try {
    await recipiesModel.create(body);
    res.json("request send successfully ");
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`),
);
