import { Card, CardContent, Typography } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../types"
import { Work } from "@mui/icons-material"

interface Props {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
}

const OccupationalHealthcare = ({entry, diagnoses}: Props) => {
  
  return (
    <Card variant="outlined" sx={{marginBottom: 1}}>
      <CardContent>
        <Typography>{entry.date} <Work /> {entry.employerName}</Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        <Typography>
          sick untill {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </Typography>
        {entry.diagnosisCodes?.map(d => (
          <ul key={d}>
            <li><Typography>{d} - {diagnoses.find(diag => diag.code === d)?.name}</Typography></li>
          </ul>
        ))}
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

export default OccupationalHealthcare