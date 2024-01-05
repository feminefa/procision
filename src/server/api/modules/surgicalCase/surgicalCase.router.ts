import { createTRPCRouter } from "~/server/api/trpc";

import { SurgicalCaseService } from "./surgicalCase.service";
import {
  BaseRouter,
  type IProcedureRouterRecord,
} from "../../_shared/core/base.router";
import { SurgicalCaseController } from "./surgicalCase.controller";

class SurgicalCaseRouter extends BaseRouter {
  constructor(public controller: SurgicalCaseController) {
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
      updateOne: this.controller.updateOne(),

      searchLLM: this.controller.searchLLM(),

      search: this.controller.search(),
    };
  }
}

export const surgicalCaseRouter = createTRPCRouter(
  new SurgicalCaseRouter(new SurgicalCaseController()).getRoutes(),
);
