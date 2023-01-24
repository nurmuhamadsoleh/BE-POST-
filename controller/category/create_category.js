import { request, response } from "express";
import dbs from "../../models/index.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const category_create = async (req = request, res = response) => {
  try {
    let data = req.body;
    const category = await dbs.category.create({
      name: data.name,
      description: data.description,
      productId: data.productId,
    });
    return success_response(res, category, 201);
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
