const db = require("../data/config");

const errHandler = (err, req, res, next) => {
  res.headersSent ? next(err) : res.status(err.status || 500).json({ message: err.message || "internal server error." });
};

const tokenController = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const tokenValid = await db("tokens").where({ token }).first(),
        compareDates = tokenValid ? new Date(tokenValid.expires_at) > new Date() : false;
      if (tokenValid && compareDates) {
        req.token = tokenValid;
        next();
      } else {
        next({ status: 401, message: "token invalid." });
      }
    } else {
      next({ status: 403, message: "token required." });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { errHandler, tokenController };
