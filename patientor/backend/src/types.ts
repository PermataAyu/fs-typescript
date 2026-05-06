import type z from "zod"
import type { newPatientSchema } from "./utils.ts"

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const

export type Gender = typeof Gender[keyof typeof Gender]

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NoSsnPatient = Omit<Patient, 'ssn'>

export type NewPatient = z.infer<typeof newPatientSchema>

export interface Patient extends NewPatient {
  id: string
}