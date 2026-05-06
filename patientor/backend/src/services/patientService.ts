import { v1 as uuid } from "uuid";

import data from "../../data/patients.ts";
import type { NewPatient, NoSsnPatient, Patient } from "../types.ts";

const patients: Patient[] = data as Patient[]

const getPatients = (): NoSsnPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient = {
    id, ...patient
  };
  data.push(newPatient);
  return newPatient;
};

export default {getPatients, addPatient};


