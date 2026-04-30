import {isNotNumber} from "./utils.ts";

export const calculateBMI = (height: number, mass: number) => {
  const bmi = mass/(height*height/10000);
  switch (true) {
    case bmi < 16 :
      return "Underweight (Severe thinnest)";
    case bmi < 17 :
      return "Underweight (Moderate thinnest)";
    case bmi < 18.5 : 
      return "Underweight (Mild thinnest)";
    case bmi < 25 :
      return "Normal range";
    case bmi < 30 :
      return "Overweight (Pre-obeses)";
    case bmi < 35 :
      return "Obese (Class I)";
    case bmi < 40 :
      return "Obese (Class II)";
    default: 
      return "Obese (Class III)";
  }
};

try {
  if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3])) {
    throw new Error('Some provided value is not number');
  } else if (process.argv.length > 4) {
    throw new Error('Too long arguments');
  } else if (process.argv.length < 4) {
    throw new Error('Too short arguments');
  } 

  console.log(calculateBMI(Number(process.argv[2]), Number(process.argv[3])));
} catch (error) {
  let errorMessage = "Something Wrong. ";
  if (error instanceof Error) {
    errorMessage += "\nError: " + error.message;
  }
  if (process.argv[1] === import.meta.filename) {
    console.log(errorMessage);
  } 
}

