const request = require("supertest");
const server = require("./api/server");
const db = require("./data/config.js");
const { users } = require("./data/seeds/01-users.js");

const newUser = {
  bio: "bio",
  avatar: "avatar",
  email: "email@email.com",
  password: "password",
  username: "username",
  last_name: "lastname",
  first_name: "firstname",
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
