import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "public/images");
  // },
  filename: function (req, file, cb) {
    const nameImage = file.originalname.split(".");
    cb(null, nameImage[0] + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  // let ext = path.extname(file.originalname);
  // let extAllow = [".jpg", ".jpeg", ".png"];
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    // cb("File Type is Not Suport");
    cb(null, true);
    return;
  } else {
    cb(null, false);
  }
  // if (
  //   file.mimetype.includes("jpeg") ||
  //   file.mimetype.includes("png") ||
  //   file.mimetype.includes("jpg")
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  // }
};

// const maxSize = 2014288; //2mb
// let uploadImages = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: maxSize },
// }).single("image");
const maxSize = 2014288; //2mb
let uploadImages = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});
// .fields([
//   { name: "image", maxCount: 1 }, //single
//   { name: "images", maxCount: 3 }, //mutiple
// ]);
export default uploadImages;
