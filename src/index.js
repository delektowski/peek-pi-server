const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const Sqlite = require("better-sqlite3");
const path = require("path");
const db = require("./sensorsData");



function query(sql) {
  return db.prepare(sql);
}

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

const typeDefs = gql`
  type Query {
    books: [Book]
  }
  type Mutation {
    piMeasurements(
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

const resolvers = {
  Query: {
    books: () => {
      console.log("BOOKS");
      return books;
    },
  },

  Mutation: {
    piMeasurements: (_, args) => {
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
