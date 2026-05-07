import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
})

export const submitOrder = (data) => api.post('/api/orders', data)
export const fetchStats = () => api.get('/api/stats')
