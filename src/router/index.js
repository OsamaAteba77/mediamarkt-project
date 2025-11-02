import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const SignupView = () => import('@/views/SignupView.vue')
const ProductView = () => import('@/views/ProductView.vue')
const CartView = () => import('@/views/CartView.vue')

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignupView },
    { path: '/product/:id', component: ProductView },
    { path: '/cart', component: CartView },
  ],
})
