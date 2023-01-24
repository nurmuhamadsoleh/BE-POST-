import { validationResult } from "express-validator";

// export function validateRequestSchema(req, res, next) {
//   const errors = validationResult(req);
//   // jika form kosong maka akan menampilkan pesan error
//   if (errors.isEmpty()) {
//     // status 400 dan menampilkan errors array kosong
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// }
export function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(util.inspect(errors.array()));
    return res.status(422).json({ errors: errors.array() });
    // res.render("./form", {
    //   errors: errors.array(),
    // });
  }
  next();
}
