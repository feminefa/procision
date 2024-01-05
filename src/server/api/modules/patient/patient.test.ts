// import { test, expect } from "@jest/globals";
// import { type AppRouter, appRouter } from "../../root";
// import { prisma } from "../../../db";
// import { type inferProcedureInput } from "@trpc/server";
// import { createInnerTRPCContext } from "../../trpc";

// test("Get One Patient", async () => {
//   const caller = appRouter.createCaller(
//     createInnerTRPCContext({ session: null }),
//   );

//   type Input = inferProcedureInput<AppRouter["patient"]["findOne"]>;

//   const input: Input = {
//     id: 1,
//   };

//   const result = await (caller.patient as any).findOne(input);

//   expect(result).toStrictEqual({ greeting: "Hello test" });
// });
