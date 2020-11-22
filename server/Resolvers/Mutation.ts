import { objectType, stringArg } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signupUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: (_, { name, email, password }, ctx) => {
        return prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });
      },
    });

    t.field("deletePost", {
      type: "Post",
      nullable: true,
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.delete({
          where: { id: Number(postId) },
        });
      },
    });

    t.field("createDraft", {
      type: "Post",
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.field("publish", {
      type: "Post",
      nullable: true,
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return prisma.post.update({
          where: { id: Number(postId) },
          data: { published: true },
        });
      },
    });
    t.field("userLogin", {
      type: "String",
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      nullable: true,
      description: "User Sign in",
      resolve: async (parent, args, ctx) => {
        try {
          const User = await prisma.user.findOne({
            where: {
              email: args.email,
            },
          });

          if (!User) throw new Error(`Authorization failed`);
          const token = jwt.sign({ UserId: User.id }, "MyNewApp");
          return token;
        } catch (error) {
          console.log("definition -> error", error);
        }
      },
    });
  },
});
