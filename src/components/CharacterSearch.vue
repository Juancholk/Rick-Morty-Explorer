<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-4 elevation-4">
            <v-card-title class="text-h4 mb-4 white--text">Rick & Morty Explorer</v-card-title>
  
            <v-text-field
              v-model="searchQuery"
              label="Buscar personaje"
              placeholder="Ej: Rick Sanchez"
              outlined
              clearable
              @keyup.enter="searchCharacters"
              class="mb-4"
            ></v-text-field>
            
            <v-btn 
              color="primary" 
              block 
              @click="searchCharacters"
              :loading="loading"
            >
              Buscar
            </v-btn>
  
            <v-alert
              v-if="error"
              type="error"
              class="mt-4"
            >
              {{ error }}
            </v-alert>
  
            <v-row v-if="characters.length > 0" class="mt-4">
              <v-col
                v-for="character in characters"
                :key="character.id"
                cols="12"
                sm="6"
                md="6"
              >
                <v-card class="character-card">
                  <v-img
                    :src="character.image"
                    height="200"
                    cover
                    class="character-image"
                  ></v-img>
  
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-1 white--text">{{ character.name }}</div>
                    <div class="grey--text text-caption mb-2 d-flex align-center">
                    <span
                        class="status-dot mr-2"
                        :style="{ backgroundColor: getStatusColor(character.status) }"
                    ></span>
                    {{ character.status }} - {{ character.species }}
                    </div>
  
                    <div class="text-subtitle-2 text-grey">Last known location:</div>
                    <div class="white--text mb-2">{{ character.location.name }}</div>
  
                    <div class="text-subtitle-2 text-grey">Origin:</div>
                    <div class="white--text">{{ character.origin.name }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Alive': return 'green'
      case 'Dead': return 'red'
      default: return 'grey'
    }
  }
  
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
  
  <style scoped>
  .v-container {
    background-color: #1e1f26;
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  
  .v-card {
    background-color: #2d2f36 !important;
    color: #fff;
    border-radius: 16px;
  }
  
  .character-card {
    background-color: #383a42;
    transition: transform 0.3s ease;
    color: #fff;
    border-radius: 16px;
  }
  
  .character-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  
  .character-image {
    border-bottom: 1px solid #444;
  }
  
  .text-grey {
    color: #bbb;
  }
  .status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

  </style>
  