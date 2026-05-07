<template>
  <v-container class="fill-height" style="max-width: 460px">
    <v-row align="center" justify="center" class="w-100">
      <v-col cols="12">
        <v-card rounded="xl" elevation="4" class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="48" color="primary">mdi-account-plus</v-icon>
            <h1 class="text-h5 font-weight-bold mt-2">Create Account</h1>
            <p class="text-body-2 text-medium-emphasis">Join TechStore today</p>
          </div>

          <v-alert v-if="error" type="error" class="mb-4" density="compact">{{ error }}</v-alert>
          <v-alert v-if="success" type="success" class="mb-4" density="compact">{{ success }}</v-alert>

          <v-text-field v-model="name" label="Full Name" prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="email" label="Email Address" type="email" prepend-inner-icon="mdi-email-outline" variant="outlined" density="comfortable" class="mb-3" />
          <v-text-field v-model="password" label="Password (min 6 characters)" :type="showPass ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPass = !showPass" variant="outlined" density="comfortable" class="mb-4" />

          <v-btn color="primary" size="large" block rounded="lg" :loading="loading" @click="register">
            Create Account
          </v-btn>

          <v-divider class="my-4" />

          <p class="text-center text-body-2">
            Already have an account?
            <router-link to="/login" class="text-primary font-weight-bold">Sign in</router-link>
          </p>
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
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')
    const showPass = ref(false)

    const register = async () => {
      error.value = ''
      success.value = ''
      if (!name.value || !email.value || !password.value) {
        error.value = 'Please fill in all fields.'
        return
      }
      loading.value = true
      try {
        const res = await AuthService.register(name.value, email.value, password.value)
        authStore.setAuth(res.data.token, res.data.user)
        success.value = 'Account created! Redirecting...'
        setTimeout(() => router.push('/'), 1500)
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed.'
      } finally {
        loading.value = false
      }
    }

    return { name, email, password, loading, error, success, showPass, register }
  }
}
</script>