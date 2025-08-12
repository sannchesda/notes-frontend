<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Note } from '../services/api'

const props = defineProps({
    note: {
        type: Object as () => Note,
        required: false
    },
    isEdit: {
        type: Boolean,
        required: false
    }
})

const emit = defineEmits({
    close: () => true,
    save: (data: { title: string; content: string }) => true
})

const form = reactive({
    title: '',
    content: ''
})

// Initialize form when note prop changes
watch(() => props.note, (note) => {
    if (note) {
        form.title = note.title
        form.content = note.content
    } else {
        form.title = ''
        form.content = ''
    }
}, { immediate: true })

const handleSubmit = () => {
    emit('save', {
        title: form.title.trim(),
        content: form.content.trim()
    })
}
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-gray-900">
                        {{ isEdit ? 'Edit Note' : 'Create New Note' }}
                    </h2>
                    <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input id="title" v-model="form.title" type="text" required
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter note title..." />
                    </div>

                    <div class="mb-6">
                        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea id="content" v-model="form.content" rows="10"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter note content..."></textarea>
                    </div>

                    <div class="flex gap-3 justify-end">
                        <button type="button" @click="$emit('close')"
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" :disabled="!form.title.trim()"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isEdit ? 'Update Note' : 'Create Note' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


