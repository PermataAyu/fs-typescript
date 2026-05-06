import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patient.ts';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

/* app.get('/api/patients', (_req, res) => {
  res.send('temp');
}); */

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`run on port ${PORT}`);
});