import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const category_delete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const findCategory = await dbs.category.findByPK(id);
    if (findCategory) {
      return res.status(404).json({
        success: false,
        messege: "Paket Not found",
      });
    }
    const category_delete = await findCategory.destroy();
    return res.status(400).json({
      success: true,
      data: category_delete,
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
