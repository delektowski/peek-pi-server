import {setDateRange} from "./helpers.mjs";
import {
    createPhotoData,
    createSensorsData,
    getAllSensorsData,
    getDateRangeMeasurements,
    getLastPhoto, getOldPhotoFromRange
} from "./sensorsData.mjs";

async function saveMeasurements(temperature, humidity, pressure, measurementDate) {
    const sensorData = {
        temperature, humidity, pressure, measurementDate
    };
    await createSensorsData(sensorData);
}

async function savePhotoData(title, date) {
    const photoData = {
        title,
        date
    };
    await createPhotoData(photoData);
}

export const resolvers = {
    Query: {
        allMeasurements: async () => {
            console.log(`Measurements has been queried on: ${new Date().toISOString()}`);
            return getAllSensorsData();
        }, dateRangeMeasurements: async (_, args) => {
            return getDateRangeMeasurements(setDateRange(args.start, args.end));
        }, lastPhoto: async () => {
            return getLastPhoto();
        },
        oldPhotoFromRange: async (_, args) => {
            return getOldPhotoFromRange(setDateRange(args.start, args.end));
        }
    },

    Mutation: {
        saveMeasurements: async (_, args) => {
            args.measurementDate = new Date(args.measurementDate * 1000).toISOString();

            await saveMeasurements(args.temperature, args.humidity, args.pressure, args.measurementDate);
            console.log(`Measurement has been added on: ${args.measurementDate}`);
            return {
                code: 200, success: true, message: `Measurement has been added on: ${args.measurementDate}`
            };
        },
        savePhotoData: async (_, args) => {
            args.date = new Date().toISOString();
            await savePhotoData(args.title, args.date);
            console.log(`Photo source has been saved on: ${args.date}`);
            return {
                code: 200, success: true, message: `Photo source has been saved on: ${args.date}`
            };
        }
    }
};
