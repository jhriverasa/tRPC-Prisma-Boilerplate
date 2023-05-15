import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "@/server/trpc"

//routers
import { userRouter } from "@/routers"

const appRouter = router({
  user: userRouter

});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);