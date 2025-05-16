import jwt from "jsonwebtoken";
import * as ENV from "../configs/config.js";

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract token after "Bearer "
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
      }

      try {
        // Verify token and assign the payload to req.user
        const user = jwt.verify(token, ENV.JWT_SECRET);
        req.user = user;
        next();
      } catch (err) {
        console.error("Token Verification Error:", err.message); // Log verification error
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    } else {
      return res.status(401).json({
        message: "Authorization header is missing or improperly formatted",
      });
    }
  } catch (error) {
    console.error("Authorization Middleware Error:", error.message); // Log backend error for debugging
    return res
      .status(500)
      .json({ message: "Internal Server Error in authentication" });
  }
}

export async function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
