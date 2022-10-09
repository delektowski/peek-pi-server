const knex = require("./knex");
const tableName = "measurements";

function createSensorsData(sensorsData) {
  return knex(tableName).insert(sensorsData);
}

function getAllSensorsData() {
  return knex(tableName).select("*");
}

module.exports = {
  createSensorsData,
  getAllSensorsData,
};
