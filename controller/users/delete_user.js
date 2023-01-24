import { request, response } from "express";
import cloudinary from "cloudinary";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import dotenv from "dotenv";
import product from "../../models/product.js";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const user_delete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const findUser = await dbs.users.findByPk(id);
    // console.log("findUser id", findUser.public_id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const image_id = findUser.public_id;
    if (image_id) {
      await cloudinary.v2.uploader.destroy(image_id);
    }
    const user_delete = await dbs.users.destroy({
      where: {
        id: id,
      },
    });
    // const imgId = await dbs.users.image.public_id;
    // console.log("image_id", imgId);
    // const userAll = await dbs.users.findAll();
    // console.log("image", userAll[0].image);
    // cloudinary.v2.uploader.destroy(imgId);
    // await dbs.users.destroy({
    //   where: {
    //     id: id,
    //   },
    // });
    // const data = await hsl;
    // return success_response(res, findUser, 200);
    return success_response(res, user_delete, 200);
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
