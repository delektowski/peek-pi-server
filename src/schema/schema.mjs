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
       
    dateRangeFloorBoilerTemps(
        "Start date"
        start: String
        "End date"
        end: String
       
    ): [piFloorBoilerTemps]     
    
    dateRangeExternalTemp(
        "Start date"
        start: String
        "End date"
        end: String
    ): [ExternalTempMeasurement] 
          
    dateRangeGasSensorData(
        "Start date"
        start: String
        "End date"
        end: String
    ): [GasSensorData]    

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
        measurementDate: String      
        "Measurement date"
        measurementTable: String
    ): piSaveMeasurement   
    
    "Saves floor boiler temperatures to DB"
    saveFloorBoilerTemps(
        "Sensor temperature 1"
        temperature1: Float  
        "Sensor temperature 2"
        temperature2: Float  
        "Sensor temperature 3"
        temperature3: Float
    ): piSaveFloorBoilerTemps     
    
    "Saves external temperature to DB"
    saveExternalTemp(
        "Sensor temperature"
        temperature: Float
    ): piSaveExternalTemp    
        
    "Saves gas sensor data to DB"
    saveGasSensorData(
        "Gas Sensor data"
        gasData: Float
    ): piSaveGasSensorData     
   
    "Saves photo title to DB"
    savePhotoData(
        "Photo title"
        title: String
        "Photo date"
        date: String
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

type piFloorBoilerTemps {
    "Sensor temperature1"
    temperature1: Float
    "Sensor temperature2"
    temperature2: Float
    "Sensor temperature 3"
    temperature3: Float
    "Measurement date"
    measurementDate: String
}

type Measurement {
    "Sensor temperature"
    temperature: Float
    "Sensor pressure"
    pressure: Float
    "Sensor humidity"
    humidity: Float
    "Measurement date"
    measurementDate: String
}

type ExternalTempMeasurement {
    "Sensor temperature"
    temperature: Float
    "Measurement date"
    measurementDate: String
}

type GasSensorData {
    "Gas sensor data"
    gasData: Float
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
    measurementDate: String
}

type piSaveFloorBoilerTemps {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Sensor temperature1"
    temperature1: Float
    "Sensor temperature2"
    temperature2: Float
    "Sensor temperature 3"
    temperature3: Float
    "Measurement date"
    measurementDate: String
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

type piSaveGasSensorData {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Gas sensor data"
    gasData: Float
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
    date: String
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
