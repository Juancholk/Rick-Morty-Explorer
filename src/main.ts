import { createApp } from 'vue'
import App from './App.vue'

// Importaciones de plugins
import vuetify from './plugins/vuetify'


// Crea y monta la app
const app = createApp(App)

app.use(vuetify)
app.mount('#app')