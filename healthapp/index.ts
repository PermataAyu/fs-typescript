import express from 'express';
import { calculateBMI } from './bmiCalculator.ts';
import { isNotNumber } from './utils.ts';
import { calculateExercise } from './exerciseCalculator.ts';
const app = express();

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
  const {weight, height} = req.query;
  try {
    if (!weight || !height || isNotNumber(weight) || isNotNumber(height) ) {
      throw new Error('malformatted parameters');
    }
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBMI(Number(height), Number(weight))
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({error: error.message});
    }
  }
});

app.use(express.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises , target} = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercises: number[] = daily_exercises;

  if (!target || !daily_exercises) {
    return res.status(400).send({error: 'parameters missing'});
  } else if (isNotNumber(target) || (exercises.map((e: number) => Number(e))).includes(NaN)) {
    return res.status(400).send({error: 'malformatted parameters'});
  }
  
  return res.send(calculateExercise(exercises, Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});