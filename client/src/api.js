
import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api' })
api.interceptors.request.use(cfg=>{
  const token = localStorage.getItem('eduverse_token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
export default api
// Usage: api.get('/courses'), api.post('/auth/login'), etc.
