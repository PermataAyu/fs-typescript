import type z from "zod";
import type { newPatientSchema } from "./utils.ts";

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface Diagnoses {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnoses['code']>,
  description: string
}

interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string,
    criteria: string,
  }
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K>: never;

export type EntryNoId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NoSsnPatient = Omit<Patient, 'ssn'>

export type NewPatient = z.infer<typeof newPatientSchema>

export interface Patient extends NewPatient {
  id: string
}