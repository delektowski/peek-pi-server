import {connectKnex} from "./knex.mjs";
import dayjs from 'dayjs'

const tableMeasurements = "measurements";
const tablePhoto = "photos";

export function createSensorsData(sensorsData) {
    return connectKnex(tableMeasurements).insert(sensorsData);
}

export function createPhotoData(photoData) {
    return connectKnex(tablePhoto).insert(photoData);
}

export function deletePhotoData(date) {
    const formatDate = dayjs(date).format('YYYY-MM-DD')
    return connectKnex(tablePhoto).where('title', 'like', `%${formatDate}%`).del()
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

export function getOldPhotoFromRange(start, end) {
    console.log("start", start)
    console.log("end", end)

    return connectKnex(tablePhoto).select().whereBetween('date', [start, end]).limit(1);
}
