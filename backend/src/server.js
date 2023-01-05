import fs from 'fs'
import { createSchema, createYoga, createPubSub } from 'graphql-yoga';

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import DateResolver from "./resolvers/Date.js";
// import CategoryResolver from "./resolvers/Category.js";
// db
import categoryModel from './models/category.js';
import itemModel from "./models/item.js";
import userModel from "./models/user.js";
import commentModel from './models/comment.js';
import responseModel from './models/response.js';

const pubSub = createPubSub();

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
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
    subscriptionsProtocol: 'WS'
  }
})
