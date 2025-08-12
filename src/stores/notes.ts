import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notesApi, type Note, type CreateNoteRequest, type UpdateNoteRequest } from '../services/api'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchTerm = ref('')
  const sortBy = ref<'title' | 'createdAt' | 'updatedAt'>('updatedAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const filteredAndSortedNotes = computed(() => {
    let filtered = notes.value

    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()
      filtered = notes.value.filter(
        note =>
          note.title.toLowerCase().includes(term) ||
          note.content.toLowerCase().includes(term)
      )
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortBy.value]
      const bValue = b[sortBy.value]
      
      if (sortBy.value === 'title') {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder.value === 'asc' ? comparison : -comparison
      } else {
        const aDate = new Date(aValue)
        const bDate = new Date(bValue)
        const comparison = aDate.getTime() - bDate.getTime()
        return sortOrder.value === 'asc' ? comparison : -comparison
      }
    })
  })

  const fetchNotes = async () => {
    loading.value = true
    error.value = null
    try {
      notes.value = await notesApi.getAllNotes()
    } catch (err) {
      error.value = 'Failed to fetch notes'
      console.error('Error fetching notes:', err)
    } finally {
      loading.value = false
    }
  }

  const createNote = async (noteData: CreateNoteRequest) => {
    loading.value = true
    error.value = null
    try {
      const newNote = await notesApi.createNote(noteData)
      notes.value.unshift(newNote)
      return newNote
    } catch (err) {
      error.value = 'Failed to create note'
      console.error('Error creating note:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateNote = async (id: number, noteData: UpdateNoteRequest) => {
    loading.value = true
    error.value = null
    try {
      const updatedNote = await notesApi.updateNote(id, noteData)
      const index = notes.value.findIndex(note => note.id === id)
      if (index !== -1) {
        notes.value[index] = updatedNote
      }
      return updatedNote
    } catch (err) {
      error.value = 'Failed to update note'
      console.error('Error updating note:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteNote = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await notesApi.deleteNote(id)
      notes.value = notes.value.filter(note => note.id !== id)
    } catch (err) {
      error.value = 'Failed to delete note'
      console.error('Error deleting note:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setSearchTerm = (term: string) => {
    searchTerm.value = term
  }

  const setSorting = (by: 'title' | 'createdAt' | 'updatedAt', order: 'asc' | 'desc') => {
    sortBy.value = by
    sortOrder.value = order
  }

  const clearError = () => {
    error.value = null
  }

  return {
    notes,
    loading,
    error,
    searchTerm,
    sortBy,
    sortOrder,
    filteredAndSortedNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setSearchTerm,
    setSorting,
    clearError,
  }
})
