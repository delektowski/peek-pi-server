import {setDateRange} from './helpers.mjs'
import {createSensorsData, getAllSensorsData, getDateRangeMeasurements} from './sensorsData.mjs'

async function saveMeasurements(temperature, humidity, pressure, measurementDate) {
    const sensorData = {
        temperature, humidity, pressure, measurementDate,
    };
    await createSensorsData(sensorData);
}

export const resolvers = {
    Query: {
        allMeasurements: async () => {
            console.log(`Measurements has been queried on: ${new Date().toISOString()}`);
            return getAllSensorsData();
        }, dateRangeMeasurements: async (_, args) => {
            return getDateRangeMeasurements(setDateRange(args.start, args.end));
        },
    },

    Mutation: {
        saveMeasurements: async (_, args) => {
            args.measurementDate = new Date(args.measurementDate * 1000).toISOString();

            await saveMeasurements(args.temperature, args.humidity, args.pressure, args.measurementDate);
            console.log(`Measurement has been added on: ${args.measurementDate}`);
            return {
                code: 200, success: true, message: `Measurement has been added on: ${args.measurementDate}`,
            };
        },
    },
};
