import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipiesModel from "./models/recipies.js";
import cors from "cors"
const app = express();
app.use(express.json());
//need explanation
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors())
//----

const URI = process.env.MONGODB_URI;
const PORT = 5000;
mongoose
  .connect(URI)
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log("mongoDB ERROR!", err));
// adding data to database
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
//getting all data from the database
app.get("/api/recipies", async (req, res) => {
  try {
    const data = await recipiesModel.find();

    res.json({
      message: "all todo fetch",
      data: data,
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
});
app.put("/api/recipies/:id", async (req, res) => {
  try {
    const body = await req.body;
    const recipiesID = req.params.id;
    res.json({
      message: "Single updated",
      recipieID: recipiesID,
      data: body,
      status: true,
    });
    const updatedData = await recipiesModel.findByIdAndUpdate(recipiesID, body);
    console.log(updatedData);
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
});
app.delete("/api/recipies/:id", async (req, res) => {
  try {
    const recipiesID = req.params.id;
    res.json({
      message: "Single deleted",
      recipieID: recipiesID,
      status: true,
    });
    const deletedData = await recipiesModel.findByIdAndDelete(recipiesID);
    console.log(deletedData);
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
