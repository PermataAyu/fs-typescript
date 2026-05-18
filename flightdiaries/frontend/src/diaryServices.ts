import axios from "axios"
import type { Diary, newDiary } from "./types"

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = () => {
  return axios.get<Diary[]>(baseUrl).then(res => res.data)
}

const create = (object: newDiary) => {
  return axios.post<Diary>(baseUrl, object).then(res => res.data)
}

export default {getAll, create}