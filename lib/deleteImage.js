import cloudinary from "cloudinary";

export const deleteImage = async (res, id) => {
  cloudinary.v2.uploader.destroy(id).catch((e) => {
    res.status(404).json({ message: "Profile image did not delete correctly" });
  });
};
