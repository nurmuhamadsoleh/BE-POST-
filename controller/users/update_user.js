import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import sizeOf from "image-size";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const update_user = async (req = request, res = response) => {
  try {
    const { name, email, password, newPassword, konfirmasiPassword } = req.body;
    const id = req.params.id;
    const users = await dbs.users.findByPk(id);
    if (!users) {
      return error_response(res, "User not Found", 404);
    }
    const user_detail = await dbs.users.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email", "password", "public_id", "url"],
    });
    const match = await bcrypt.compare(password, user_detail.password);
    if (!match) {
      return error_response(res, "Password Salah", 400);
    }
    if (konfirmasiPassword !== newPassword) {
      return error_response(res, "Password Tidak Cocok", 400);
    }
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(newPassword.toString(), salt);
    let dimensions = sizeOf(req.file.path);
    let size = req.file.size;
    if (size > 2014288) {
      return res.status(422).json({
        status: 422,
        message: "Image must be less than 2 MB",
      });
    }
    if (dimensions.width > 1000 || dimensions.height > 1000) {
      return error_response(res, "Dimensions not allowed", 422);
    }
    // Ketika req.file.path tidak kosong/null maka akan mengapus public_id yang ada di database di ganti dengan image yang baru.
    if (req.file.path !== "") {
      const image_id = user_detail.public_id;
      console.log("image_id lst", image_id);
      if (image_id) {
        await cloudinary.v2.uploader.destroy(image_id);
      }
      const hsl = new Promise((resolve, rejects) => {
        cloudinary.v2.uploader.upload(
          req.file.path,
          {
            crop: "scale",
            fetch_format: "auto",
            folder: "products",
            version: "1573726751",
            cloud_name: process.env.CLOUD_NAME,
            secure: "true",
            alt: req.file.originalname,
          },
          async (err, result) => {
            if (err) throw err;
            const user = await dbs.users.update(
              {
                name: name,
                email: email,
                password: hashpassword,
                public_id: result.public_id,
                url: result.secure_url,
              },
              {
                where: {
                  id: id,
                },
              }
            );
            resolve(result.url);
            // console.log("result url", result.public_id);
            // console.log("result_secureurl", result.secure_url);
            return res.status(200).json({
              success: true,
              messege: "success update data",
              data: user,
            });
          }
        );
      });
      const data = await hsl;
    }
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
