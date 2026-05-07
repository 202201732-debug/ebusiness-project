<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title>
        <router-link to="/" style="text-decoration: none; color: white; font-weight: 700; font-size: 1.2rem;">
          ⚡ TechStore
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <v-btn to="/" variant="text" color="white">Home</v-btn>

      <v-btn to="/cart" variant="text" color="white">
        <v-badge :content="cartStore.totalItems" color="accent" v-if="cartStore.totalItems > 0">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>

      <template v-if="authStore.isLoggedIn">
        <v-btn variant="text" color="white">
          <v-icon start>mdi-account</v-icon>
          {{ authStore.user?.name }}
        </v-btn>
        <v-btn @click="logout" variant="outlined" color="white" size="small">Logout</v-btn>
      </template>

      <template v-else>
        <v-btn to="/login" variant="text" color="white">Login</v-btn>
        <v-btn to="/register" variant="outlined" color="white" size="small">Register</v-btn>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" class="text-center text-white py-3">
      © 2026 TechStore — EC 385 E-Business Project
    </v-footer>
  </v-app>
</template>

<script>
import { useCartStore } from './stores/cartStore'
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    return { cartStore, authStore, logout }
  }
}
</script>