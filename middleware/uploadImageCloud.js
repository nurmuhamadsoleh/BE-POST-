import cloudinary from "cloudinary";

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(file, (err, res) => {
      console.log("res", res);
      if (err) return res.status(500).send("Upload image error");
      resolve({
        res: res.secure_url,
      });
    });
  });
};
export default cloudinaryImageUploadMethod;
