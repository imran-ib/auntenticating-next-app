import { rule, shield } from "graphql-shield";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "../../../utils/decodejwt";
const prisma = new PrismaClient();

const rules = {
  isAuthenticatedUser: rule()(async (__parent, _args, context) => {
    const userId = parseInt(getUserId(context));
    const User = await prisma.user.findOne({ where: { id: userId } });
    if (User) {
      return true;
    } else {
      return false;
    }
  }),
};

export const permissions = shield({
  Query: {
    post: rules.isAuthenticatedUser,
    feed: rules.isAuthenticatedUser,
    drafts: rules.isAuthenticatedUser,
    filterPosts: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isAuthenticatedUser,
    publish: rules.isAuthenticatedUser,
  },
});
