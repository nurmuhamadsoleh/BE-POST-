import express from "express";
import {
  paket_create,
  paket_update,
  get_paketbyid,
  read_paket,
  paketDelete,
} from "../controller/paket/index.js";
import { promo_create } from "../controller/promo/create_promo.js";
import { getPromo } from "../controller/promo/read_promo.js";
import { validateRequestSchema } from "../middleware/validasiForm.js";
import { createSchema } from "../schema/paket/create_paket.js";
const paket_route = express.Router();

paket_route.get("/paket/read/:id", get_paketbyid);
paket_route.post("/promo/create/:id", promo_create);
paket_route.get("/paket/read", read_paket); //http://localhost:8000/paket/read?search_query=reguler
paket_route.get("/promo/read", getPromo);
paket_route.delete("/paket/delete/:id", paketDelete);
paket_route.post(
  "/paket/create",
  createSchema,
  validateRequestSchema,
  paket_create
);
paket_route.put(
  "/paket/update/:id",
  createSchema,
  validateRequestSchema,
  paket_update
);
export default paket_route;
