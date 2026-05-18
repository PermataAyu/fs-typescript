import { Diagnosis, Entry } from "../types"
import HealthCheck from "./HealthCheck"
import Hospital from "./Hospital"
import OccupationalHealthcare from "./OccupationalHealthcare"

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({entry, diagnoses}: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (<HealthCheck entry={entry} diagnoses={diagnoses}/>)
    case "OccupationalHealthcare":
      return (<OccupationalHealthcare entry={entry} diagnoses={diagnoses}/>)
    default:
      return (<Hospital entry={entry} diagnoses={diagnoses}/>)
  }
}

export default EntryDetails