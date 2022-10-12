const knex = require("./knex");
const tableName = "measurements";

function createSensorsData(sensorsData) {
  return knex(tableName).insert(sensorsData);
}

function getAllSensorsData() {
  return knex(tableName).select("*");
}

function getDateRangeMeasurements({ start, end }) {
  return knex(tableName).whereBetween("measurementDate", [start, end]);
}

module.exports = {
  createSensorsData,
  getAllSensorsData,
  getDateRangeMeasurements
};
