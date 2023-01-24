import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifikasiToken = () => {
  return (req, res, next) => {
    try {
      const authheader = req.headers.authorization;
      console.log("token", authheader);
      const token = authheader && authheader.split(" ")[1]; //untuk mengubah token menjadi array
      console.log("token", token);
      if (!token) return res.sendStatus(401); //unauthorization
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //forbiden (token nya salah/ expried)
        req.email = decoded.email;
        next();
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
