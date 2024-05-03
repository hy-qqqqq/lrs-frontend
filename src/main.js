import './assets/vue.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './route.js' 
import { filter } from './utils/filter.js' 
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$filters = filter;

app.mount('#app')
