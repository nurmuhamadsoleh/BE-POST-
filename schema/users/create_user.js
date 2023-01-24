import { body, oneOf, check } from "express-validator";
export const registerSchema = [
  body("name")
    .not()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("name is required")
    .isLength({ min: 2 })
    .withMessage("Minimal 2 character")
    .exists({ checkFalsy: true }),
  body("email")
    .not()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("email is required")
    .isLength({ min: 3 })
    .withMessage("Minimal 3 character")
    .isEmail()
    .withMessage("email not valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 charactes"),
  // oneOf([
  //   check("email")
  //     .exists()

  //   check("password")
  //     .exists({ checkFalsy: true })
  //     .isLength({ min: 5 })
  //     .withMessage("password must be at least 5 charactes"),
  // ]),
];
