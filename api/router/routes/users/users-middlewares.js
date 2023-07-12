const { getById } = require("./users-modal.js");

const userController = async (req, res, next) => {
  try {
    const query = await getById(req.params.id);
    if (query) {
      req.user = query;
      next();
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { userController };
