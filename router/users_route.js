import express from "express";
import {
  change_password,
  getUser,
  get_userbyid,
  update_user,
  user_create,
  user_delete,
  user_login,
} from "../controller/users/index.js";
import uploadImages from "../middleware/uploadImage.js";
import { validateRequestSchema } from "../middleware/validasiForm.js";
import { registerSchema } from "../schema/users/create_user.js";
// import { validateRequestSchema } from "../middleware/validasiForm.js";
// import { create_user } from "../schema/users/create_user.js";
// const upload = multer({ dest: "uploads" });
// const upload = multer({ dest: os.tmpdir() }); // tmpdir maka file yang di upload akan di simpan di temporary di setiap os masing2 & os akan menyesuaikan dengan os pada server

const users_route = express.Router();

users_route.get("/users/read", getUser); //localhost:8000/users/read?page=2&record=1
users_route.get("/users/read/:id", get_userbyid);
users_route.post(
  "/users/add",
  uploadImages.single("image"),
  registerSchema,
  validateRequestSchema,
  user_create
);
users_route.post("/users/login", user_login);
users_route.put(
  "/users/update/:id",
  uploadImages.single("image"),
  // UploadImageCloud.single("images"),
  update_user
);
users_route.put("/user/updatepassword/:email", change_password);
users_route.delete("/users/delete/:id", user_delete);

export default users_route;
