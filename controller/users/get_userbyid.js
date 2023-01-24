import { request, response } from "express";
import dbs from "../../models/index.js";
import { success_response } from "../../utils/success/success_response.js";
import { error_response } from "../../utils/errors/errors_response.js";

export const get_userbyid = async (req = request, res = response) => {
  try {
    const get = await dbs.users.findOne({
      where: {
        id: req.params.id,
      },
    });
    return success_response(res, get, 200);
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
