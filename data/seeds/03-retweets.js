const retweets = [
  {
    retweet_id: 1,
    user_id: 6,
    tweet_id: 6,
    created_at: "2022-07-11 14:18:03",
  },
  {
    retweet_id: 2,
    user_id: 5,
    tweet_id: 2,
    created_at: "2023-01-08 17:45:50",
  },
  {
    retweet_id: 3,
    user_id: 7,
    tweet_id: 3,
    created_at: "2023-06-30 00:56:27",
  },
  {
    retweet_id: 4,
    user_id: 2,
    tweet_id: 7,
    created_at: "2022-09-20 00:47:01",
  },
  {
    retweet_id: 5,
    user_id: 8,
    tweet_id: 9,
    created_at: "2022-11-18 02:29:33",
  },
  {
    retweet_id: 6,
    user_id: 4,
    tweet_id: 2,
    created_at: "2022-07-30 15:00:31",
  },
  {
    retweet_id: 7,
    user_id: 7,
    tweet_id: 6,
    created_at: "2023-06-03 00:26:27",
  },
  {
    retweet_id: 8,
    user_id: 9,
    tweet_id: 8,
    created_at: "2023-06-26 01:41:58",
  },
  {
    retweet_id: 9,
    user_id: 3,
    tweet_id: 8,
    created_at: "2022-12-24 04:02:15",
  },
  {
    retweet_id: 10,
    user_id: 1,
    tweet_id: 3,
    created_at: "2023-03-08 10:48:43",
  },
];

exports.retweets = retweets;

exports.seed = function (knex) {
  return knex("retweets").insert(retweets);
};
