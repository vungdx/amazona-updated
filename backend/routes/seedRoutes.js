import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({}); // xóa những lần load lại http://localhost:5000/api/seed
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany({});
  const createUsers = await User.insertMany(data.users);
  res.send({ createUsers, createdProducts });
});

export default seedRouter;
