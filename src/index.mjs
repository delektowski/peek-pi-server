import {ApolloServer} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from "./schema.mjs";
import {resolvers} from "./resolvers.mjs";
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import * as dotenv from 'dotenv'
dotenv.config()

const config =  { ssl: false, port: 1978, hostname: '139.162.131.141' }

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await server.start();

const app = express();

app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

let httpServer;

if (config.ssl) {
    httpServer = https.createServer(
        {
            key: fs.readFileSync(`./ssl/server.key`),
            cert: fs.readFileSync(`./ssl/server.crt`),
        },

        app,
    );
} else {
    httpServer = http.createServer(app);
}

await new Promise((resolve) => httpServer.listen({ port: config.port }, resolve));

console.log('🚀 Server ready at', `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}/graphql`);
