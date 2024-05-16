import { createRouter, createWebHistory } from "vue-router";
import Auth from '../components/Auth.vue'
import Order from '../components/Order.vue'
import Approval from '../components/Approval.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/auths/Login.vue'
import Register from '../components/auths/Register.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'auth', component: Auth},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/order', name: 'order', component: Order},
    {path: '/approval', name: 'approval', component: Approval},
    {path: '/dashboard', name: 'dashboard', component: Dashboard},
  ],
  linkActiveClass: 'bg-gray-100 dark:bg-gray-700'
});