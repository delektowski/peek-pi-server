import { setDateRange } from "./helpers.mjs";
import {
  createPhotoData,
  createSensorsData,
  deletePhotoData,
  getAllSensorsData,
  getDateRangeMeasurements,
  getLastPhoto,
  getOldPhotoFromRange,
} from "./sensorsData.mjs";
import logger from "./logger.mjs";

async function saveMeasurements(
  temperature,
  humidity,
  pressure,
  measurementDate,
  measurementTable
) {
  const sensorData = {
    temperature,
    humidity,
    pressure,
    measurementDate,
  };
  await createSensorsData(sensorData, measurementTable);
}

async function savePhotoData(title, date) {
  const photoData = {
    title,
    date,
  };
  await createPhotoData(photoData);
}

async function delPhotoData(date) {
  await deletePhotoData(date);
}

export const resolvers = {
  Query: {
    allMeasurements: async () => {
      console.log(
        `Measurements has been queried on: ${new Date().toISOString()}`
      );
      return getAllSensorsData();
    },
    dateRangeMeasurements: async (_, args) => {
      return getDateRangeMeasurements(setDateRange(args.start, args.end));
    },
    lastPhoto: async () => {
      return getLastPhoto();
    },
    oldPhotoFromRange: async (_, args) => {
      return await getOldPhotoFromRange(args.start, args.end);
    },
  },

  Mutation: {
    saveMeasurements: async (_, args) => {
      args.measurementDate = new Date(
        args.measurementDate * 1000
      ).toISOString();

      await saveMeasurements(
        args.temperature,
        args.humidity,
        args.pressure,
        args.measurementDate,
          "measurements"
      );
      logger.log(
        "info",
        `Measurement has been added on: ${args.measurementDate}`,
        {
          function: "saveMeasurements()",
        }
      );
      return {
        code: 200,
        success: true,
        message: `Measurement has been added on: ${args.measurementDate}`,
      };
    },
    saveMeasurements1: async (_, args) => {
      args.measurementDate = new Date(
        args.measurementDate * 1000
      ).toISOString();

      await saveMeasurements(
        args.temperature,
        args.humidity,
        args.pressure,
        args.measurementDate,
        "measurements1"
      );
      logger.log(
        "info",
        `Measurement has been added on: ${args.measurementDate}`,
        {
          function: "saveMeasurements()",
        }
      );
      return {
        code: 200,
        success: true,
        message: `Measurement has been added on: ${args.measurementDate}`,
      };
    },
    savePhotoData: async (_, args) => {
      args.date = new Date().toISOString();
      await savePhotoData(args.title, args.date);
      console.log(`Photo source has been saved on: ${args.date}`);
      logger.log("info", `Photo source has been saved on: ${args.date}`, {
        function: "savePhotoData()",
      });
      return {
        code: 200,
        success: true,
        message: `Photo source has been saved on: ${args.date}`,
      };
    },
    deletePhotoData: async (_, args) => {
      await delPhotoData(args.date);
      logger.log("info", `Photo source has been deleted on: ${args.date}`, {
        function: "deletePhotoData()",
      });
      return {
        code: 200,
        success: true,
        message: `Photo source has been deleted on: ${args.date}`,
      };
    },
  },
};
