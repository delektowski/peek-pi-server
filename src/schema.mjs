export const typeDefs = `#graphql
type Query {
    allMeasurements: [piMeasurement]
    dateRangeMeasurements(
        "Start date"
        start: String
        "End date"
        end: String
    ): [piMeasurement]
    lastPhoto: [piLastPhoto]
    oldPhotoFromRange(
        "Start date"
        start: String
        "End date"
        end: String
    ): [piLastPhoto]
}
type Mutation {
    "Saves measurement to DB"
    saveMeasurements(
        "Sensor temperature"
        temperature: Float
        "Sensor pressure"
        pressure: Float
        "Sensor humidity"
        humidity: Float
        "Measurement date"
        measurementDate: Float
    ): piSaveMeasurement    
    "Saves photo title to DB"
    savePhotoData(
        "Photo title"
        title: String
        "Photo date"
        date: Float
    ): piSavePhotoData
}

type piMeasurement {
    "Sensor temperature"
    temperature: Float
    "Sensor pressure"
    pressure: Float
    "Sensor humidity"
    humidity: Float
    "Measurement date"
    measurementDate: String
}

type piSaveMeasurement {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Sensor temperature"
    temperature: Float
    "Sensor pressure"
    pressure: Float
    "Sensor humidity"
    humidity: Float
    "Measurement date"
    measurementDate: Float
}

type piSavePhotoData {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Photo title"
    title: String
    "Photo date"
    date: Float
}

type piLastPhoto {
    "Photo title"
    title: String
    "Photo date"
    date: String
}
`;
