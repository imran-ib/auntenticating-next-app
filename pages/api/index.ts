import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../server/Schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ schema });

export default server.createHandler({
  path: "/api",
});
