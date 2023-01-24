import express from "express";
import db from "./config/Database.js";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dbs from "./models/index.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import users_route from "./router/users_route.js";
import product_route from "./router/product_route.js";
import paket_route from "./router/paket_route.js";

dotenv.config();
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
const PORT = process.env.PORT || 8000;

try {
  await db.authenticate();
  console.log("Server Terhubung");
  // await dbs.users.sync();
  await dbs.product.sync();
  await dbs.promo.sync();
  await dbs.category.sync();
  // await dbs.order_details.sync();
  await dbs.medialist.sync();
  await dbs.paket.sync();
  // await dbs.productPromo.sync();
  await dbs.product_order.sync();
} catch (error) {
  console.log(error.message);
}

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use("/images", express.static(path.join(__dirname, "public/image")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(morgan("dev"));
// Route

app.use(users_route);
app.use(product_route);
app.use(paket_route);
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Api berhasi di jalankan",
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Api gagal di jalankan",
    });
  }
});

app.get("/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Routing Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
