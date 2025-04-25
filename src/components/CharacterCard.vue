
<template>
  <v-card
    class="character-card"
    :hover="true"
    elevation="2"
    @click="goToCharacter(character.id)"
  >
    <v-img
      :src="character.image"
      :alt="character.name"
      cover
      height="200"
      class="character-image"
    ></v-img>

    <v-card-text class="character-info">
      <div class="d-flex align-center mb-2">
        <v-chip
          :color="getStatusColor(character.status)"
          size="small"
          class="mr-2"
        >
          {{ character.status }}
        </v-chip>
        <span class="text-subtitle-1 font-weight-bold">{{ character.name }}</span>
      </div>

      <v-divider class="my-2"></v-divider>

      <div class="character-details">
        <div class="detail-item">
          <v-icon icon="mdi-account" size="small" class="mr-1"></v-icon>
          <span>{{ character.species }}</span>
        </div>

        <div class="detail-item">
          <v-icon icon="mdi-gender-male-female" size="small" class="mr-1"></v-icon>
          <span>{{ character.gender }}</span>
        </div>

        <div class="detail-item">
          <v-icon icon="mdi-map-marker" size="small" class="mr-1"></v-icon>
          <span>{{ character.location.name }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'alive': return 'success'
    case 'dead': return 'error'
    default: return 'grey'
  }
}

const goToCharacter = (id) => {
  router.push({ name: 'character', params: { id } })
}
</script>

<style scoped>
.character-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
}

.character-image {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.character-info {
  padding: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 0.875rem;
}
</style>