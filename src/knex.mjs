import pkg from "knex";
const {knex} = pkg;

export const connectKnex = knex({
    client: "better-sqlite3",
    connection: {
        filename: "./measurements.db",
    },
    useNullAsDefault: true
});
