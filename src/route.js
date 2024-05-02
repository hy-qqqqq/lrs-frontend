import { createRouter, createWebHistory } from "vue-router";
import Auth from './components/Auth.vue'
import Order from './components/Order.vue'
import Dashboard from './components/Dashboard.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: Auth},
    {path: '/order', component: Order},
    {path: '/dashboard', component: Dashboard},
  ]
});