import { publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BaseService } from "./base.service";
import { type PrismaClient } from "@prisma/client";
import {
  type ProcedureRouterRecord,
  type AnyProcedure,
  type AnyRouter,
} from "@trpc/server";
import { AppResponse } from "~/_shared/app-response";

export interface IProcedureRouterRecord extends ProcedureRouterRecord {
  create: AnyProcedure;
  findOne: AnyProcedure | AnyRouter;
  findMany: AnyProcedure | AnyRouter;
  updateOne: AnyProcedure | AnyRouter;
  deleteOne: AnyProcedure | AnyRouter;
}
export class BaseController {
  constructor(public service: BaseService) {}

  create(): AnyProcedure {
    return publicProcedure.input(z.any({})).mutation(async (opts) => {
      const { input, ctx } = opts;
      return AppResponse.success({
        data: await this.service.create(input, ctx),
      });
    });
  }

  findOne(): AnyProcedure {
    return publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        return AppResponse.success({
          data: await this.service.findOne(input.id, ctx),
        });
      });
  }
  findMany(): AnyProcedure {
    return publicProcedure.input(z.any()).query(async ({ input, ctx }) => {
      return AppResponse.success({
        data: await this.service.findMany(input, ctx),
      });
    });
  }

  updateOne(): AnyProcedure {
    return publicProcedure
      .input(z.object({ id: z.number(), payload: z.object({}) }))
      .mutation(async ({ input, ctx }) => {
        return AppResponse.success({
          data: await this.service.updateOne(input.id, input.payload, ctx),
        });
      });
  }
  deleteOne(): AnyProcedure {
    return publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async (opts) => {
        const { input, ctx } = opts;
        return AppResponse.success({
          data: await this.service.deleteOne(input.id, ctx),
        });
      });
  }
}
