// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 1. Import the HomeView file you just created
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // The main homepage path
      name: 'home',
      component: HomeView, // 2. Link the path to the component
    },
    // All other pages (Login, Cart, Product) will be added here
  ],
})

export default router
