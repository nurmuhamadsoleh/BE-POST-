import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const paket_update = async (req = request, res = response) => {
  try {
    let data = req.body;
    const findPaket = await dbs.paket.findOne({
      where: {
        id: req.params.id,
      },
    });
    await dbs.paket.update(
      {
        jenis_paket: data.jenis_paket,
        price: data.price,
        productId: data.productId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return success_response(res, findPaket, 200);
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
