import express from 'express';
import patientService from '../services/patientService.ts';
import { newHealthCheckSchema, newHospitalSchema, newOccupationalSchema, newPatientSchema } from '../utils.ts';
import z from 'zod';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

patientRouter.get('/:id', (req, res) => {
  const data = patientService.getPatient(req.params.id);

  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({error: error.issues});
    }
    else {
      res.status(400).send({error: 'unknown error'});
    }
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  try {
    const type: string = req.body.type as string;
    const newEntry = type === "HealthCheck" ? newHealthCheckSchema.parse(req.body)
      : type === "OccupationalHealthcare" ? newOccupationalSchema.parse(req.body)
      : newHospitalSchema.parse(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({error: error.issues});
    }
    else {
      res.status(400).send({error: 'unknown error'});
    }
  }
}); 

export default patientRouter;