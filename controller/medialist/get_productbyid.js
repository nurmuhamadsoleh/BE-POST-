import { request, response } from "express";
import dbs from "../../models/index.js";
import { success_response } from "../../utils/success/success_response.js";
import { error_response } from "../../utils/errors/errors_response.js";

export const get_productbyid = async (req = request, res = response) => {
  try {
    const get = await dbs.product.findOne({
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
          attributes: ["id", "size", "nama", "total_ads", "status", "url"],
        },
        // Jika ada yang berelasi lagi tamabahkan disini
      ],
    });
    return success_response(res, get, 200);
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
