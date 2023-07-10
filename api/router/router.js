const router = require("express").Router();
const auth = require("./routes/auth/auth-router.js");

router.use("/auth", auth);

module.exports = router;
