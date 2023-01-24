import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import cloudinary from "cloudinary";

export const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const findProduct = await dbs.product.findByPk(id); // di fe target id medialist

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        messege: "Product Not Found",
      });
    }
    console.log("public_id", findProduct.productId);
    console.log(findProduct.productId ? 3 : 0);
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
    product_detail.medialist.map(async (d) => {
      console.log("items", d.public_id);
      await cloudinary.v2.uploader.destroy(d.public_id);
    });
    const product_delete = await findProduct.destroy();
    return res.status(200).json({
      success: true,
      data: product_delete,
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
