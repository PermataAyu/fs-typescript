import { Button, Typography } from "@mui/material"
import {MaleOutlined, FemaleOutlined, HelpOutlineOutlined} from "@mui/icons-material"
import { Diagnosis, EntryNoId, type Patient } from "../types"
import { useEffect, useState } from "react"
import patientService from "../services/patients"
import diagnosisService from "../services/diagnoses"
import EntryDetails from "./EntryDetails"
import EntryForm from "./EntryForm"
import axios from "axios"


const PatientData = ({id}: {id: string | undefined}) => {
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [error, setError] = useState<string>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchPatientList = async () => {
      const p = await patientService.getById(id);
      setPatient(p);
    };

    const fetchDiagnosesList = async () => {
      const d = await diagnosisService.getAll()
      setDiagnoses(d)
    }

    void fetchPatientList();
    void fetchDiagnosesList();
  }, [])

  const openModal = () => setModalOpen(true)

  const closeModal = () => {
    setModalOpen(false)
    setError('')
  }

  const gender = (gender: string) => {
    if (gender === "male") {
      return (<MaleOutlined />)
    } else if (gender === "female") {
      return (<FemaleOutlined />)
    } else {
      return (<HelpOutlineOutlined />)
    }
  }

  if (!patient) {
    return (
      <Typography>No Patient Found</Typography>
    )
  }

  const submitNewEntry = async(entry: EntryNoId) => {
    try {
      const newEntry = await patientService.createEntry(patient.id, entry)
      const updatePatient = {
        ...patient, 
        entries: patient.entries.concat(newEntry)
      }
      setPatient(updatePatient)
      setModalOpen(false)
    } catch (e:unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return (
    <div>
      <Typography variant="h5">{patient.name} {gender(patient.gender)}</Typography> 
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}  </Typography>
      <Typography>date of birth: {patient.dateOfBirth} </Typography>
      <Typography sx={{fontWeight: "bold"}} variant="h6">entries</Typography>
      {patient.entries.map(e => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses}/>
      ))}
      <Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>
      <EntryForm 
        modalOpen={modalOpen} 
        onClose={closeModal} 
        diagnoses={diagnoses} 
        onSubmit={submitNewEntry} 
        error={error}/>
    </div>
  )
}

export default PatientData