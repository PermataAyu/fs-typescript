import data from '../../data/diagnoses.ts';
import type {DiagnoseEntry} from '../types.ts';

const diagnoses: DiagnoseEntry[] = data

const getDiagnose = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnose,
};