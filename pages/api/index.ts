import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { schema } from "../../server/Schema";
import { createContext } from "./context";
import { permissions } from "./permissions";

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
});

export default server.createHandler({
  path: "/api",
});
