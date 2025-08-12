<script setup lang="ts">
import type { Note } from '../services/api'

const props = defineProps({
    note: {
        type: Object as () => Note,
        required: true
    }
})

const emit = defineEmits({
    edit: (note: Note) => true,
    delete: (note: Note) => true
})

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ note.title }}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ note.content || 'No content' }}</p>
        <div class="flex justify-between items-center text-xs text-gray-500">
            <span>{{ formatDate(note.updatedAt) }}</span>
            <div class="flex gap-2">
                <button @click.stop="$emit('edit', note)" class="text-blue-600 hover:text-blue-800">
                    Edit
                </button>
                <button @click.stop="$emit('delete', note)" class="text-red-600 hover:text-red-800">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>


