import { z } from "zod";
import { type IResponse } from "~/_shared/interface";

import { publicProcedure } from "~/server/api/trpc";

import { AppResponse } from "~/_shared/app-response";
import { BaseController } from "../../_shared/core/base.controller";
import { type AnyProcedure } from "@trpc/server";
import { SurgicalCaseService } from "./surgicalCase.service";

export class SurgicalCaseController extends BaseController {
  constructor() {
    super(
      new SurgicalCaseService({
        schema: "SurgicalCase",
        searchFields: ["diagnosis", "externalId"],
      }),
    );
  }

  create(): AnyProcedure {
    return publicProcedure
      .input(
        z.object({
          externalId: z.string(),
          patientId: z.number(),
          procedure: z.string(),
          surgeonId: z.number(),
          dateOfSurgery: z.date(),
          diagnosis: z.string(),
          icd10Code: z.string(),
        }),
      )
      .mutation(async (opts) => {
        const { input, ctx } = opts;
        return AppResponse.success({
          data: await this.service.create(input, ctx),
        });
      });
  }

  updateOne(): AnyProcedure {
    return publicProcedure
      .input(
        z.object({
          id: z.number(),
          payload: z.object({
            externalId: z.string(),
            patientId: z.number(),
            procedure: z.string(),
            surgeonId: z.number(),
            dateOfSurgery: z.date(),
            diagnosis: z.string(),
            icd10Code: z.string(),
          }),
        }),
      )
      .mutation(async (opts) => {
        const { input, ctx } = opts;
        return AppResponse.success({
          data: await this.service.updateOne(input.id, input.payload, ctx),
        });
      });
  }

  searchLLM(): AnyProcedure {
    return publicProcedure
      .input(
        z.object({
          query: z.string(),
          page: z.number().optional(),
          perPage: z.number().optional(),
        }),
      )
      .query(async ({ input, ctx }): Promise<IResponse> => {
        if (!input.perPage) input.perPage = 20;
          if (!input.page) input.page = 1;
          const service = this.service as SurgicalCaseService;
          const { result, count } = await service.search(input, ctx);
        return AppResponse.success({
          data: result,
          pagination: {
            total: Number(count),
            perPage: input.perPage,
            page: input.page,
          },
        });
      });
  }

  /**
   *
   */
  search(): AnyProcedure {
    return publicProcedure
      .input(
        z.object({
          query: z.string(),
          page: z.number().optional(),
          perPage: z.number().optional(),
        }),
      )
      .query(async ({ input, ctx }): Promise<IResponse> => {
        console.log("SERCHING.....2");
        if (!input.perPage) input.perPage = 20;
          if (!input.page) input.page = 1;
          const service = this.service as SurgicalCaseService;
          const { result, count } = await service.search(input, ctx);

        return AppResponse.success({
          data: result,
          pagination: {
            total: Number(count),
            perPage: input.perPage,
            page: input.page,
          },
        });
      });
  }
}
