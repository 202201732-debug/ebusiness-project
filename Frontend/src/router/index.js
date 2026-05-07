// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/cart', name: 'Cart', component: CartView },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    meta: { requiresAuth: true }   // Protected route
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard — Lab 06 requirement
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router