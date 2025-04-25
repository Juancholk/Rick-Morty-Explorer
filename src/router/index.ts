import { createRouter, createWebHistory } from 'vue-router'
import CharacterSearch from '../views/CharacterSearch.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CharacterSearch
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router