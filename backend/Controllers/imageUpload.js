import User from '../Schema/UserSchema.js';
import cloudinary from '../utils/cloudinary.js';




export const uploadImage = async (req, res, next) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send({ msg: 'No file uploaded.' });
  }

  try {
    // Check if the image already exists in the database
    const existingImage = await User.findOne({ image: req.file.path });
    if (existingImage) {
      return res.json({ imageUrl: existingImage.image });
    }

    // If the image doesn't exist in the database, upload it to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Return Cloudinary response containing image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    // Handle Cloudinary upload error
    console.error('Error uploading image to Cloudinary:', error);
    return res.status(500).send({ msg: 'Server Error' });
  }
};

