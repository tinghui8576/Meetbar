import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
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
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import bcrypt from "bcrypt";

const pubsub = createPubSub();

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

const httpServer = createServer(yoga);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
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
export default httpServer;
