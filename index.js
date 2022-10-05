const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

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

      id: Int
      temperature: Int
      pressure: Int
      humidity: Int
      measurementDate: String
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
    id: Int
    temperature: Int
    pressure: Int
    humidity: Int
    measurementDate: String
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    piMeasurements: (_, args) => {
      return {
        code: 200,
        success: true,
        message: `Measurement with ID ${args.id} has been saved to DB`
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
