import { Alert, Autocomplete, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { Diagnosis, EntryNoId, HealthCheckRating } from "../types"

interface Props {
  diagnoses: Diagnosis[]
  onSubmit: (entry: EntryNoId) => void
  error?: string
}

const today = new Date().toJSON().slice(0, 10)

const EntryForm = ({diagnoses, onSubmit, error}: Props) => {
  const [date, setDate] = useState(today)
  const [dcode, setDcode] = useState<string[]>([])
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [rating, setRating] = useState(HealthCheckRating.Healthy)
  const [workplace, setWorkplace] = useState('')
  const [sickStart, setSickStart] = useState(today)
  const [sickEnd, setSickEnd] = useState(today)
  const [discharge, setDischarge] = useState(today)
  const [criteria, setCriteria] = useState('')

  const moreField = (type: string) => {
    switch(type) {
      case "HealthCheck":
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>Health Check Rating</InputLabel>
            <Select 
              required
              value={rating}
              label="Entry Type"
              onChange={(event) => setRating(event.target.value)}
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )
      case "OccupationalHealthcare":
        return (
          <>
            <TextField 
              fullWidth
              margin="normal" 
              required 
              label="Workplace Name"
              value={workplace}
              onChange={(event) => setWorkplace(event.target.value)}
            />
            <TextField 
              fullWidth
              margin="normal"
              required 
              type="date"
              label="Sick Duration Start"
              value={sickStart}
              onChange={(event) => setSickStart(event.target.value)}
            />
            <TextField 
              fullWidth
              margin="normal"
              required 
              type="date"
              label="Sick Duration End"
              value={sickEnd}
              onChange={(event) => setSickEnd(event.target.value)}
            />
          </>
        )
      case "Hospital":
        return (
          <>
            <TextField 
              fullWidth
              margin="normal"
              required 
              type="date"
              label="Sick Duration End"
              value={discharge}
              onChange={(event) => setDischarge(event.target.value)}
            />
            <TextField 
              fullWidth 
              margin="dense"
              required 
              label="Discharge Criteria"
              value={criteria}
              onChange={(event) => setCriteria(event.target.value)}
            />
          </>
        )
      default:
        return (
          null
        )
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    switch (type) {
      case "HealthCheck":
        return onSubmit({type, healthCheckRating: rating, date, specialist, description})
      case "OccupationalHealthcare":
        return onSubmit({
          type, 
          date, 
          specialist, 
          description, 
          employerName: workplace, 
          sickLeave: {startDate: sickStart, endDate: sickEnd}
        })
      case "Hospital": 
        return onSubmit({
          type, 
          date, 
          specialist, 
          description, 
          discharge: {date: discharge, criteria}
        })
    }

  }
  
  return(
    <Card sx={{borderStyle: "dashed", borderWidth: "2px"}}>
      <CardContent>
        <form onSubmit={addEntry}>
          <Typography variant="h6" >New Entry</Typography>
          {error && <Alert severity="error">{error}</Alert>} 
          <FormControl fullWidth margin="normal">
            <InputLabel>Entry Type</InputLabel>
            <Select 
              required
              value={type}
              label="Entry Type"
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
              <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            fullWidth
            required 
            type="date"
            label="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField 
            fullWidth
            margin="dense"
            required
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField 
            fullWidth
            margin="dense"
            required
            label="Specialist"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
          <Autocomplete 
            multiple 
            disableCloseOnSelect
            options={diagnoses.map((d) => d.code)} 
            renderOption={(props, option) => {
              const {key, ...optionProps } = props
              return (
                <li key={key} {...optionProps}>
                  {option} - {diagnoses.find(d => d.code === option)?.name}
                </li>
              )
            }}
            value={dcode}
            onChange={(_event, newValue) => setDcode(newValue)}
            renderInput={(params) =>(
              <TextField margin="dense" {...params} label="Diagnoses Code"/>
            )}
          />
          {moreField(type)}
          <Button variant='contained' color="primary" type="submit">
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default EntryForm