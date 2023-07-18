const db = require("#data/config.js");

const getAll = () => {
  return db.select("us.user_id", "us.email", "us.username", "us.first_name", "us.last_name", "us.avatar").from("users as us");
};

const getById = (id) => {
  return db
    .select("us.user_id", "us.email", "us.username", "us.first_name", "us.last_name", "us.avatar", "us.created_at")
    .from("users as us")
    .where("us.user_id", id)
    .first();
};

const getLikes = (id) => {
  return db
    .select("tw.tweet_id", "tw.user_id", "tw.tweet", "tw.created_at", "li.like_id")
    .from("tweets as tw")
    .join("likes as li", "li.tweet_id", "tw.tweet_id")
    .where("li.user_id", id);
};

const getMentions = (id) => {
  return db
    .select("tw.tweet_id", "tw.user_id", "tw.tweet", "tw.created_at", "me.mention_id", "me.mention", "me.created_at as mention_created_at")
    .from("tweets as tw")
    .join("mentions as me", "me.tweet_id", "tw.tweet_id")
    .where("me.user_id", id);
};

module.exports = { getAll, getById, getLikes, getMentions };
