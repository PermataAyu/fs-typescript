import express from 'express';
import patientService from '../services/patientService.ts';
import { newPatientSchema } from '../utils.ts';
import z from 'zod';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({error: error.issues})
    }
    else {
      res.status(400).send({error: 'unknown error'})
    }
  }
});

export default patientRouter;