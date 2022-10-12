const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    allMeasurements: [piMeasurement]
    dateRangeMeasurements: [piMeasurement]
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
`;
