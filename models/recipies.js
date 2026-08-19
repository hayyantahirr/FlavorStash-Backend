import mongoose, { mongo } from "mongoose";

const recipiesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  catgory: {
    type: String,
  },
  prepTime: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  instructions: {
    type: String,
  },
});

const recipiesModel = mongoose.model("recipies", recipiesSchema);
export default recipiesModel;
