<template>
  <v-container class="pa-6" style="max-width: 1000px">
    <v-btn
      prepend-icon="mdi-arrow-left"
      variant="text"
      to="/"
      class="mb-4"
    >Back to Products</v-btn>

    <v-progress-circular v-if="loading" indeterminate color="primary" />

    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-row v-if="product && !loading">
      <!-- Product Image -->
      <v-col cols="12" md="5">
        <v-img
          :src="product.image"
          rounded="xl"
          height="380"
          cover
        />
      </v-col>

      <!-- Product Info -->
      <v-col cols="12" md="7">
        <v-chip color="accent" size="small" label class="mb-3">{{ product.category }}</v-chip>
        <h1 class="text-h4 font-weight-bold mb-1">{{ product.name }}</h1>
        <p class="text-h6 text-medium-emphasis mb-3">{{ product.brand }}</p>

        <div class="d-flex align-center mb-4">
          <v-rating
            :model-value="product.rating"
            color="amber"
            density="compact"
            half-increments
            readonly
          />
          <span class="ml-2 text-body-2">{{ product.rating }} / 5</span>
        </div>

        <v-divider class="mb-4" />

        <p class="text-body-1 mb-4">{{ product.description }}</p>

        <div class="d-flex align-center mb-6">
          <span class="text-h4 font-weight-bold text-primary mr-4">${{ product.price }}</span>
          <v-chip :color="product.stock > 0 ? 'success' : 'error'" variant="tonal">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock' }}
          </v-chip>
        </div>

        <!-- Quantity -->
        <div class="d-flex align-center gap-3 mb-4">
          <v-btn icon="mdi-minus" variant="outlined" size="small" @click="qty > 1 && qty--" />
          <span class="text-h6 mx-2">{{ qty }}</span>
          <v-btn icon="mdi-plus" variant="outlined" size="small" @click="qty++" />
        </div>

        <v-btn
          color="primary"
          size="large"
          rounded="lg"
          prepend-icon="mdi-cart-plus"
          :disabled="product.stock === 0"
          @click="addToCart"
          class="mr-3"
        >
          Add to Cart
        </v-btn>

        <v-btn
          color="accent"
          size="large"
          rounded="lg"
          :disabled="product.stock === 0"
          to="/checkout"
          @click="addToCart"
        >
          Buy Now
        </v-btn>

        <v-snackbar v-model="snackbar" color="success" :timeout="2000">
          Added to cart!
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import ProductService from '../services/ProductService'

export default {
  name: 'ProductDetailView',
  setup() {
    const route = useRoute()
    const cartStore = useCartStore()
    const product = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const qty = ref(1)
    const snackbar = ref(false)

    const fetchProduct = async () => {
      loading.value = true
      try {
        const res = await ProductService.getById(route.params.id)
        product.value = res.data.data
      } catch {
        error.value = 'Product not found.'
      } finally {
        loading.value = false
      }
    }

    const addToCart = () => {
      for (let i = 0; i < qty.value; i++) {
        cartStore.addToCart(product.value)
      }
      snackbar.value = true
    }

    onMounted(fetchProduct)

    return { product, loading, error, qty, snackbar, addToCart }
  }
}
</script>