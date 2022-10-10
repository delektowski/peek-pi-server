const db = require("./sensorsData");

async function saveMeasurements(
  temperature,
  humidity,
  pressure,
  measurementDate
) {
  const sensorData = {
    temperature,
    humidity,
    pressure,
    measurementDate,
  };
  await db.createSensorsData(sensorData);
}

module.exports = {
  Query: {
    allMeasurements: async () => {
      return await db.getAllSensorsData();
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
        args.measurementDate
      );

      return {
        code: 200,
        success: true,
        message: `Measurement has been added!`,
      };
    },
  },
};
