//Prisma 
import { PrismaClient } from '@prisma/client'

// Using zod-prisma-types -> considering prisma-trpc-generator
import { UserCreateInputSchema } from '../prisma/generated/zod'


import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";

const prisma = new PrismaClient()

const appRouter = router({
  userList: publicProcedure //shielded 
    .query(async () => {
      const users = await prisma.user.findMany()

      return users;
    }),
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.findUnique({ where: { id: input } });
      return user;
    }),
  userCreate: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.create({ data: input });
      return user;
    }),


});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);