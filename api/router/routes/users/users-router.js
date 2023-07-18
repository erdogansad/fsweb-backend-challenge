const router = require("express").Router();
const { getAll, getLikes, getMentions } = require("./users-modal.js");
const { getByUserId } = require("#tweets/tweets-modal.js");
const { userController } = require("./users-middlewares.js");

router.get("/", async (req, res, next) => {
  try {
    const query = await getAll();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", userController, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    next(e);
  }
});

router.get("/:id/tweets", userController, async (req, res, next) => {
  try {
    const query = await getByUserId(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id/likes", userController, async (req, res, next) => {
  try {
    const query = await getLikes(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id/mentions", userController, async (req, res, next) => {
  try {
    const query = await getMentions(req.params.id);
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
