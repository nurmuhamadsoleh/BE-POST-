import dbs from "../../models/index.js";
import { request, response } from "express";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import { Op } from "sequelize";

export const read_category = async (req = request, res = response) => {
  try {
    const search = req.query.search_query || "";
    const read_category = await dbs.category.findAll({
      where: {
        name: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: {
        include: ["id", "name", "description"],
        // exclude: ["public_id"],
      },
      include: [
        {
          model: dbs.product,
          as: "product",
          attributes: ["id", "name", "description", "stock", "price"],
        },
      ],
      order: [["id", "ASC"]],
    });
    return success_response(res, read_category, 200);
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
