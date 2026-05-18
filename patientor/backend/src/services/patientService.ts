import { v1 as uuid } from "uuid";

import patients from "../../data/patients.ts";
import type { EntryNoId, NewPatient, NoSsnPatient, Patient } from "../types.ts";

const patientsInfo: Patient[] = patients as Patient[]

const getPatients = (): NoSsnPatient[] => {
  return patientsInfo.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const getPatient = (id: string): NoSsnPatient | undefined => {
  const patient = patientsInfo.find((p) => p.id === id)
  return patient
}

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient = {
    id,
    entries: [], 
    ...patient
  };
  patientsInfo.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryNoId, patientId: Patient['id']) => {
  const id = uuid()
  const newEntry = {
    id, 
    ...entry
  }
  const findPatient = patientsInfo.find(p => p.id === patientId)
  findPatient?.entries.push(newEntry)
  return newEntry
}

export default {getPatients, getPatient, addPatient, addEntry};


