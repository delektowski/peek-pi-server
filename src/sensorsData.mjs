import {connectKnex} from "./knex.mjs";

const tableMeasurements = "measurements";
const tablePhoto = "photos"

export function createSensorsData(sensorsData) {
    return connectKnex(tableMeasurements).insert(sensorsData);
}

export function createPhotoData(photoData) {
    return connectKnex(tablePhoto).insert(photoData);
}

export function getAllSensorsData() {
    return connectKnex(tableMeasurements).select("*");
}

export function getDateRangeMeasurements({start, end}) {
    return connectKnex(tableMeasurements).whereBetween("measurementDate", [start, end]);
}
