import { type IPagination, type IResponse } from "./interface";

export class AppResponse {
  static success({
    data,
    pagination,
  }: {
    data: Record<string, unknown> | Record<string, unknown>[];
    pagination?: IPagination;
  }): IResponse {
    return {
      meta: {
        success: true,
        pagination,
      },
      data,
    };
  }
  static error({
    errorMessage,
    developerMessage,
  }: {
    errorMessage: string;
    developerMessage: string;
  }): IResponse {
    return {
      meta: {
        success: false,
        error: errorMessage,
        developerMessage,
      },
      data: undefined,
    };
  }
}
