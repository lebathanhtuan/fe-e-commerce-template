import axios from 'axios'

const END_POINT = 'http://localhost:3000'

export const getAPI = (path) => axios.get(`${END_POINT}${path}`)
export const postAPI = (path) => axios.get(`${END_POINT}${path}`)
export const putAPI = (path) => axios.get(`${END_POINT}${path}`)
export const patchAPI = (path) => axios.get(`${END_POINT}${path}`)
export const deleteAPI = (path) => axios.get(`${END_POINT}${path}`)
