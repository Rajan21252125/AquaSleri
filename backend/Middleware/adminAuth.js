import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Authentication middleware
const adminAuth = (req, res, next) => {
    console.log(req.cookies)
  try {
    // Get the token from the request headers
    const token = req.cookies.token
    // Check if token exists
    if (!token) {
      return res.status(401).json({ status:false, message: 'Unauthorized' });
    }

    // Verify the token and extract user ID
    JWT.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(401).json({ status:false, message: 'Invalid token' });
      }
      // If token is valid, attach the data payload to the request object
      req.user = data;
      if (data?.user?.role === "user") {
        return res.status(401).json({ status:false, message: 'Unauthorized' });
      }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:false, msg: "Internal Server Error" });
  }
};

export default adminAuth;
