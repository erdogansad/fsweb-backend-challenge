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

module.exports = { getAll, getById };
