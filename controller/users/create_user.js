import { request, response } from "express";
import dbs from "../../models/index.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import dotenv from "dotenv";
import sizeOf from "image-size";
import path from "path";
// import { fileURLToPath } from "url";
// import { rejects } from "assert";
// import { error } from "console";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const user_create = async (req = request, res = response) => {
  // try {
  //   let { name, email, password } = req.body;
  //   //melakukan enksripsi password
  //   const salt = await bcrypt.genSalt();
  //   const hashpassword = await bcrypt.hash(password.toString(), salt);
  //   const user = await dbs.users.create({
  //     name: name,
  //     email: email,
  //     password: hashpassword,
  //   });
  //   res.status(200).json({
  //     status: 200,
  //     messege: "Sukses Create Data",
  //     data: user,
  //   });
  //   // return;
  // } catch (error) {
  //   res.status(500).json({
  //     message:
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message,
  //   });
  // }
  try {
    // console.log("req file single", req.file);
    // console.log("req files multiple", req.files);
    const { name, email, password } = req.body;
    // const { image } = req.file;
    // chechk email di database bru validasi email
    // validasi width & height image
    let dimensions = sizeOf(req.file.path);
    let size = req.file.size;
    // console.log("size", size);
    if (size > 2014288) {
      return res.status(422).send({
        status: 422,
        messege: "Image must be less than 2 MB",
      });
    }
    if (dimensions.width > 1000 || dimensions.height > 1000)
      return res.status(404).json({
        success: false,
        message: "dimension not allowed",
      });
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password.toString(), salt);
    const hsl = new Promise((resolve, rejects) => {
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          crop: "fill",
          fetch_format: "auto",
          folder: "products",
          version: "1573726751",
          cloud_name: process.env.CLOUD_NAME,
          secure: "true",
          alt: req.file.originalname,
        },
        async (err, result) => {
          if (err) throw err;
          const user = await dbs.users.create({
            name: name,
            email: email,
            password: hashpassword,
            public_id: result.public_id,
            url: result.secure_url,
          });
          resolve(result.url);
          // console.log("result url", result.public_id);
          // console.log("result_secureurl", result.secure_url);
          return res.status(201).json({
            success: true,
            message: "success create data",
            data: user,
          });
        }
        // console.log(req.file.filename);
      );
    });
    const data = await hsl;

    // return success_response(res, data, 201);
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
