export const typeDefs = `#graphql
type Query {
    allMeasurements: [piMeasurement]
    dateRangeMeasurements(
        "Start date"
        start: String
        "End date"
        end: String
        "measurementTable"
        measurementTable: String
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
    "Saves measurement to DB and table according to measurementTable arg"
    saveMeasurements(
        "Sensor temperature"
        temperature: Float
        "Sensor pressure"
        pressure: Float
        "Sensor humidity"
        humidity: Float
        "Measurement date"
        measurementDate: Float      
        "Measurement date"
        measurementTable: String
    ): piSaveMeasurement      
    
    "Saves external temperature to DB"
    saveExternalTemp(
        "Sensor temperature"
        temperature: Float
    ): piSaveExternalTemp     
   
    "Saves photo title to DB"
    savePhotoData(
        "Photo title"
        title: String
        "Photo date"
        date: Float
    ): piSavePhotoData   
    "Deletes photos title from DB"
    deletePhotoData(
        "Photo date"
        date: String
    ): piDeletePhotoData
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

type piSaveExternalTemp {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Sensor temperature"
    temperature: Float
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

type piDeletePhotoData {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Photo date"
    date: String
}

type piLastPhoto {
    "Photo title"
    title: String
    "Photo date"
    date: String
}
`;
