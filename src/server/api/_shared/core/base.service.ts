import { type PrismaClient } from "@prisma/client";
import { omit } from "lodash";
import { unknown } from "zod";

export class BaseService {
  constructor(protected config: { schema: string; searchFields?: string[] }) {}

  /**
   * Create a new object
   * @param payload
   * @param option
   * @returns
   */
  async create(payload: unknown, option: { db: PrismaClient }) {
    return await(option.db as any)?.[this.config.schema].create({
      data: payload,
    });
  }

  /**
   * findOne record
   * @param {number} id
   * @param {object} option
   * @returns
   */
  async findOne(id: unknown, option: { db: PrismaClient }) {
    return await(option.db as any)[this.config.schema].findUnique({
      where: { id: Number(id) },
    });
  }

  /**
   * findMany Finds many records
   * @param query
   * @param option
   * @returns
   */
  async findMany(query: unknown, option: { db: PrismaClient }) {
    let searchQuery = query as Record<string, unknown>;
    if (searchQuery.search && this.config.searchFields?.length) {
      searchQuery.OR = [];
      for (const field of this.config.searchFields) {
        (searchQuery.OR as Record<string, unknown>[]).push({
          [field]: { startsWith: `%${String(searchQuery.search)}%` },
        });
      }
    }
    const take = Number(searchQuery.perPage ?? 20);
    const skip = (Number(searchQuery.page ?? 1) - 1) * take;
    searchQuery = omit(searchQuery, ["perPage", "search", "page"]);
    return await(option.db as any)[this.config.schema].findMany({
      where: searchQuery,
      skip,
      take,
    });
  }

  /**
   * Updates a record
   * @param id
   * @param payload
   * @param option
   * @returns
   */
  async updateOne(id: number, payload: unknown, option: { db: PrismaClient }) {
    return await(option.db as any)[this.config.schema].update({
      where: { id },
      data: payload,
    });
  }

  /**
   * deletes a record
   * @param  {number} id
   * @param option
   * @returns
   */
  async deleteOne(id: number, option: { db: PrismaClient }) {
    return await(option.db as any)[this.config.schema].delete({
      where: { id },
    });
  }
}
