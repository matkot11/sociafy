import cloudinary from "cloudinary";

export const uploadImage = async (res, image, imageId, directory) => {
  let imageUrl = "";

  await cloudinary.v2.uploader
    .upload(image, {
      resource_type: "image",
      public_id: `${directory}/${imageId}`,
      use_filename: true,
      filename_override: imageId,
    })
    .then((response) => (imageUrl = response.url))
    .catch(() =>
      res
        .status(404)
        .json({ message: "Profile image did not upload correctly" }),
    );

  return { imageUrl };
};
