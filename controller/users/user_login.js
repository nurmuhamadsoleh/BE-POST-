import { request, response } from "express";
import dbs from "../../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { error_response } from "../../utils/errors/errors_response.js";
import { success_response } from "../../utils/success/success_response.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const user_login = async (req = request, res = response) => {
  try {
    const { email, password } = await req.body;
    const user = await dbs.users.findAll({
      where: {
        email: email,
      },
      attributes: {
        include: ["id", "email", "url", "password"],
        exclude: ["public_id"],
      },
    });
    if (user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // console.log("email", user[0].email);
    const comparePass = await bcrypt.compare(password, user[0].password);
    if (!comparePass)
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    const token = jwt.sign(
      {
        id: user[0].id,
        // name: user[0].name,
        email: user[0].email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user[0].id,
        // name: user[0].name,
        email: user[0].email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return success_response(
      res,
      {
        token: token,
        refreshToken: refreshToken,
        user: user,
      },
      200
    );
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
