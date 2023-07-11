const likes = [
  {
    like_id: 1,
    user_id: 1,
    tweet_id: 9,
  },
  {
    like_id: 2,
    user_id: 7,
    tweet_id: 9,
  },
  {
    like_id: 3,
    user_id: 4,
    tweet_id: 4,
  },
  {
    like_id: 4,
    user_id: 4,
    tweet_id: 4,
  },
  {
    like_id: 5,
    user_id: 1,
    tweet_id: 5,
  },
  {
    like_id: 6,
    user_id: 9,
    tweet_id: 10,
  },
  {
    like_id: 7,
    user_id: 6,
    tweet_id: 3,
  },
  {
    like_id: 8,
    user_id: 3,
    tweet_id: 3,
  },
  {
    like_id: 9,
    user_id: 1,
    tweet_id: 5,
  },
  {
    like_id: 10,
    user_id: 8,
    tweet_id: 9,
  },
];

exports.likes = likes;

exports.seed = function (knex) {
  return knex("likes").insert(likes);
};
