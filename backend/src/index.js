// import server from './server' // GraphQL server
import mongo from "./mongo"; // MongoDB connection
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import path from 'path'
import express from 'express';
import cors from "cors";
import * as fs from "fs";
import {
  PostModel,
  UserModel,
  MessageModel,
  ChatBoxModel,
} from "./models/activity";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import DateResolver from "./resolvers/Date.js";
import CategoryResolver from "./resolvers/Category.js";
import ChatBox from "./resolvers/ChatBox";

import bcrypt from "bcrypt";


mongo.connect();

const pubsub = createPubSub();
const app = express()
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync("./src/schema.graphql", "utf-8"),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      ChatBox,
      Date: DateResolver,
      // Category: CategoryResolver,
    },
  }),
  context: {
    PostModel,
    UserModel,
    MessageModel,
    ChatBoxModel,
    pubsub,
    bcrypt,
  },
  //  graphqlEndpoint: '/',   // uncomment this to send the app to: 4000/
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});


if (process.env.NODE_ENV === "production"){
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../Tzu-Wei_frontend", "build")));
  app.use(express.json());
  app.get("/*", function( req, res){     
      res.sendFile(path.join(__dirname, "../Tzu-Wei_frontend", "build", "index.html"))
  })
  
}
app.use('/graphql', yoga)

const PORT = process.env.PORT || 4000;
const httpServer = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});


const wsServer = new WebSocketServer({
  server: httpServer
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };
      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);