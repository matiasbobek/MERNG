import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import config from "../config";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const PORT = process.env.port || config.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => req,
});

mongoose.set("strictQuery", true);
mongoose
  .connect(config.MONGODB_URI)
  .then(async () => {
    const res = await server.listen({ port: PORT });
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
