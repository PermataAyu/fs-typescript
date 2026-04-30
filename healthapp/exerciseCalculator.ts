import {isNotNumber} from "./utils.ts";

const input = process.argv.slice(3);

interface Result {
  periodLength: number,
  trainingDays: number, 
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercise = (exercise: number[], target: number): Result => {
  const average = exercise.reduce((a, b) => a + b, 0)/ exercise.length;
  const rating = average < (target - 0.5) ? 1 
    : average > (target + 0.5) ? 3
    : 2;
  const ratingDescription = rating === 1 ? "exercise more" 
    : rating === 2 ? "keep it up"
    : "you crushed it";
  return {
    periodLength: exercise.length,
    trainingDays: exercise.filter(a => a > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  if (isNotNumber(process.argv[2])) {
    throw new Error('Some provided value is not number');
  }

  const exercise = input.map(e => {
    if (isNotNumber(e)) {
      throw new Error('Some provided value is not number');
    }
    return Number(e);
  });
  console.log(calculateExercise(exercise, Number(process.argv[2])));
} catch (error) {
  let errorMessage = "Something Wrong. ";
  if (error instanceof Error) {
    errorMessage += "\nError: " + error.message;
  }
  if (process.argv[1] === import.meta.filename) {
    console.log(errorMessage);
  }
}
