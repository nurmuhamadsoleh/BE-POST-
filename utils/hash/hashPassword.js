import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

export const hash_password = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
