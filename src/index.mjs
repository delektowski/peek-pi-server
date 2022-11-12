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

let { url } = await startStandaloneServer(server, {
	listen: { port: process.env.SERVER_PORT},
});

url=process.env.SERVER_URL

console.log(`🚀  Server ready at: ${url}`);
