import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import cloudinary from "cloudinary";
import sizeOf from "image-size";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const update_product = async (req = request, res = response) => {
  try {
    const { name, description, stock, price, nama, status } = req.body;
    const id = req.params.id;
    const product = await dbs.product.findByPk(id);
    if (!product) {
      return error_response(res, "Product not Found", 404);
    }
    const product_detail = await dbs.product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        include: ["id", "name", "description", "stock", "price"],
        // exclude: ["public_id"],
      },
      include: [
        {
          model: dbs.medialist,
          as: "medialist",
          attributes: [
            "id",
            "size",
            "nama",
            "total_ads",
            "status",
            "url",
            "public_id",
            "productId",
          ],
        },
        // Jika ada yang berelasi lagi tamabahkan disini
      ],
    });
    let totalImage = req.files.length ? req.files.length : 0;
    let images = req.files;
    await dbs.product.update(
      {
        name: name,
        description: description,
        stock: parseInt(stock),
        price: price,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return new Promise((resolve) => {
      images.map((d) => {
        console.log("path", d.path);
        if (d.path !== "") {
          product_detail.medialist.map((d) => {
            cloudinary.v2.uploader.destroy(d.public_id);
          });
          cloudinary.v2.uploader.upload(
            d.path,
            //   console.log("size", d.size),
            {
              crop: "fill",
              fetch_format: "auto",
              folder: "medialist",
              version: "1573726751",
              cloud_name: process.env.CLOUD_NAME,
              secure: "true",
              alt: d.originalname,
            },
            async (err, result) => {
              if (err) throw err;
              console.log("result", result.secure_url);
              const media = await dbs.medialist.update(
                {
                  size: d.size,
                  nama: nama,
                  public_id: result.public_id,
                  url: result.secure_url,
                  total_ads: totalImage,
                  status: status,
                },
                {
                  where: {
                    productId: id,
                  },
                }
              );
              resolve(result.url);
            }
          );
        }
      });
      return res.status(200).json({
        success: true,
        messege: "success update media",
        data: media,
      });
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
