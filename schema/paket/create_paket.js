import { body } from "express-validator";
export const createSchema = [
  body("jenis_paket")
    .not()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("jenis paket is required")
    .isLength({ min: 5 })
    .withMessage("Minimal 5 character")
    .exists({ checkFalsy: true }),
  body("price")
    .not()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("price is required")
    .exists({ checkFalsy: true }),
];
