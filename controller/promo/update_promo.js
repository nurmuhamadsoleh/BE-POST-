import dbs from "../../models/index.js";
import { request, response } from "express";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import { Op } from "sequelize";

export const promo_update = async (req = request, res = response) => {
  try {
    let data = req.body;
    const findPromo = await dbs.promo.findOne({
      where: {
        id: req.params.id,
      },
    });
    await dbs.promo.update(
      {
        percentase: data.percentase,
        value: data.value,
        start_date: data.start_date,
        end_date: data.end_date,
        productId: data.productId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return success_response(res, findPromo, 200);
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

// export const updatePromo = async (req = request,res = response) => {
//     try {
//         let data = req.body;
//         const findupdate = await dbs.promo.findOne({
//             where: {
//                 id: req.params.id
//             },
//         });
//         console.log('find', findupdate);
//         await dbs.promo.update({
//             percentase: data.percentase,
//             value: data.value,
//             start_date: data.start_date,
//             end_date: data.end_date,
//         }, where{

//         })
//     } catch (error) {

//     }
// }
