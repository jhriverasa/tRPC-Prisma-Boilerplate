import { publicProcedure } from "@/server/trpc"
import { prisma } from "@/server/prisma"
import { z } from "zod";

//Using zod-prisma-types 
//Another option is to use prisma-trpc-generator
import { UserCreateInputSchema } from 'prisma/generated/zod'


export const userRouter = {
    userList: publicProcedure
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
}
