import dbs from "../../models/index.js";
import { request, response } from "express";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import { Op } from "sequelize";

export const getProduct = async (req = request, res = response) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    console.log("search", search);
    const offset = limit * page;
    const totalRows = await dbs.product.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            description: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    console.log(totalPage);
    const products = await dbs.product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            description: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "ASC"]],
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
            "productId",
          ],
        },
      ],
    });
    console.log("result", products);
    return res.status(200).json({
      success: true,
      data: products,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
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
