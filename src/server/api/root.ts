import { userRouter } from "~/server/api/modules/user/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { surgicalCaseRouter } from "./modules/surgicalCase/surgicalCase.router";
import { patientRouter } from "./modules/patient/patient.router";
import { surgeonRouter } from "./modules/surgeon/surgeon.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  cases: surgicalCaseRouter,
  patient: patientRouter,
  surgeon: surgeonRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
