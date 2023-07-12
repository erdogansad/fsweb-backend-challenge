const router = require("express").Router();
const { getAll, create, remove } = require("./tweets-modal");
const { tweetController, bodyController } = require("./tweets-middlewares");

router.get("/", async (req, res, next) => {
  try {
    let query = await getAll();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", tweetController, (req, res, next) => {
  try {
    res.status(200).json(req.tweet);
  } catch (e) {
    next(e);
  }
});

router.post("/", bodyController, async (req, res, next) => {
  try {
    const query = await create(req.data);
    res.status(201).json(query);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", tweetController, async (req, res, next) => {
  try {
    const user_id = req.decoded.data.user_id,
      tweet_user_id = req.tweet.user_id;
    if (user_id === tweet_user_id) {
      await remove(req.params.id);
      res.status(200).json(req.tweet);
    } else {
      next({ status: 403, message: "you are not authorized to delete this tweet." });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
