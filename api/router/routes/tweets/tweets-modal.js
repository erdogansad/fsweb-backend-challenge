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

const getByUserId = (id) => {
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
    .where("tw.user_id", id)
    .groupBy("tw.tweet_id");
};

const getLikes = (id) => {
  return db
    .select("lk.*", "us.username", "us.first_name", "us.last_name", "us.avatar")
    .from("likes as lk")
    .leftJoin("users as us", "lk.user_id", "us.user_id")
    .where("lk.tweet_id", id);
};

const setLike = async (user_id, tweet_id) => {
  const query = await getLikes(tweet_id);
  if (query.find((like) => like.user_id === user_id)) {
    await db("likes").where({ user_id, tweet_id }).del();
    return getLikes(tweet_id);
  } else {
    await db("likes").insert({ user_id, tweet_id });
    return getLikes(tweet_id);
  }
};

const getMentions = (id) => {
  return db
    .select("mn.*", "us.username", "us.first_name", "us.last_name", "us.avatar")
    .from("mentions as mn")
    .leftJoin("users as us", "mn.user_id", "us.user_id")
    .where("mn.tweet_id", id);
};

const getMentionById = (id) => {
  return db
    .select("mn.*", "us.username", "us.first_name", "us.last_name", "us.avatar")
    .from("mentions as mn")
    .leftJoin("users as us", "mn.user_id", "us.user_id")
    .where("mn.mention_id", id)
    .first();
};

const createMention = async (data) => {
  await db("mentions").insert(data);
  return getMentions(data.tweet_id);
};

const removeMention = (id) => {
  return db("mentions").where("mention_id", id).del();
};

const create = async (tweet) => {
  const [id] = await db("tweets").insert(tweet).returning("tweet_id");
  return getById(id.tweet_id);
};

const remove = (id) => {
  return db("tweets").where("tweet_id", id).del();
};

module.exports = { getAll, getById, getByUserId, getLikes, setLike, getMentions, getMentionById, createMention, removeMention, create, remove };
