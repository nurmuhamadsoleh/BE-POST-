import { request, response } from "express";
import dbs from "../../models/index.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import dotenv from "dotenv";
import path, { resolve } from "path";
import sizeOf from "image-size";
import cloudinaryImageUploadMethod from "../../middleware/uploadImageCloud.js";
import { url } from "inspector";
import medialist from "../../models/medialist.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const product_create = async (req = request, res = response) => {
  try {
    let totalImage = req.files.length ? req.files.length : 0;
    const reg = await dbs.product.create({
      name: req.body.name,
      description: req.body.description,
      stock: parseInt(req.body.stock),
      price: req.body.price,
    });
    // const category = await dbs.category.create({
    //   // name: req.body.jenis_paket,
    //   // description: req.body.description,
    //   productId: reg.dataValues.id,
    // });
    new Promise((resolve, reject) => {
      req.files.map((d) => {
        cloudinary.v2.uploader.upload(
          d.path,
          {
            crop: "fill",
            fecth_format: "auto",
            folder: "medialist",
            version: "1573726751",
            cloud_name: process.env.CLOUD_NAME,
            secure: true,
            alt: d.originalname,
          },
          (err, result) => {
            if (err) throw err;
            console.log("result", result.url);
            const medialist = dbs.medialist.create({
              size: d.size,
              nama: req.body.nama,
              public_id: result.public_id,
              url: result.secure_url,
              total_ads: totalImage,
              status: req.body.status,
              productId: reg.dataValues.id,
            });
            resolve(result.url);
          }
        );
      });
      return success_response(res, "success create data", 200);
    });
  } catch (error) {
    return error_response(
      res,
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      500
    );
  }
};
