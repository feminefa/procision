import { type PrismaClient } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { parsePrompt } from "~/_shared/helper";
import { toSQLDate } from "~/utils/helpers";
import { BaseService } from "../../_shared/core/base.service";
import { createLanguageModel, createJsonTranslator } from "typechat";
import { type SurgicalCaseLLMResponse } from "./llm/surgicalCaseSchema";

export class SurgicalCaseService extends BaseService {
  /**
   * @override
   * Get case details
   * @param id
   * @param db
   * @returns
   */
  async findOne(id: unknown, option: { db: PrismaClient }) {
    return option.db.surgicalCase.findUnique({
      where: { id: Number(id) },
      include: {
        patient: true,
        surgeon: true,
      },
    });
  }

  async searchTypeChat(
    payload: { query: string; perPage?: number; page?: number },
    option: { db: PrismaClient },
  ): Promise<{ result: Record<string, unknown>[]; count: number }> {
    const model = createLanguageModel(process.env);
    const schema = `export interface SurgicalCaseLLMResponse {
      items: (LineItem | UnknownText)[];
    }
    
    // Use this type for order items that match nothing else
    export interface UnknownText {
      type: "unknown";
      text: string; // The text that wasn't understood
    }
    
    export interface LineItem {
      type: "lineitem";
      case: PatientNameSearchField | CaseIdSearchField;
      quantity: number;
    }
    
    // export type SearchFields = PatientNameSearchField | CaseIdSearchField;
    
    export interface PatientNameSearchField {
      type: "PatientNameSearchField";
      name: "patient";
      options: Patient[];
    }
    
    export interface CaseIdSearchField {
      type: "CaseIdSearchField";
      name: "case";
      options: Cases[];
    }
    
    type Patient = "John" | "mathew";
    type Cases = 1001 | 2001 | 3001;`;
    const translator = createJsonTranslator<SurgicalCaseLLMResponse>(
      model,
      schema,
      "SurgicalCaseLLMResponse",
    );
    const response = await translator.translate(payload.query);
    if (response.success) {
      console.log("adasdfas", response.data?.items[0]?.case?.options);
      return { result: [], count: 0 };
    }
    return { result: [], count: 0 };
  }
  /**
   *
   * @param payload
   * @param db
   * @returns
   */
  async search(
    payload: { query: string; perPage?: number; page?: number },
    option: { db: PrismaClient },
  ): Promise<{ result: Record<string, unknown>[]; count: number }> {
    const { query: search, perPage, page } = payload;
    const resultQuery =
      "Select A.*, B.name surgeon from (Select S.*, P.name patient, P.externalId from SurgicalCase S  LEFT JOIN Patient P on S.patientId = P.id  where 1=1 ";
    const countQuery = "Select count(*) as count from SurgicalCase where 1=1 ";
    let query = "";
    if (search.trim().length) {
      const promptResult: Record<string, unknown> | null = await parsePrompt(
        "You are a surgeon",
        `Todays date is ${new Date().toISOString()}. patientId begins with the letter P. caseId is a number. ICD10Code begins with 3 characters followed by a period and numbers. Extract in JSON format the patientId, caseId, patientName, surgeonName, surgeryDate (in year-month-day hour and minute format), diagonosis, procedure, icd10Code and specialty strictly from the following text for an app. Set field to null if you cant deduce it : ${search} `,
      );

      if (promptResult) {
        if (promptResult?.patientId) {
          query += `AND patientId in (select id from Patient where externalId like '%${String(
            String(promptResult.patientId).toUpperCase(),
          )}%')`;
        }
        if (promptResult?.patientName) {
          query += `AND patientId in (select id from Patient where name like '%${String(
            promptResult.patientName,
          )}%')`;
        }

        if (promptResult?.surgeonName) {
          query += `AND surgeonId in (select id from Surgeon where name like '%${String(
            String(promptResult.surgeonName)
              .toLowerCase()
              .replace(/dr/i, "")
              .replace(/\\./i, ""),
          ).trim()}%')`;
        }

        if (promptResult?.surgeryDate) {
          query += `AND dateOfSurgery > '${toSQLDate(
            startOfDay(Date.parse(String(promptResult?.surgeryDate))),
          )}' and dateOfSurgery <  '${toSQLDate(
            endOfDay(Date.parse(String(promptResult?.surgeryDate))),
          )}'`;
        }

        if (promptResult?.procedure) {
          query += `AND procedure like  '%${String(promptResult?.procedure)}%'`;
        }

        if (promptResult?.diagnosis) {
          query += `AND diagnosis like  '%${String(promptResult?.diagnosis)}%'`;
        }

        if (promptResult?.caseId) {
          query += `AND id =  ${Number(promptResult?.caseId)}`;
        }

        if (promptResult?.icd10Code) {
          query += `AND icd10Code like  '%${String(promptResult?.icd10Code)}%'`;
        }
      }
    }
    console.log(
      "query",
      `${resultQuery} ${query}   LIMIT ${perPage ?? 20}  OFFSET ${
        ((page ?? 1) - 1) * (perPage ?? 20)
      }) A LEFT JOIN Surgeon B ON A.surgeonId = B.id`,
    );
    return {
      result: await option.db.$queryRawUnsafe(
        `${resultQuery} ${query}   LIMIT ${perPage ?? 20}  OFFSET ${
          ((page ?? 1) - 1) * (perPage ?? 20)
        }) A LEFT JOIN Surgeon B ON A.surgeonId = B.id`,
      ),
      count: (await option.db.$queryRawUnsafe(`${countQuery} ${query}`))?.[0]
        ?.count,
    };

    return { result: [], count: 0 };
  }
}
