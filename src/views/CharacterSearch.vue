<template>
  <v-container class="character-search">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="4">
          <v-card-title class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold">Rick and Morty Character Search</h1>
          </v-card-title>

          
          <div class="search-section mb-6">
            <v-text-field
              v-model="searchQuery"
              label="Search for character"
              variant="outlined"
              clearable
              hide-details="auto"
              prepend-inner-icon="mdi-magnify"
              @keyup.enter="searchCharacters"
              class="mb-4"
            ></v-text-field>

            <v-btn
              color="primary"
              size="large"
              block
              :loading="loading"
              @click="searchCharacters"
            >
              Search
            </v-btn>
          </div>

          
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mb-6"
          >
            {{ error }}
          </v-alert>

          
          <SearchHistory
            v-if="searchHistory.length > 0"
            :history="searchHistory"
            @search="searchFromHistory"
            @clear="clearHistory"
            class="mb-6"
          />

          
          <v-row v-if="characters.length > 0" class="results-grid">
            <v-col
              v-for="character in characters"
              :key="character.id"
              cols="12"
              sm="6"
              md="4"
            >
              <CharacterCard :character="character" />
            </v-col>
          </v-row>

          
          <v-alert
            v-if="searched && characters.length === 0 && !error"
            type="info"
            variant="tonal"
          >
            No characters found matching your search.
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchHistory from '../components/SearchHistory.vue'
import CharacterCard from '../components/CharacterCard.vue'
import type { Character } from '../types/Character'


const searchQuery = ref('')
const characters = ref<Character[]>([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)
const searchHistory = ref<Character[]>([])


onMounted(() => {
  const savedHistory = localStorage.getItem('rickMortyHistory')
  if (savedHistory) {
    try {
      const parsed = JSON.parse(savedHistory)
      if (Array.isArray(parsed)) {
        searchHistory.value = parsed.filter(item => typeof item === 'object' && item.id)
      }
    } catch (e) {
      console.error('Error parsing history', e)
    }
  }
})


const searchCharacters = async () => {
  if (!searchQuery.value.trim()) {
    error.value = 'Please enter a character name'
    return
  }

  loading.value = true
  error.value = ''
  characters.value = []
  searched.value = true

  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery.value.trim())}`
    )
    
    if (response.data.results?.length > 0) {
      characters.value = response.data.results
      addToHistory(response.data.results[0])
    } else {
      error.value = 'Character not found'
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.status === 404 
        ? 'Character not found' 
        : 'Error searching character'
    } else {
      error.value = 'Unexpected error'
    }
    characters.value = []
  } finally {
    loading.value = false
  }
}

// Historial
const addToHistory = (character: Character) => {
  searchHistory.value = [
    character,
    ...searchHistory.value.filter(c => c.id !== character.id)
  ].slice(0, 3)

  localStorage.setItem('rickMortyHistory', JSON.stringify(searchHistory.value))
}

const searchFromHistory = (character: Character) => {
  searchQuery.value = character.name
  searchCharacters()
}

const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('rickMortyHistory')
}
</script>

<style scoped>
.search-section {
  background-color: rgba(var(--v-theme-primary), 0.05);
  padding: 24px;
  border-radius: 12px;
}

.results-grid {
  margin-top: 16px;
}

.character-search {
  padding-top: 32px;
  padding-bottom: 32px;
}
</style>
