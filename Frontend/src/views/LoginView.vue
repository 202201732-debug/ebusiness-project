<template>
  <v-container class="fill-height" style="max-width: 460px">
    <v-row align="center" justify="center" class="w-100">
      <v-col cols="12">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="48" color="primary">mdi-storefront</v-icon>
            <h1 class="text-h5 font-weight-bold mt-2">Welcome Back</h1>
            <p class="text-body-2 text-medium-emphasis">Sign in to your TechStore account</p>
          </div>

          <v-alert v-if="error" type="error" class="mb-4" density="compact">{{ error }}</v-alert>

          <v-text-field
            v-model="email"
            label="Email Address"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <v-text-field
            v-model="password"
            label="Password"
            :type="showPass ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPass = !showPass"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            @keyup.enter="login"
          />

          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            :loading="loading"
            @click="login"
          >
            Sign In
          </v-btn>

          <v-divider class="my-4" />

          <p class="text-center text-body-2">
            Don't have an account?
            <router-link to="/register" class="text-primary font-weight-bold">Register here</router-link>
          </p>

          <v-card class="mt-4 pa-3" color="blue-lighten-5" rounded="lg" elevation="0">
            <p class="text-caption text-medium-emphasis mb-1 font-weight-bold">Demo credentials:</p>
            <p class="text-caption">Email: admin@store.com</p>
            <p class="text-caption">Password: admin123</p>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import AuthService from '../services/AuthService'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const showPass = ref(false)

    const login = async () => {
      error.value = ''
      if (!email.value || !password.value) {
        error.value = 'Please fill in all fields.'
        return
      }
      loading.value = true
      try {
        const res = await AuthService.login(email.value, password.value)
        authStore.setAuth(res.data.token, res.data.user)
        router.push('/')
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return { email, password, loading, error, showPass, login }
  }
}
</script>