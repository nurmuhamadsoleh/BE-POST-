import dbs from "../../models/index.js";
import { request, response } from "express";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import { Op } from "sequelize";

export const getPromo = async (req = request, res = response) => {
  try {
    // get by id
    const search = req.query.search_query || "";
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.params.limit) || 10;
    const offset = limit * page;
    const totalRows = await dbs.promo.count({
      where: {
        start_date: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    console.log(totalPage);
    const promo = await dbs.promo.findAll({
      where: {
        start_date: {
          [Op.like]: "%" + search + "%",
        },
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
      //   raw: true,
      // logging: true,
      include: [
        {
          model: dbs.product,
          as: "product",

          //   through: {
          //     attributes: [],
          //   },
          attributes: ["id", "name", "description", "stock", "price"],
          // paranoid: true,
          // require: false,
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json({
      success: true,
      data: promo,
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
