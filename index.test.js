const request = require("supertest");
const server = require("./api/server");
const db = require("./data/config.js");
const { users } = require("./data/seeds/01-users.js");
const { tweets } = require("./data/seeds/02-tweets.js");
const { likes } = require("./data/seeds/03-likes.js");
const { mentions } = require("./data/seeds/05-mentions.js");

const newUser = {
    bio: "bio",
    avatar: "avatar",
    email: "email@email.com",
    password: "password",
    username: "username",
    last_name: "lastname",
    first_name: "firstname",
  },
  newTweet = {
    tweet_id: 11,
    user_id: 1,
    tweet: "new tweet",
    created_at: "2023-07-12 08:25:29",
    username: "iverralls0",
    first_name: "Ingmar",
    last_name: "Verralls",
    avatar: "https://robohash.org/providentenimaut.png?size=50x50&set=set1",
    totalLikes: 0,
    totalRetweets: 0,
    totalMentions: 0,
  },
  userTweets = tweets.filter((tweet) => tweet.user_id === 1),
  userLikes = likes.filter((like) => like.user_id === 3),
  userMentions = mentions.filter((mention) => mention.user_id === 3),
  deletedMention = {
    avatar: "https://robohash.org/providentenimaut.png?size=50x50&set=set1",
    created_at: "2022-11-04 19:27:05",
    first_name: "Ingmar",
    last_name: "Verralls",
    mention:
      "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    mention_id: 10,
    tweet_id: 2,
    user_id: 1,
    username: "iverralls0",
  };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

test("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("Auth", () => {
  describe("[POST] /api/auth/register", () => {
    test("[1] yeni kullanıcı kayıt olabiliyor", async () => {
      const res = await request(server).post("/api/auth/register").send(newUser);
      expect(res.status).toBe(201);
    });
    test("[2] aynı kullanıcı adı alınmaya çalışıldığında 409 hatası dönüyor", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, username: "iverralls0" });
      expect(res.status).toBe(409);
    });
    test("[3] aynı email alınmaya çalışıldığında 409 hatası dönüyor", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, email: "iverralls0@webnode.com" });
      expect(res.status).toBe(409);
    });
    test("[4] kullanıcı adı 3 karakterden kısa olamaz", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, username: "us" });
      expect(res.status).toBe(400);
    });
    test("[5] kullanıcı adı 20 karakterden uzun olamaz", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, username: "usernameusernameusern" });
      expect(res.status).toBe(400);
    });
    test("[6] şifre 6 karakterden kısa olamaz", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, password: "12345" });
      expect(res.status).toBe(400);
    });
    test("[7] şifre 20 karakterden uzun olamaz", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, password: "123456789012345678901" });
      expect(res.status).toBe(400);
    });
    test("[8] email formatı doğru değilse 400 hatası dönüyor", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ ...newUser, email: "email" });
      expect(res.status).toBe(400);
    });
  });
  describe("[POST] /api/auth/login", () => {
    test("[9] kullanıcı adıyla giriş başarılı", async () => {
      const res = await request(server).post("/api/auth/login").send({
        username: "iverralls0",
        password: "1234",
      });
      expect(res.status).toBe(200);
    });
    test("[10] e-postayla giriş başarılı", async () => {
      const res = await request(server).post("/api/auth/login").send({
        email: "iverralls0@webnode.com",
        password: "1234",
      });
      expect(res.status).toBe(200);
    });
    test("[11] kullanıcı adı veya şifre hatalıysa 401 hatası dönüyor", async () => {
      const wrongPassword = await request(server).post("/api/auth/login").send({
        username: "iverralls0",
        password: "wrongpassword",
      });
      const wrongUsername = await request(server).post("/api/auth/login").send({
        username: "iverralls1",
        password: "1234",
      });
      expect(wrongPassword.status).toBe(401);
      expect(wrongUsername.status).toBe(401);
    });
  });
});

describe("Tweets", () => {
  let token = "";
  beforeEach(async () => {
    const login = await request(server).post("/api/auth/login").send({ username: "iverralls0", password: "1234" });
    token = `Bearer ${login.body.token}`;
  });
  describe("[GET] /api/tweets", () => {
    test("[12] tüm tweetler dönüyor", async () => {
      const res = await request(server).get("/api/tweets").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(tweets.length);
    });
    test("[13] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets");
      expect(res.status).toBe(403);
    });
    test("[14] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[POST] /api/tweets", () => {
    test("[15] tweet oluşturulduğunda 201, tweet ve tweet bilgisi dönüyor", async () => {
      const res = await request(server).post("/api/tweets").set("Authorization", token).send({ tweet: "new tweet" });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ ...newTweet, created_at: expect.any(String) });
    });
    test("[16] tweet boşsa 400 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets").set("Authorization", token);
      expect(res.status).toBe(400);
    });
    test("[17] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets").send({ tweet: "new tweet" });
      expect(res.status).toBe(403);
    });
    test("[18] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets").set("Authorization", `Bearer invalidtoken`).send({ tweet: "new tweet" });
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/tweets/:id", () => {
    test("[19] tweet id'si verilen tweet dönüyor", async () => {
      const res = await request(server).get("/api/tweets/1").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(tweets[0]);
    });
    test("[20] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/999").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[21] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/1");
      expect(res.status).toBe(403);
    });
    test("[22] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/1").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[DELETE] /api/tweets/:id", () => {
    test("[23] tweet id'si verilen tweet silindiğinde 200 dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/5").set("Authorization", token);
      expect(res.status).toBe(200);
    });
    test("[24] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/999").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[25] tweet id'si verilen tweet başkasına aitse 403 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/1").set("Authorization", token);
      expect(res.status).toBe(403);
    });
    test("[26] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/5");
      expect(res.status).toBe(403);
    });
    test("[27] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/5").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/tweets/:id/likes", () => {
    test("[28] tweet id'si verilen tweetin beğenenleri dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/likes").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
    test("[29] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/999/likes").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[30] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/likes");
      expect(res.status).toBe(403);
    });
    test("[31] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/likes").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[POST] /api/tweets/:id/likes", () => {
    test("[32] tweet id'si verilen tweeti beğenirken 200 dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/likes").set("Authorization", token);
      expect(res.status).toBe(200);
    });
    test("[33] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/999/likes").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[34] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/likes");
      expect(res.status).toBe(403);
    });
    test("[35] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/likes").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/tweets/:id/mentions", () => {
    test("[36] tweet id'si verilen tweetin mentionları dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/mentions").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
    test("[37] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/999/mentions").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[38] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/mentions");
      expect(res.status).toBe(403);
    });
    test("[39] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/3/mentions").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[POST] /api/tweets/:id/mentions", () => {
    test("[40] tweet id'si verilen tweete mention eklerken 201 dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/mentions").set("Authorization", token).send({ mention: "test mention" });
      expect(res.status).toBe(201);
    });
    test("[41] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/999/mentions").set("Authorization", token).send({ mention: "test mention" });
      expect(res.status).toBe(404);
    });
    test("[42] mention yoksa 400 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/mentions").set("Authorization", token);
      expect(res.status).toBe(400);
    });
    test("[43] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/mentions").send({ mention: "test mention" });
      expect(res.status).toBe(403);
    });
    test("[44] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).post("/api/tweets/3/mentions").set("Authorization", `Bearer invalidtoken`).send({ mention: "test mention" });
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/tweets/:id/mentions/:mention_id", () => {
    test("[45] tweet id'si ve mention id'si verilen mention dönüyor", async () => {
      const res = await request(server).get("/api/tweets/2/mentions/1").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body.mention).toBe(mentions[0].mention);
    });
    test("[46] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/999/mentions/1").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[47] mention id'si verilen mention yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/2/mentions/999").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[48] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/2/mentions/1");
      expect(res.status).toBe(403);
    });
    test("[49] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/tweets/2/mentions/1").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[DELETE] /api/tweets/:id/mentions/:mention_id", () => {
    test("[50] tweet id'si ve mention id'si verilen mention siliniyor", async () => {
      const res = await request(server).delete("/api/tweets/2/mentions/10").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(deletedMention);
    });
    test("[51] tweet id'si verilen tweet yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/999/mentions/1").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[52] mention id'si verilen mention yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/2/mentions/999").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[53] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/2/mentions/10");
      expect(res.status).toBe(403);
    });
    test("[54] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/2/mentions/10").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
    test("[55] başkasına ait mention silinmek istenirse 403 hatası dönüyor", async () => {
      const res = await request(server).delete("/api/tweets/2/mentions/1").set("Authorization", token);
      expect(res.status).toBe(403);
    });
  });
});

describe("Users", () => {
  let token = "";
  beforeEach(async () => {
    const login = await request(server).post("/api/auth/login").send({ username: "iverralls0", password: "1234" });
    token = `Bearer ${login.body.token}`;
  });
  describe("[GET] /api/users", () => {
    test("[56] tüm kullanıcılar dönüyor", async () => {
      const res = await request(server).get("/api/users").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(users.length);
    });
    test("[57] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(403);
    });
    test("[58] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/users/:id", () => {
    test("[59] user id'si verilen user dönüyor", async () => {
      const res = await request(server).get("/api/users/1").set("Authorization", token);
      let user = { ...users[0] };
      delete user.password;
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(user);
    });
    test("[60] user id'si verilen user yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/999").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[61] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1");
      expect(res.status).toBe(403);
    });
    test("[62] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/users/:id/tweets", () => {
    test("[63] user id'si verilen user'ın tweetleri dönüyor", async () => {
      const res = await request(server).get("/api/users/1/tweets").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(userTweets.length);
    });
    test("[64] user id'si verilen user yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/999/tweets").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[65] user id'si verilen user'ın tweetleri yoksa boş array dönüyor", async () => {
      const res = await request(server).get("/api/users/2/tweets").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
    test("[66] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/tweets");
      expect(res.status).toBe(403);
    });
    test("[67] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/tweets").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/users/:id/likes", () => {
    test("[68] user id'si verilen user'ın beğendikleri dönüyor", async () => {
      const res = await request(server).get("/api/users/3/likes").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(userLikes.length);
    });
    test("[69] user id'si verilen user yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/999/likes").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[70] user id'si verilen user'ın beğendikleri yoksa boş array dönüyor", async () => {
      const res = await request(server).get("/api/users/2/likes").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
    test("[71] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/likes");
      expect(res.status).toBe(403);
    });
    test("[72] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/likes").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
  describe("[GET] /api/users/:id/mentions", () => {
    test("[73] user id'si verilen user'ın mentionları dönüyor", async () => {
      const res = await request(server).get("/api/users/3/mentions").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(userMentions.length);
    });
    test("[74] user id'si verilen user yoksa 404 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/999/mentions").set("Authorization", token);
      expect(res.status).toBe(404);
    });
    test("[75] user id'si verilen user'ın mentionları yoksa boş array dönüyor", async () => {
      const res = await request(server).get("/api/users/4/mentions").set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
    test("[76] token yoksa 403 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/mentions");
      expect(res.status).toBe(403);
    });
    test("[77] token geçersizse 401 hatası dönüyor", async () => {
      const res = await request(server).get("/api/users/1/mentions").set("Authorization", `Bearer invalidtoken`);
      expect(res.status).toBe(401);
    });
  });
});
