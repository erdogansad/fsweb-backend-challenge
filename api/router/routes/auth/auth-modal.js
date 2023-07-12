const db = require("#data/config.js");

const create = (user) => {
  return db("users").insert(user);
};

const getByFilter = (filter) => {
  return db("users").where(filter).first();
};

module.exports = {
  create,
  getByFilter,
};
