import 'reflect-metadata';

import CountryResolver from './resolvers/Country.resolver'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import datasource from './lib/datasource';
import helmet from 'helmet';


export interface MyContext {
	req: express.Request;
  	res: express.Response;

}

export interface Payload {
	email: string;
  }

const app = express();

const httpServer = http.createServer(app);



async function main() {
	const schema = await buildSchema({
		resolvers: [CountryResolver],
		validate: false,
	});
	const server = new ApolloServer<MyContext>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	app.use(
		'/',
		cors<cors.CorsRequest>({ origin: '*' }),
	);
    await datasource.initialize();
	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();