import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../server/Schema";
import { createContext } from "./context";

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema,
  context: createContext,
});

export default server.createHandler({
  path: "/api",
});
