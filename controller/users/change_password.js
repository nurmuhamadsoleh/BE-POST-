import { request, response } from "express";
import dbs from "../../models/index.js";
import { success_response } from "../../utils/success/success_response.js";
import { error_response } from "../../utils/errors/errors_response.js";
import bycript from "bcrypt";

export const change_password = async (req = request, res = response) => {
  try {
    const { email } = req.params;
    const { password, newPassword, konfirmasiPassword } = req.body;
    const updatePass = await dbs.users.findOne({
      where: {
        email: email,
      },
      attributes: ["password", "email"],
    });
    console.log("updatepassword", updatePass);
    const comparePass = await bycript.compare(password, updatePass.password);
    if (!comparePass) {
      return res.status(400).json({
        success: false,
        message: "Password Salah",
      });
    }
    if (konfirmasiPassword !== newPassword) {
      return res.status(400).json({
        message: "Password Tidak Cocok",
      });
    }
    const salt = await bycript.genSalt();
    const hash_password = await bycript.hash(newPassword.toString(), salt);
    const update = await dbs.users.update(
      {
        password: hash_password,
      },
      {
        where: {
          email: email,
        },
      }
    );
    return success_response(
      res,
      {
        update_password: update,
      },
      201
    );
  } catch (error) {
    return error_response(
      res,
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      500,
      500
    );
  }
};
