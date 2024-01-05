import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";
import {
  BaseRouter,
  type IProcedureRouterRecord,
} from "../../_shared/core/base.router";
import { SurgeonController } from "./surgeon.controller";

class SurgeonRouter extends BaseRouter {
  constructor(public controller: SurgeonController) {
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

export const surgeonRouter = createTRPCRouter(
  new SurgeonRouter(new SurgeonController()).getRoutes(),
);
