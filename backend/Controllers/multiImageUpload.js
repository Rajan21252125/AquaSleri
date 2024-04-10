import User from '../Schema/UserSchema.js';
import cloudinary from '../utils/cloudinary.js';

export const multiImageUpload = async (req, res, next) => {
  // Access the uploaded files through req.files
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ msg: 'No files uploaded.' });
  }

  try {
    const imageUrls = [];
    // Check if the uploaded files is an array
    if (Array.isArray(req.files)) {
      // Iterate through each uploaded file
      for (const file of req.files) {
        // Check if the image already exists in the database
        const existingImage = await User.findOne({ image: file.path });
        if (existingImage) {
          imageUrls.push(existingImage.image);
        } else {
          // If the image doesn't exist in the database, upload it to Cloudinary
          const result = await cloudinary.uploader.upload(file.path);
          // Push the Cloudinary image URL to the array
          imageUrls.push(result.secure_url);
        }
      }
    }
    // Return the array of image URLs
    return res.status(201).send({status: true, data : imageUrls});
  } catch (error) {
    // Handle Cloudinary upload error
    console.error('Error uploading images to Cloudinary:', error);
    return res.status(500).send({ msg: 'Server Error' });
  }
};
