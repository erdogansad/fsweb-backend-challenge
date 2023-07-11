const router = require("express").Router();
const auth = require("./routes/auth/auth-router.js");
const tweets = require("./routes/tweets/tweets-router.js");
const { tokenController } = require("../middlewares.js");

router.use("/auth", auth);
router.use("/tweets", tokenController, tweets);

module.exports = router;
