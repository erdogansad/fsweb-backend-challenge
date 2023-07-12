const { getById } = require("./tweets-modal.js");

const tweetController = async (req, res, next) => {
  try {
    let query = await getById(req.params.id);
    if (query) {
      req.tweet = query;
      next();
    } else {
      next({ status: 404, message: "tweet not found." });
    }
  } catch (e) {
    next(e);
  }
};

const bodyController = (req, res, next) => {
  const { tweet } = req.body;
  const user_id = req.decoded.data.user_id;
  if (user_id && tweet) {
    req.data = { user_id, tweet };
    next();
  } else {
    next({ status: 400, message: `${!user_id ? "user_id" : "tweet"}  required.` });
  }
};

module.exports = { tweetController, bodyController };
