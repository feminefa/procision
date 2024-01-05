import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PatientService } from "./patient.service";
import {
  BaseRouter,
  type IProcedureRouterRecord,
} from "../../_shared/core/base.router";
import { PatientController } from "./patient.controller";

class PatientRouter extends BaseRouter {
  constructor(public controller: PatientController) {
    super(controller);
  }
  /**
   * @override
   * @returns {}
   */
  getRoutes(): IProcedureRouterRecord {
    const routes = super.getRoutes();
    return {
      ...routes,
      create: this.controller.create(),
    };
  }
}

export const patientRouter = createTRPCRouter(
  new PatientRouter(new PatientController()).getRoutes(),
);
