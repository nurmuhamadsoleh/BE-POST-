import { request, response } from "express";
import dbs from "../../models/index.js";
import promo from "../../models/promo.js";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";

export const promo_create = async (req = request, res = response) => {
  try {
    // const findbyId = await dbs.promo.findbyId(req.params.id);
    let data = req.body;
    const promo = await dbs.promo.create({
      percentase: data.percentase,
      value: data.value,
      start_date: data.value,
      end_date: data.end_date,
      productId: data.productId, //select option
    });
    return success_response(res, promo, 200);
    // setPromo di Dashboard Product Ketika Edit
    // const findByPk = await dbs.product.findOne({
    //   attributes: ["id", "name", "description", "stock", "price"],
    //   order: [["id", "ASC"]],
    // });
    // const create_byId = await dbs.product.findAll({
    //   where: {
    //     id: req.params.id,
    //   },
    //   attributes: {
    //     include: ["id", "name", "description", "stock", "price"],
    //     // exclude: ["public_id"],
    //   },
    // });
    // console.log("findById", create_byId);
    // let data = [];
    // create_byId.map(async (d) => {
    //   console.log("item", d.price);
    //   var hasil = req.body.percentase * d.price;
    //   console.log(hasil);
    //   const data = await dbs.promo.create({
    //     productId: d.dataValues.id,
    //     percentase: req.body.percentase,
    //     value: d.price - hasil,
    //     start_date: req.body.start_date,
    //     end_date: req.body.end_date,
    //   });
    //   console.log("value", data.value);
    //   //   return res.status(201).json({
    //   //     success: true,
    //   //     data: data,
    //   //   });
    // });
    // let data = [];
    // const promo = await dbs.promo.create({
    //   productId: create_byId.dataValues.id,
    //   percentase: req.body.percentase,
    //   value: req.body.value,
    //   //   Iklan Mulai
    //   start_date: req.body.start_date,
    //   //   Iklan berakhir
    //   end_date: req.body.end_date,
    // });
    // data.push(promo);
    // console.log("data array", data);
    // return res.status(200).json({
    //   success: false,
    //   data: promo,
    // });
    // findByPk.map(async (d) => {
    //   console.log("items", d.id);
    //   const promo = await dbs.promo.create({
    //     productId: d.id,
    //     percentase: req.body.percentase,
    //     value: req.body.value,
    //     start_date: req.body.start_date,
    //     end_date: req.body.end_date,
    //     // total_payment: req.body.total_payment,
    //     // status_payment: req.body.status_payment,
    //   });
    //   //   console.log("promo", promo);
    // });
    // return res.status(200).json({
    //   success: true,
    //   //   message: promo,
    //   message: "success create data promo",
    // });
    // console.log("findbyId", findByPk);
    // return success_response(res, order, 200);
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
