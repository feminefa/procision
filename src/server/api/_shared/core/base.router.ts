import {
  type ProcedureRouterRecord,
  type AnyProcedure,
  type AnyRouter,
} from "@trpc/server";
import { type BaseController } from "./base.controller";

export interface IProcedureRouterRecord extends ProcedureRouterRecord {
  create: AnyProcedure;
  findOne: AnyProcedure | AnyRouter;
  findMany: AnyProcedure | AnyRouter;
  updateOne: AnyProcedure | AnyRouter;
  deleteOne: AnyProcedure | AnyRouter;
}
export class BaseRouter {
  constructor(public controller: BaseController) {}

  getRoutes(): IProcedureRouterRecord {
    return {
      create: this.controller.create(),
      findOne: this.controller.findOne(),
      findMany: this.controller.findMany(),
      updateOne: this.controller.updateOne(),
      deleteOne: this.controller.deleteOne(),
    };
  }
}
