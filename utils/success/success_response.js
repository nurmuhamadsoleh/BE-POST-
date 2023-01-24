import { request, response } from "express";
export const success_response = (res = response, query, code) => {
  return res.status(code).json({
    success: true,
    query: query,
  });
};
