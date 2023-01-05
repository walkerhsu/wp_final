import fs from "fs";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { createSchema, createYoga, createPubSub } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import path from "path";
import express from "express";
// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import DateResolver from "./resolvers/Date.js";
// import CategoryResolver from "./resolvers/Category.js";
// db
import categoryModel from "./models/category.js";
import itemModel from "./models/item.js";
import userModel from "./models/user.js";
import commentModel from "./models/comment.js";
import responseModel from "./models/response.js";

const app = express();

const pubSub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync("./src/schema.graphql", "utf-8"),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Date: DateResolver,
      // Category: CategoryResolver,
    },
  }),
  context: {
    pubSub,
    categoryModel,
    itemModel,
    userModel,
    commentModel,
    responseModel,
  },
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});

app.use("/graphql", yoga);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
const httpServer = http.createServer(yoga)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

if (process.env.NODE_ENV !== "production") {
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
}

export default httpServer;
