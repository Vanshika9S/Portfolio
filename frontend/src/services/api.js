import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// Intercept errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)

export const getProjects = () =>
  api.get('/projects').then((r) => r.data)

export const getSkills = () =>
  api.get('/skills').then((r) => r.data)

export const sendMessage = (message) =>
  api.post('/chat', { message }).then((r) => r.data)

export const submitContact = (data) =>
  api.post('/contact', data).then((r) => r.data)