import {connectKnex} from "./knex.mjs";

const tableMeasurements = "measurements";
const tablePhoto = "photos";

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

export function getLastPhoto() {
    return connectKnex(tablePhoto).select().orderBy([{column: "id", order: "desc"}]).limit(1);
}

export function getOldPhotoFromRange({start, end}) {
    console.log("start", start)
    console.log("end", end)
    const from = '2022-11-15T21:19:59.169Z';
    const to = '2022-11-15T21:42:39.169Z';
    return connectKnex(tablePhoto).select().whereBetween('date', [from, to]).limit(1);
}
