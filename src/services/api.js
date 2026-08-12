import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/* ── Interceptor: attach token ────────────────────────────────────────── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sipma_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* ── Interceptor: handle 401 ──────────────────────────────────────────── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('sipma_token')
      localStorage.removeItem('sipma_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/* ============================ Auth ============================ */

export async function loginUser(credentials) {
  const { data } = await api.post('/login', credentials)
  return data
}

export async function registerUser(payload) {
  const { data } = await api.post('/register', payload)
  return data
}

export async function logoutUser() {
  const { data } = await api.post('/logout')
  return data
}

export async function getMe() {
  const { data } = await api.get('/me')
  return data
}

export async function refreshToken() {
  const { data } = await api.post('/refresh')
  return data
}

/* ============================ Dashboard ============================ */

export async function getDashboardStats() {
  const { data } = await api.get('/dashboard/stats')
  return data
}

/* ============================ Events ============================ */

export async function getEvents() {
  const { data } = await api.get('/events')
  return Array.isArray(data) ? data : (data.data || [])
}

export async function getEventById(id) {
  const { data } = await api.get(`/events/${id}`)
  return data
}

export async function createEvent(payload) {
  const { data } = await api.post('/events', payload)
  return data
}

export async function updateEvent(id, payload) {
  const { data } = await api.put(`/events/${id}`, payload)
  return data
}

export async function deleteEvent(id) {
  const { data } = await api.delete(`/events/${id}`)
  return data
}

export async function updateEventStatus(id, status) {
  const { data } = await api.patch(`/events/${id}/status`, { status })
  return data
}

export async function checkEventConflict(payload) {
  const { data } = await api.post('/events/check-conflict', payload)
  return data
}

/* ============================ Divisions ============================ */

export async function getDivisions() {
  const { data } = await api.get('/divisions')
  return Array.isArray(data) ? data : (data.data || [])
}

export async function getDivisionById(id) {
  const { data } = await api.get(`/divisions/${id}`)
  return data
}

export async function createDivision(payload) {
  const { data } = await api.post('/divisions', payload)
  return data
}

export async function updateDivision(id, payload) {
  const { data } = await api.put(`/divisions/${id}`, payload)
  return data
}

export async function deleteDivision(id) {
  const { data } = await api.delete(`/divisions/${id}`)
  return data
}

export async function addWorkProgram(divisionId, payload) {
  const { data } = await api.post(`/divisions/${divisionId}/work-programs`, payload)
  return data
}

export async function updateWorkProgram(id, payload) {
  const { data } = await api.put(`/work-programs/${id}`, payload)
  return data
}

export async function deleteWorkProgram(id) {
  const { data } = await api.delete(`/work-programs/${id}`)
  return data
}

export async function addDivisionMember(divisionId, payload) {
  const { data } = await api.post(`/divisions/${divisionId}/members`, payload)
  return data
}

export async function updateDivisionMember(id, payload) {
  const { data } = await api.put(`/division-members/${id}`, payload)
  return data
}

export async function deleteDivisionMember(id) {
  const { data } = await api.delete(`/division-members/${id}`)
  return data
}

export async function addGallery(divisionId, payload) {
  const { data } = await api.post(`/divisions/${divisionId}/galleries`, payload)
  return data
}

/* ============================ Work Programs (Public) ============================ */

export async function getWorkPrograms(params = {}) {
  const { data } = await api.get('/work-programs', { params })
  return Array.isArray(data) ? data : (data.data || [])
}

export async function getWorkProgramById(id) {
  const { data } = await api.get(`/work-programs/${id}`)
  return data
}

export async function getWorkProgramsByDivision(divisionId, params = {}) {
  const { data } = await api.get(`/divisions/${divisionId}/work-programs`, { params })
  return Array.isArray(data) ? data : (data.data || [])
}

/* ============================ Users (Admin) ============================ */

export async function getUsers() {
  const { data } = await api.get('/users')
  return Array.isArray(data) ? data : (data.data || [])
}

export async function getUserById(id) {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export async function createUser(payload) {
  const { data } = await api.post('/users', payload)
  return data
}

export async function updateUser(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`)
  return data
}

/* ============================ Helpers ============================ */

export function formatTanggal(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTanggalShort(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default api
