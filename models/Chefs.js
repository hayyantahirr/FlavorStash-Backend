import mongoose, { mongo } from "mongoose";

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cuisine: {
    type: [String],
  },
});

const recipiesModel = mongoose.model("chefs", chefSchema);
export default recipiesModel;
