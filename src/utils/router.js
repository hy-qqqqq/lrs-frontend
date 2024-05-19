import { createRouter, createWebHistory } from "vue-router";
import Order from '../components/Order.vue';
import Dashboard from '../components/Dashboard.vue';
import Login from '../components/auths/Login.vue';
import Register from '../components/auths/Register.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/', alias: '/order', name: 'order', component: Order, meta: { requiresAuth: true } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  ],
  linkActiveClass: 'bg-gray-100 dark:bg-gray-700'
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
