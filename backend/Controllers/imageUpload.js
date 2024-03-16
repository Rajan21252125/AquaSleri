import User from '../Schema/UserSchema.js';
import cloudinary from '../utils/cloudinary.js';




export const uploadImage = async (req, res, next) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send({msg:'No file uploaded.'});
  }

  // Upload image to Cloudinary
  try {
    const image = await User.find({image: req.file.path})
    if(image){
      res.json({ imageUrl: image })
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    // Return Cloudinary response containing image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    // Handle Cloudinary upload error
    console.error('Error uploading image to Cloudinary:', error);
    next(error);
    return res.status(500).send({msg:'Server Error'});
  }
};