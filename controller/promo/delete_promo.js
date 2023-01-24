import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const promoDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const findPromo = await dbs.promo.findByPk(id);
    if (!findPromo) {
      return res.status(404).json({
        success: false,
        messege: "Paket Not found",
      });
    }
    const paket_delete = await findPromo.destroy();
    return res.status(200).json({
      success: true,
      data: paket_delete,
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
