
import React, { useEffect, useState } from "react"
import diaryServices from "./diaryServices"
import {Visibility, type newDiary, type Diary, Weather} from "./types"

interface WeatherOption {
  value: Weather;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((w) => ({
  value: w, label: w.toString()
}))

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map((v) => ({
  value: v, label: v.toString()
}))

const App = () => {
  
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [comment, setComment] = useState('')
  const [notif, setNotif] = useState([])

  useEffect(() => {
    diaryServices.getAll().then(res => setDiaries(res))
  }, [])

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary: newDiary = {
      date,
      visibility,
      weather,
      comment
    }

    diaryServices.create(newDiary).then(res => setDiaries(diaries.concat(res)))
      .catch(error => {
        setNotif(error.response.data.error)
        setTimeout(() => {
          setNotif([])
        }, 5000)
      })
    setDate('')
    setVisibility('great')
    setWeather('sunny')
    setComment('')
  }

  return(
    <div>
      <h2>Add new entry</h2>
      {notif.map((a: any) => <p>{a.message}</p>)}
      <form onSubmit={addDiary}>
        <div>
          <label>date</label>
          <input type="date" value={date}onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <label>visibility: </label>
          {visibilityOptions.map((v) => (
            <>
              <input type="radio" name="visibility" onChange={() => setVisibility(v.value)} />
              <label>{v.label}</label>
            </>
          ))}
        </div>
        <div>
          <label>weather: </label>
          {weatherOptions.map((w) => (
            <>
              <input type="radio" name="weather" onChange={() => setWeather(w.value)} />
              <label>{w.label}</label>
            </>
          ))}
        </div>
        <div>
          <label>comment</label>
          <input value={comment} onChange={(event) => setComment(event.target.value)}/>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h4>{d.date}</h4>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </div>
  )
}

export default App
