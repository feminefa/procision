export interface IPagination {
  total: number;
  page: number;
  perPage: number;
  nextPage?: number;
}
export interface IResponse {
  meta: {
    success: boolean;
    error?: string;
    code?: number;
    developerMessage?: string;
    pagination?: IPagination;
  };
  data?: Record<string, unknown>[] | Record<string, unknown>;
}
export interface IUser {
  id?: number;
  email?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISurgicalCase {
  id?: number;
  externalId?: string;
  surgeon?: ISurgeon;
  patientId?: number;
  caseId: string;
  procedure?: string;
  patient?: IPatient;
  surgeonId?: number;
  dateOfSurgery?: Date;
  diagnosis?: string;
  icd10Code?: string;
}

export interface IPatient {
  id?: number;
  externalId?: string;
  name?: string;
  age?: number;
  gender?: string;
  photoUrl?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  updatedAt?: string;
  SurgicalCase?: ISurgicalCase[];
}

export interface ISurgeon {
  id?: number;
  name?: string;
  specialty?: string;
  npi?: string;
  createdAt?: string;
  updatedAt?: Date;
  surgicalCase?: ISurgicalCase[];
}
