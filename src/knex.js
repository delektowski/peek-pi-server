
const knex = require("knex");

const connectKnex = knex({
    client: "better-sqlite3",
    connection: {
        filename: "./measurements.db"
    }
})

module.exports = connectKnex
