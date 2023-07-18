const path = require("path");
const config = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  pool: { afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done) },
};

module.exports = {
  development: {
    ...config,
    seeds: { directory: "./data/seeds" },

    connection: { filename: path.resolve(__dirname, "data/database.db3") },
  },
  testing: {
    ...config,
    seeds: { directory: "./data/seeds" },
    connection: { filename: "./data/test.db3" },
  },
};
