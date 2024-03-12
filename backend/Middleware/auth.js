import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Authentication middleware
const auth = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header('Authorization');
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token and extract user ID
    JWT.verify(token.replace("Bearer ", "").trim(), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // If token is valid, attach the decoded payload to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default auth;
