export interface SurgicalCaseLLMResponse {
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
  options: Patient;
}

export interface CaseIdSearchField {
  type: "CaseIdSearchField";
  name: "case";
  options: Cases;
}

type Patient =
  | "P1001"
  | "P1002"
  | "P1003"
  | "P1004"
  | "P1005"
  | "P1006"
  | "P1007"
  | "P1008"
  | "P1009"
  | "P1010"
  | "P1011"
  | "P1012"
  | "P1013"
  | "P1014";
type Cases = 1 | 2 | 3 | 4 | 5;
