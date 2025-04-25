<template>
  <v-card variant="outlined" class="pa-4">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      Recent Searches
    </v-card-title>

    <v-list density="compact">
      <v-list-item
        v-for="(item, index) in history"
        :key="index"
        @click="emit('search', item)"
      >
        <template v-slot:prepend>
          <v-avatar size="40" class="mr-3">
            <v-img :src="item.image" :alt="item.name"></v-img>
          </v-avatar>
        </template>
        
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.species }}</v-list-item-subtitle>
        
        <template v-slot:append>
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        color="error"
        size="small"
        @click="emit('clear')"
      >
        Clear History
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Character } from '../types/Character'

defineProps({
  history: {
    type: Array as PropType<Character[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'search', character: Character): void
  (e: 'clear'): void
}>()

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'green'
    case 'dead':
      return 'red'
    default:
      return 'grey'
  }
}
</script>
