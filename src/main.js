import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/variables.css'
import './assets/styles/login.css'
import './assets/styles/catalog.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
