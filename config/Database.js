import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  dialectOptions: {
    useUTC: false,
  },
  timezone: "+05:30",
  // dialectOptions: {
  //   encrypt: false,
  //   options: {
  //     useUTC: false, // for reading from database
  //   },
  // },
});
export default db;
