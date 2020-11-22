import { objectType, stringArg } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("posts", {
      type: "Post",
      list: true,
      nullable: true,
      resolve: (_, args) => {
        return prisma.post.findMany();
      },
    });

    t.field("post", {
      type: "Post",
      args: {
        postId: stringArg({ nullable: false }),
      },
      resolve: (_, args) => {
        return prisma.post.findOne({
          where: { id: Number(args.postId) },
        });
      },
    });

    t.list.field("feed", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return prisma.post.findMany({
          where: { published: true },
        });
      },
    });

    t.list.field("drafts", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return prisma.post.findMany({
          where: { published: false },
        });
      },
    });

    t.list.field("filterPosts", {
      type: "Post",
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});
