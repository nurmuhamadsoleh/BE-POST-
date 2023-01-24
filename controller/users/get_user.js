import { request, response } from "express";
import dbs from "../../models/index.js";
import bcrypt from "bcrypt";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import { Op } from "sequelize";

export const getUser = async (req = request, res = response) => {
  try {
    // const page = parseInt(req.query.page) || 0;
    // const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search_query || "";
    // const offset = limit * page + 1;
    // const totalRows = await dbs.users.count({
    //   where: {
    //     [Op.or]: [
    //       {
    //         name: {
    //           [Op.like]: "%" + search + "%",
    //         },
    //       },
    //       {
    //         email: {
    //           [Op.like]: "%" + search + "%",
    //         },
    //       },
    //     ],
    //   },
    // });
    // const totalPage = Math.ceil(totalRows / limit);
    // Menghitung Jumlh dta dan menampilkan semua data
    let limit = parseInt(req.query.record);
    let search = req.query.search_query || "";
    console.log("search", search);
    let page = parseInt(req.query.page);
    let start = 0 + (page - 1) * limit; //menghitung data pertama dari setiap pae yang di input dan limit yang di input
    let end = page * limit; //menghitung data terakhir dari setiap page dan limit.

    const result = await dbs.users.findAndCountAll({
      // attributes: [["id", "name", "email", "password", "public_id", "url"]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      attributes: {
        include: ["id", "name", "email", "url"],
        exclude: ["public_id"],
      },
      order: [["id", "DESC"]],
      limit: limit,
      offset: start, //meruapakn data yang di lompat dan tidak di tampilkan

      // where: {
      //   [Op.or]: [
      //     {
      //       name: {
      //         [Op.like]: "%" + search + "%",
      //       },
      //     },
      //     {
      //       email: {
      //         [Op.like]: "%" + search + "%",
      //       },
      //     },
      //   ],
      // },
    });
    // Untuk menampilkan pagination mulai dari page yang keberapa lalu next page nya ada atau tidak dan previus page nya ada aau tidak
    let countfiltered = result.count; //jumlah data users
    // Membuat sebauh Object yang terdiri dari totalRow dan totalPage
    let pagination = {};
    pagination.totalRow = result.count; //jumlah data users
    pagination.totalPage = Math.ceil(countfiltered / limit); //hasil pagi antara jumlah data users dan limit dan di bulatkan keatas supaya hasilnya angka bulat
    // ketika jumla data terakirnya kurang dari countFilered
    if (end < countfiltered) {
      pagination.next = {
        // paginantion next akan muncul ketika ada data di page selanjutnya.
        page: page + 1,
        limit,
      };
    }
    // jika data pertamanya lebih dari 0
    if (start > 0) {
      // maka akan ada data untuk paginantion.previusnya
      pagination.prev = {
        // page - 1
        page: page - 1,
        limit,
      };
    }
    res.status(200).json({
      success: true,
      pagination,
      data: result.rows,
      // page: page,
      // limit: limit,
      // totalRows: totalRows,
      // totalPage: totalPage,
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
