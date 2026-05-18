import { Gender, HealthCheckRating } from './types.ts'
import {z} from 'zod'

/* const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param)
}

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('bad or missing input')
  }
  return string
}

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('bad or missing date')
  }
  return date
}

const parseGender = (gender: unknown) => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('wrong gender')
  }
  return gender
} */

export const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string()
})

/* const Type = {
  healthCheck: "HealthCheck",
  hospital: "Hospital",
  occupationalHealthcare: "OccupationalHealthcare"
} as const

type Type = typeof Type[keyof typeof Type]
 */
const newEntrySchema = {
  date: z.iso.date(),
  specialist: z.string(),
  description: z.string(),
}



export const newHealthCheckSchema = z.object({
  ...newEntrySchema,
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.CriticalRisk),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
  ])
})

export const newHospitalSchema = z.object({
  ...newEntrySchema,
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
})

export const newOccupationalSchema = z.object({
  ...newEntrySchema,
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string()
})
/* const parseNewPatient = (object: unknown): NewPatient => {  
  return newPatientSchema.parse(object)
} */

// export default parseNewPatient