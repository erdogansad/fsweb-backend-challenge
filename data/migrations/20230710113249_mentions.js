/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mentions", (table) => {
    table.increments("mention_id").primary();
    table.integer("user_id").unsigned().notNullable().references("user_id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("tweet_id").unsigned().notNullable().references("tweet_id").inTable("tweets").onDelete("CASCADE").onUpdate("CASCADE");
    table.string("mention").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("mentions");
};
