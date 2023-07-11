const db = require("../../../../data/config");
const crypto = require("crypto");

const create = (user) => {
  return db("users").insert(user);
};

const createToken = async (user_id) => {
  const getToken = await db("tokens").where("user_id", user_id).first();
  if (getToken) {
    await db("tokens").where("user_id", user_id).del();
  }
  const newToken = crypto.randomBytes(32).toString("hex");
  let query = db("tokens").insert({ token: newToken, user_id, expires_at: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  return query ? newToken : false;
};

const getByFilter = (filter) => {
  return db("users").where(filter).first();
};

module.exports = {
  create,
  getByFilter,
  createToken,
};
