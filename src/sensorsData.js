const knex = require("./knex");
const tableName = "measurements";

function createSensorsData(sensorsData) {
  return knex(tableName).insert(sensorsData);
}

function getAllSensorsData() {
  return knex(tableName).select("*");
}

function getDateRangeMeasurements() {
    return  knex(tableName).whereBetween('measurementDate',['2021-09-10','2021-09-11'])
}

module.exports = {
  createSensorsData,
  getAllSensorsData,
  getDateRangeMeasurements
};
