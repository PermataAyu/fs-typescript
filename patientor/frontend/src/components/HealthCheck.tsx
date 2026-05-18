import { Card, CardContent, Typography } from "@mui/material"
import { Diagnosis, HealthCheckEntry } from "../types"
import { Favorite, MedicalServices } from "@mui/icons-material"

interface Props {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[]
}

const HealthCheck = ({entry, diagnoses}: Props) => {

  const healthIcon = (obj: number) => {
    switch (obj) {
      case 0 :
        return {color: "red"}
      case 1 :
        return {color: "yellow"}
      case 2 :
        return {color: "blue"}
      default: 
        return {color: "green"}
    }
  }
  

  return (
    <Card variant="outlined" sx={{marginBottom: 1}}>
      <CardContent>
        <Typography>{entry.date} <MedicalServices /></Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        {entry.diagnosisCodes?.map(d => (
          <ul key={d}>
            <li><Typography>{d} - {diagnoses.find(diag => diag.code === d)?.name}</Typography></li>
          </ul>
        ))}
        <Favorite sx={healthIcon(entry.healthCheckRating)}/>
        <Typography> diagnose by {entry.specialist} </Typography>
      </CardContent>
    </Card>
  )
}

export default HealthCheck