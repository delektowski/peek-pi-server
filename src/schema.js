const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    books: [Book]
  }
  type Mutation {
    saveMeasurements(
      temperature: Float
      pressure: Float
      humidity: Float
      measurementDate: Float
    ): piMeasurement
  }
  type Book {
    title: String
    author: String
  }

  type piMeasurement {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    temperature: Float
    pressure: Float
    humidity: Float
    measurementDate: Float
  }
`;
