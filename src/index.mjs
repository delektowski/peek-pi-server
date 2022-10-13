import {typeDefs} from "./schema.mjs";
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {resolvers} from "./resolvers.mjs";
import * as dotenv from 'dotenv'
dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
//
// server.listen(process.env.SERVER_PORT, process.env.SERVER_URL).then(({url}) => {
//     console.log(`🚀  Server ready at ${url}`);
// });
