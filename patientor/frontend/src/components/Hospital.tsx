import { Card, CardContent, Typography } from "@mui/material"
import { Diagnosis, HospitalEntry } from "../types"
import { LocalHospital } from "@mui/icons-material"

interface Props {
  entry: HospitalEntry
  diagnoses: Diagnosis[]
}

const Hospital = ({entry, diagnoses}: Props) => {
  return (
    <Card variant="outlined" sx={{marginBottom: 1}}>
      <CardContent>
        <Typography>{entry.date} <LocalHospital /> </Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        <Typography>discharge information:</Typography>
        <Typography>{entry.discharge.date}</Typography>
        <Typography>{entry.discharge.criteria}</Typography>
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

export default Hospital