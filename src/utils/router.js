import { createRouter, createWebHistory } from "vue-router";
import Auth from '../components/Auth.vue'
import Order from '../components/Order.vue'
import Approval from '../components/Approval.vue'
import Dashboard from '../components/Dashboard.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'auth', component: Auth},
    {path: '/order', name: 'order', component: Order},
    {path: '/approval', name: 'approval', component: Approval},
    {path: '/dashboard', name: 'dashboard', component: Dashboard},
  ],
  linkActiveClass: 'underline underline-offset-4'
});