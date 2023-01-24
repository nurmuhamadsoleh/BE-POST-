import express from "express";
import multer from "multer";
import os from "os";
import { product_create } from "../controller/medialist/index.js";
import uploadImages from "../middleware/uploadImage.js";
import { getProduct } from "../controller/medialist/read_product.js";
import { deleteProduct } from "../controller/medialist/delete_product.js";
import { get_productbyid } from "../controller/medialist/get_productbyid.js";
import { update_product } from "../controller/medialist/update_product.js";

// const upload = multer({ dest: os.tmpdir() });

const product_route = express.Router();

product_route.post(
  // res.setHeader("Content-Type", "application/json"),
  "/product/create",
  uploadImages.array("images", 3),
  product_create
);
product_route.get("/product/read", getProduct);
product_route.get("/product/read/:id", get_productbyid);
product_route.delete("/product/delete/:id", deleteProduct);
product_route.put(
  "/product/update/:id",
  uploadImages.array("images", 3),
  update_product
);

export default product_route;
