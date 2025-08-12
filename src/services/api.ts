import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5228/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  userId: number
}

export interface CreateNoteRequest {
  title: string
  content: string
}

export interface UpdateNoteRequest {
  title: string
  content: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Authentication API
export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
}

// Notes API (unchanged)
export const notesApi = {
  async getAllNotes(search?: string): Promise<Note[]> {
    const response = await api.get('/notes', {
      params: search ? { search } : undefined
    })
    return response.data
  },

  async getNoteById(id: number): Promise<Note> {
    const response = await api.get(`/notes/${id}`)
    return response.data
  },

  async createNote(note: CreateNoteRequest): Promise<Note> {
    const response = await api.post('/notes', note)
    return response.data
  },

  async updateNote(id: number, note: UpdateNoteRequest): Promise<Note> {
    const response = await api.put(`/notes/${id}`, note)
    return response.data
  },

  async deleteNote(id: number): Promise<void> {
    await api.delete(`/notes/${id}`)
  },
}
