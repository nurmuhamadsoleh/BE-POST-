import { response, request } from "express";
export const error_response = (res = response, message, status = 500) => {
  return res.status(status).json({
    success: false,
    message: message,
  });
};
