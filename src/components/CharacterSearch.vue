<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title class="text-h4 mb-4">Rick & Morty Explorer</v-card-title>

            <v-text-field
              v-model="searchQuery"
              label="Buscar personaje"
              placeholder="Ej: Rick Sanchez"
              outlined
              clearable
              @keyup.enter="searchCharacters"
            ></v-text-field>
            
            <v-btn 
              color="primary" 
              block 
              @click="searchCharacters"
              :loading="loading"
            >
              Buscar
            </v-btn>
  
            <!-- Mensaje de error -->
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
            >
              {{ error }}
            </v-alert>
  
            <!-- Resultados -->
            <v-list v-if="characters.length > 0" class="mt-4">
              <v-list-item
                v-for="character in characters"
                :key="character.id"
              >
                <v-avatar size="80" class="mr-4">
                  <v-img :src="character.image" :alt="character.name"></v-img>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ character.name }}</v-list-item-title>
                  <v-list-item-subtitle>Status: {{ character.status }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Especie: {{ character.species }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const searchQuery = ref('')
  const characters = ref([])
  const loading = ref(false)
  const error = ref('')
  
  const searchCharacters = async () => {
    if (!searchQuery.value.trim()) {
      error.value = 'Ingresa un nombre para buscar'
      return
    }
  
    loading.value = true
    error.value = ''
    characters.value = []
  
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${searchQuery.value}`
      )
      characters.value = response.data.results
    } catch (err) {
      error.value = 'Personaje no encontrado'
    } finally {
      loading.value = false
    }
  }
  </script>