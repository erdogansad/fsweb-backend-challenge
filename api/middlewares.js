const jwt = require("jsonwebtoken");
const secret = require("#data/jwtSecret.js");

const errHandler = (err, req, res, next) => {
  res.headersSent ? next(err) : res.status(err.status || 500).json({ message: err.message || "internal server error." });
};

const tokenController = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, secret.JWT_SECRET, (err, decoded) => {
        if (err) {
          next({ status: 401, message: "token invalid." });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      next({ status: 403, message: "token required." });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { errHandler, tokenController };
