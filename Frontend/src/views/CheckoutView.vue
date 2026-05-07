<template>
  <v-container class="pa-6" style="max-width: 800px">
    <h1 class="text-h5 font-weight-bold mb-6">
      <v-icon class="mr-2">mdi-credit-card</v-icon>
      Checkout
    </h1>

    <v-row>
      <!-- Shipping Form -->
      <v-col cols="12" md="7">
        <v-card rounded="xl" elevation="1" class="pa-5 mb-4">
          <h2 class="text-h6 font-weight-bold mb-4">Shipping Information</h2>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.firstName" label="First Name" variant="outlined" density="comfortable" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.lastName" label="Last Name" variant="outlined" density="comfortable" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.email" label="Email" variant="outlined" density="comfortable" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.address" label="Address" variant="outlined" density="comfortable" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.city" label="City" variant="outlined" density="comfortable" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.phone" label="Phone" variant="outlined" density="comfortable" />
            </v-col>
          </v-row>
        </v-card>

        <v-card rounded="xl" elevation="1" class="pa-5">
          <h2 class="text-h6 font-weight-bold mb-4">Payment Method</h2>
          <v-radio-group v-model="paymentMethod">
            <v-radio value="card" label="Credit / Debit Card" />
            <v-radio value="cod" label="Cash on Delivery" />
          </v-radio-group>

          <template v-if="paymentMethod === 'card'">
            <v-text-field label="Card Number" variant="outlined" density="comfortable" placeholder="1234 5678 9012 3456" />
            <v-row>
              <v-col><v-text-field label="Expiry" variant="outlined" density="comfortable" placeholder="MM/YY" /></v-col>
              <v-col><v-text-field label="CVV" variant="outlined" density="comfortable" placeholder="123" /></v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" md="5">
        <v-card rounded="xl" elevation="1" class="pa-5">
          <h2 class="text-h6 font-weight-bold mb-4">Your Order</h2>

          <v-list density="compact">
            <v-list-item
              v-for="item in cartStore.items"
              :key="item.id"
              :title="item.name"
              :subtitle="`x${item.quantity}`"
            >
              <template #append>
                <span class="text-body-2 font-weight-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </template>
            </v-list-item>
          </v-list>

          <v-divider class="my-3" />

          <div class="d-flex justify-space-between mb-1">
            <span>Subtotal</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-space-between mb-1 text-success">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <v-divider class="my-2" />
          <div class="d-flex justify-space-between mb-4">
            <span class="font-weight-bold text-subtitle-1">Total</span>
            <span class="font-weight-bold text-subtitle-1 text-primary">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <v-btn
            color="primary"
            size="large"
            block
            rounded="lg"
            :loading="placing"
            @click="placeOrder"
          >
            Place Order
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success Dialog -->
    <v-dialog v-model="orderSuccess" max-width="420">
      <v-card rounded="xl" class="pa-6 text-center">
        <v-icon size="72" color="success">mdi-check-circle</v-icon>
        <h2 class="text-h5 font-weight-bold mt-3 mb-2">Order Placed!</h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Thank you for your purchase. Your order is being processed.
        </p>
        <v-btn color="primary" to="/" @click="cartStore.clearCart()">Back to Home</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

export default {
  name: 'CheckoutView',
  setup() {
    const cartStore = useCartStore()
    const placing = ref(false)
    const orderSuccess = ref(false)
    const paymentMethod = ref('card')

    const form = ref({
      firstName: '', lastName: '', email: '',
      address: '', city: '', phone: ''
    })

    const placeOrder = async () => {
      placing.value = true
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      placing.value = false
      orderSuccess.value = true
    }

    return { cartStore, form, paymentMethod, placing, orderSuccess, placeOrder }
  }
}
</script>