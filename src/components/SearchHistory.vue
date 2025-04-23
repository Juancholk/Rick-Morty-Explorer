<template>
    <v-card v-if="history.length > 0" class="mt-4">
      <v-card-title>Search History</v-card-title>
      <v-list>
        <v-list-item
          v-for="(item, index) in history"
          :key="index"
          @click="$emit('search', item)"
        >
          {{ item }}
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    history: Array
  })
  defineEmits(['search'])
  </script>
