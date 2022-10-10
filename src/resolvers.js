const db = require("./sensorsData");


const books = [
    {
        title: "The Awakening2",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];

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
        measurementDate
    }
    await db.createSensorsData(sensorData);
}

module.exports = {
    Query: {
        books: () => {
            console.log("BOOKS");
            return books;
        },
    },

    Mutation: {
        saveMeasurements: (_, args) => {
            args.measurementDate = new Date(
                args.measurementDate * 1000
            ).toISOString()

            saveMeasurements(
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
}
