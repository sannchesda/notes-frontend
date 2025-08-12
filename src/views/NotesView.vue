<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Notes</h1>
            <p class="text-sm text-gray-600 mt-1">Welcome back, {{ authStore.userFullName }}!</p>
          </div>
          <div class="flex items-center gap-4">
            <button @click="showCreateModal = true"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              New Note
            </button>
            <button @click="handleLogout"
              class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Sort Controls -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input v-model="notesStore.searchTerm" type="text" placeholder="Search notes..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>

        <!-- Sort Controls -->
        <div class="flex gap-2">
          <select v-model="notesStore.sortBy"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="updatedAt">Last Updated</option>
            <option value="createdAt">Created Date</option>
            <option value="title">Title</option>
          </select>
          <button @click="toggleSortOrder"
            class="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {{ notesStore.sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="notesStore.error" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ notesStore.error }}
        <button @click="notesStore.clearError" class="float-right font-bold">×</button>
      </div>

      <!-- Loading State -->
      <div v-if="notesStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading notes...</p>
      </div>

      <!-- Notes Grid -->
      <div v-else-if="notesStore.filteredAndSortedNotes.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="note in notesStore.filteredAndSortedNotes" :key="note.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          @click="openNote(note)">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 truncate">{{ note.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ note.content || 'No content' }}</p>
          <div class="flex justify-between items-center text-xs text-gray-500">
            <span>{{ formatDate(note.updatedAt) }}</span>
            <div class="flex gap-2">
              <button @click.stop="editNote(note)" class="text-blue-600 hover:text-blue-800">
                Edit
              </button>
              <button @click.stop="confirmDelete(note)" class="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No notes found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new note.</p>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ showCreateModal ? 'Create New Note' : 'Edit Note' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveNote">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input id="title" v-model="formData.title" type="text" required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter note title..." />
            </div>

            <div class="mb-6">
              <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea id="content" v-model="formData.content" rows="10"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter note content..."></textarea>
            </div>

            <div class="flex gap-3 justify-end">
              <button type="button" @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="!formData.title.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ showCreateModal ? 'Create Note' : 'Update Note' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Note Modal -->
    <div v-if="showViewModal && selectedNote"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedNote.title }}</h1>
              <div class="flex gap-4 text-sm text-gray-500">
                <span>Created: {{ formatDate(selectedNote.createdAt) }}</span>
                <span>Updated: {{ formatDate(selectedNote.updatedAt) }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="editNote(selectedNote)" class="text-blue-600 hover:text-blue-800 p-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </button>
              <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600 p-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="prose max-w-none">
            <div class="whitespace-pre-wrap text-gray-700">{{ selectedNote.content || 'No content' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && noteToDelete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 6.5c-.77.833-.192 2.5 1.732 2.5z">
              </path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Delete Note</h3>
          </div>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete "{{ noteToDelete.title }}"? This action cannot be undone.
          </p>
          <div class="flex gap-3 justify-end">
            <button @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="deleteNote" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useNotesStore } from '../stores/notes'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const notesStore = useNotesStore()
const authStore = useAuthStore()
const router = useRouter()

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)

// Selected note for viewing/editing/deleting
const selectedNote = ref<any | null>(null)
const noteToDelete = ref<any | null>(null)

// Form data
const formData = reactive({
  title: '',
  content: ''
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const toggleSortOrder = () => {
  notesStore.setSorting(notesStore.sortBy, notesStore.sortOrder === 'asc' ? 'desc' : 'asc')
}

const openNote = (note: any) => {
  selectedNote.value = note
  showViewModal.value = true
}

const editNote = (note: any) => {
  selectedNote.value = note
  formData.title = note.title
  formData.content = note.content
  showViewModal.value = false
  showEditModal.value = true
}

const confirmDelete = (note: any) => {
  noteToDelete.value = note
  showDeleteModal.value = true
}

const deleteNote = async () => {
  if (noteToDelete.value) {
    try {
      await notesStore.deleteNote(noteToDelete.value.id)
      showDeleteModal.value = false
      noteToDelete.value = null
    } catch (error) {
      // Error is handled in the store
    }
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedNote.value = null
  formData.title = ''
  formData.content = ''
}

const saveNote = async () => {
  try {
    if (showCreateModal.value) {
      await notesStore.createNote({
        title: formData.title.trim(),
        content: formData.content.trim()
      })
    } else if (showEditModal.value && selectedNote.value) {
      await notesStore.updateNote(selectedNote.value.id, {
        title: formData.title.trim(),
        content: formData.content.trim()
      })
    }
    closeModal()
  } catch (error) {
    // Error is handled in the store
  }
}

// Load notes on component mount
onMounted(() => {
  notesStore.fetchNotes()
})
</script>

