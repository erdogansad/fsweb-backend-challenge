const router = require("express").Router();
const auth = require("#auth/auth-router.js");
const tweets = require("#tweets/tweets-router.js");
const { tokenController } = require("#api/middlewares.js");

router.use("/auth", auth);
router.use("/tweets", tokenController, tweets);

module.exports = router;
