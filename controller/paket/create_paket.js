import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const paket_create = async (req = request, res = response) => {
  try {
    let data = req.body;
    const paket = await dbs.paket.create({
      jenis_paket: data.jenis_paket,
      price: data.price,
      productId: data.productId,
    });
    return success_response(res, paket, 201);
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
