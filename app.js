import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipiesModel from "./models/recipies.js";
import cors from "cors";
import chefModel from "./models/Chefs.js";
import bcrypt from "bcryptjs";
const app = express();
app.use(express.json());
//need explanation
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());
//----

const URI = process.env.MONGODB_URI;
const PORT = 5000;
mongoose
  .connect(URI)
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log("mongoDB ERROR!", err));

// Recipie CRUD Operations
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
    const id = req.query.recipieID;
    if (!id) {
      const data = await recipiesModel.find();
      res.json({
        message: "all recipie fetch",
        data: data,
        status: true,
      });
    } else {
      const dataById = await recipiesModel.findById(id);
      res.json({
        message: "single recipie fetch",
        data: dataById,
        status: true,
      });
    }
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

// User Sign in and Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, cuisine } = req.body;
    // Form Validation
    if (!name || !email || !password) {
      res.json({
        message: "Necessary Information is not fullfilled ",
        status: false,
      });
    }
    // verifying if user exists or not
    const chefData = await chefModel.findOne({ email });
    if (chefData) {
      res.json({
        message: "User Already exists ",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashed Pass", hashPassword);

    res.send("register successful");
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
