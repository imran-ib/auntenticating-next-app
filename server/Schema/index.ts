import { makeSchema } from "@nexus/schema";
import path from "path";
import { Post, User } from "../Modles";
import { Query } from "../Resolvers/Query";
import { Mutation } from "../Resolvers/Mutation";


export const schema = makeSchema({
    types: [Query, Mutation, Post, User],
    outputs: {
      typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
      schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
    },
  });
  