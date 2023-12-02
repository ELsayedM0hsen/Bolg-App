import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
      const decoded = jwt.verify(authHeader, process.env.TOKEN_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = { id: decoded.id };
      next();
    } else {
      return res.status(401).json({ error: "Token not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Token verification failed" });
  }
};
