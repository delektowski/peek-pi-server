import { connectKnex } from "./knex.mjs";
import dayjs from "dayjs";

const tableMeasurements = "measurements";
const tablePhoto = "photos";

export function createSensorsData(sensorsData) {
  return connectKnex(tableMeasurements).insert(sensorsData);
}

export function createPhotoData(photoData) {
  return connectKnex(tablePhoto).insert(photoData);
}

export function deletePhotoData(date) {
  const formatDate = dayjs(date).format("YYYY-MM-DD");
  return connectKnex(tablePhoto)
    .where("title", "like", `%${formatDate}%`)
    .del();
}

export function getAllSensorsData() {
  return connectKnex(tableMeasurements).select("*");
}

export function getDateRangeMeasurements({ start, end }) {
  return connectKnex(tableMeasurements).whereBetween("measurementDate", [
    start,
    end,
  ]);
}

export function getLastPhoto() {
  return connectKnex(tablePhoto)
    .select()
    .orderBy([{ column: "id", order: "desc" }])
    .limit(1);
}

export async function getOldPhotoFromRange(start, end) {
  let result = [];
  let reqCount = 0;

  async function getOldImg(start, end) {
    result = await connectKnex(tablePhoto)
      .select()
      .whereBetween("date", [start, end])
      .limit(1);
    if (result.length === 0) {
      start = dayjs(start).subtract(15, reqCount < 6000 ? "second" : "minute").toISOString();
      return getOldImg(start, end);
    }
  }

  await getOldImg(start, end);
  return result;
}
