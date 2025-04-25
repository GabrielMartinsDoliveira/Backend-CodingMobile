const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Authorization token required. Format: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return res.status(403).json({
      success: false,
      message: "Invalid token format",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //
    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    let message = "Invalid token";

    if (error instanceof jwt.TokenExpiredError) {
      message = "Token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Malformed token";
    }

    return res.status(401).json({
      success: false,
      error: message,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = verifyToken;
