const router = require("express").Router();
const { create } = require("../auth/auth-modal");
const { registerController, loginController } = require("./auth-middlewares");

router.post("/register", registerController, async (req, res, next) => {
  try {
    const query = await create(req.user);
    res.status(201).json(req.user);
  } catch (e) {
    next(e);
  }
});

router.post("/login", loginController, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
