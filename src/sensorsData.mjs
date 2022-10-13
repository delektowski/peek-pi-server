import {connectKnex} from "./knex.mjs";

const tableName = "measurements";

export function createSensorsData(sensorsData) {
    return connectKnex(tableName).insert(sensorsData);
}

export function getAllSensorsData() {
    return connectKnex(tableName).select("*");
}

export function getDateRangeMeasurements({start, end}) {
    return connectKnex(tableName).whereBetween("measurementDate", [start, end]);
}
