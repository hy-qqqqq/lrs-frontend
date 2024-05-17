import './assets/vue.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './utils/router.js' 
import { filter } from './utils/filter.js' 

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  treeShake: true,
  icons: {
    iconfont: 'mdi',
  }
})

// App
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.config.globalProperties.$filters = filter;

app.mount('#app')
