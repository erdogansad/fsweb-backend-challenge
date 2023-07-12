const db = require("#data/config.js");

const getAll = () => {
  return db
    .select(
      "tw.*",
      "us.username",
      "us.first_name",
      "us.last_name",
      "us.avatar",
      db.count("lk.like_id").from("likes as lk").where("lk.tweet_id", db.raw("tw.tweet_id")).as("totalLikes"),
      db.count("rt.retweet_id").from("retweets as rt").where("rt.tweet_id", db.raw("tw.tweet_id")).as("totalRetweets"),
      db.count("mn.mention_id").from("mentions as mn").where("mn.tweet_id", db.raw("tw.tweet_id")).as("totalMentions")
    )
    .leftJoin("users as us", "tw.user_id", "us.user_id")
    .from("tweets as tw")
    .groupBy("tw.tweet_id");
};

const getById = (id) => {
  return db
    .select(
      "tw.*",
      "us.username",
      "us.first_name",
      "us.last_name",
      "us.avatar",
      db.count("lk.like_id").from("likes as lk").where("lk.tweet_id", db.raw("tw.tweet_id")).as("totalLikes"),
      db.count("rt.retweet_id").from("retweets as rt").where("rt.tweet_id", db.raw("tw.tweet_id")).as("totalRetweets"),
      db.count("mn.mention_id").from("mentions as mn").where("mn.tweet_id", db.raw("tw.tweet_id")).as("totalMentions")
    )
    .leftJoin("users as us", "tw.user_id", "us.user_id")
    .from("tweets as tw")
    .where("tw.tweet_id", id)
    .groupBy("tw.tweet_id")
    .first();
};

const create = async (tweet) => {
  const [id] = await db("tweets").insert(tweet).returning("tweet_id");
  return getById(id.tweet_id);
};

const remove = (id) => {
  return db("tweets").where("tweet_id", id).del();
};

module.exports = { getAll, getById, create, remove };
