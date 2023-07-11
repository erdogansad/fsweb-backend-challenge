const db = require("../../../../data/config");
const crypto = require("crypto");
const moment = require("moment");

const create = (user) => {
  return db("users").insert(user);
};

const createToken = async (user_id) => {
  const getToken = await db("tokens").where("user_id", user_id).first();
  if (getToken) {
    await db("tokens").where("user_id", user_id).del();
  }
  const newToken = crypto.randomBytes(32).toString("hex");
  let query = await db("tokens").insert({ token: newToken, user_id, expires_at: moment().add(7, "days").format("YYYY-MM-DD HH:mm:ss") });
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
