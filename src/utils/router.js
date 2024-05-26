import { createRouter, createWebHistory } from 'vue-router'
import { toast } from 'vue3-toastify'
import Order from '../components/Order.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import NotFound from '../components/NotFound.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/', alias: '/order', name: 'order', component: Order, meta: { requiresAuth: true } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
  linkActiveClass: 'bg-blue-100 text-primary'
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    if (to.fullPath!=='/') {
      toast.info('Please login again')
      setTimeout(() => {next({ name: 'login' })}, 3000)
    }
    else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
});
