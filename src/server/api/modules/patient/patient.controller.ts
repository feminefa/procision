import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { PatientService } from "./patient.service";

import { AppResponse } from "~/_shared/app-response";
import { BaseController } from "../../_shared/core/base.controller";
import { type AnyProcedure } from "@trpc/server";

export class PatientController extends BaseController {
  constructor() {
    super(
      new PatientService({
        schema: "Patient",
        searchFields: ["name", "externalId"],
      }),
    );
  }

  create(): AnyProcedure {
    return publicProcedure
      .input(
        z.object({
          externalId: z.string(),
          name: z.string(),
          gender: z.string(),
          age: z.number(),
          photoUrl: z.string(),
          phone: z.string(),
          street: z.string(),
          state: z.string(),
          city: z.string(),
          zip: z.string(),
        }),
      )
      .mutation(async (opts) => {
        const { input, ctx } = opts;
        return AppResponse.success({
          data: await this.service.create(input, ctx),
        });
      });
  }
}
