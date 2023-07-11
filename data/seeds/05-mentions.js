const mentions = [
  {
    mention_id: 1,
    user_id: 7,
    tweet_id: 2,
    mention:
      "Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    created_at: "2023-03-16 11:15:46",
  },
  {
    mention_id: 2,
    user_id: 5,
    tweet_id: 9,
    mention:
      "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    created_at: "2023-07-04 04:19:28",
  },
  {
    mention_id: 3,
    user_id: 2,
    tweet_id: 8,
    mention: "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    created_at: "2022-09-17 22:29:29",
  },
  {
    mention_id: 4,
    user_id: 2,
    tweet_id: 3,
    mention: "Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.",
    created_at: "2022-12-10 08:08:45",
  },
  {
    mention_id: 5,
    user_id: 3,
    tweet_id: 2,
    mention:
      "Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    created_at: "2023-01-31 10:47:40",
  },
  {
    mention_id: 6,
    user_id: 9,
    tweet_id: 4,
    mention: "Praesent blandit lacinia erat.",
    created_at: "2022-07-23 21:59:52",
  },
  {
    mention_id: 7,
    user_id: 10,
    tweet_id: 7,
    mention:
      "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    created_at: "2023-06-17 19:46:13",
  },
  {
    mention_id: 8,
    user_id: 5,
    tweet_id: 9,
    mention: "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    created_at: "2023-03-23 13:54:37",
  },
  {
    mention_id: 9,
    user_id: 10,
    tweet_id: 5,
    mention: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.",
    created_at: "2022-08-22 10:51:33",
  },
  {
    mention_id: 10,
    user_id: 1,
    tweet_id: 2,
    mention:
      "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    created_at: "2022-11-04 19:27:05",
  },
];

exports.mentions = mentions;

exports.seed = function (knex) {
  return knex("mentions").insert(mentions);
};
