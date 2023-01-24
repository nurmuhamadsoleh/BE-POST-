import { request, response } from "express";
import dbs from "../../models/index.js";
import { success_response } from "../../utils/success/success_response.js";
import { error_response } from "../../utils/errors/errors_response.js";

export const get_promobyid = async (req = request, res = response) => {
  try {
    const read_promo = await dbs.promo.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        include: [
          "id",
          "percentase",
          "value",
          "start_date",
          "end_date",
          "productId",
        ],
        // exclude: ["public_id"],
      },
    });
    return success_response(res, read_promo, 200);
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
