import data from '../../data/diagnoses.ts';
import type {Diagnoses} from '../types.ts';

const diagnoses: Diagnoses[] = data;

const getDiagnose = (): Diagnoses[] => {
  return diagnoses;
};

export default {
  getDiagnose,
};