import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 15000,
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)

export const getProjects = () => api.get('/projects').then((r) => r.data)
export const addProject = (data) => api.post('/projects', data).then((r) => r.data)
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data)

export const getSkills = () => api.get('/skills').then((r) => r.data)

export const sendMessage = (message) => api.post('/chat', { message }).then((r) => r.data)

export const submitContact = (data) => api.post('/contact', data).then((r) => r.data)

export const getIdeas = () => api.get('/ideas').then((r) => r.data)
export const submitIdea = (data) => api.post('/ideas', data).then((r) => r.data)
export const addMyIdea = (data) => api.post('/ideas/admin', data).then((r) => r.data)