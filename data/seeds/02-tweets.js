const tweets = [
  {
    tweet_id: 1,
    user_id: 4,
    tweet:
      "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
    created_at: "2022-07-29 11:48:47",
  },
  {
    tweet_id: 2,
    user_id: 9,
    tweet:
      "Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    created_at: "2023-06-01 20:57:28",
  },
  {
    tweet_id: 3,
    user_id: 3,
    tweet: "Mauris lacinia sapien quis libero.",
    created_at: "2023-07-07 19:53:42",
  },
  {
    tweet_id: 4,
    user_id: 5,
    tweet:
      "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    created_at: "2022-08-08 16:21:31",
  },
  {
    tweet_id: 5,
    user_id: 1,
    tweet:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    created_at: "2023-03-25 12:59:16",
  },
  {
    tweet_id: 6,
    user_id: 3,
    tweet:
      "Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
    created_at: "2023-05-03 15:21:28",
  },
  {
    tweet_id: 7,
    user_id: 6,
    tweet:
      "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    created_at: "2022-09-21 15:29:14",
  },
  {
    tweet_id: 8,
    user_id: 9,
    tweet:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    created_at: "2022-10-29 03:09:31",
  },
  {
    tweet_id: 9,
    user_id: 8,
    tweet: "Nunc purus. Phasellus in felis.",
    created_at: "2022-11-20 21:39:24",
  },
  {
    tweet_id: 10,
    user_id: 6,
    tweet: "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    created_at: "2023-01-22 01:39:47",
  },
];

exports.tweets = tweets;

exports.seed = function (knex) {
  return knex("tweets").insert(tweets);
};
