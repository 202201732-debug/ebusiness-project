<template>
  <v-container class="pa-6" style="max-width: 900px">
    <h1 class="text-h5 font-weight-bold mb-6">
      <v-icon class="mr-2">mdi-cart</v-icon>
      Shopping Cart
    </h1>

    <v-card v-if="cartStore.isEmpty" rounded="xl" class="pa-12 text-center" elevation="1">
      <v-icon size="80" color="grey-lighten-2">mdi-cart-off</v-icon>
      <h2 class="text-h6 mt-4 text-medium-emphasis">Your cart is empty</h2>
      <v-btn color="primary" to="/" class="mt-4" rounded="lg">Continue Shopping</v-btn>
    </v-card>

    <v-row v-else>
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="1">
          <v-list lines="two">
            <template v-for="(item, index) in cartStore.items" :key="item.id">
              <v-list-item>
                <template #prepend>
                  <v-img :src="item.image" width="70" height="70" rounded="lg" cover class="mr-3" />
                </template>
                <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.brand }}</v-list-item-subtitle>
                <template #append>
                  <div class="d-flex flex-column align-end gap-2">
                    <span class="text-subtitle-1 font-weight-bold text-primary">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </span>
                    <div class="d-flex align-center">
                      <v-btn icon="mdi-minus" size="x-small" variant="outlined" @click="cartStore.updateQuantity(item.id, item.quantity - 1)" />
                      <span class="mx-2">{{ item.quantity }}</span>
                      <v-btn icon="mdi-plus" size="x-small" variant="outlined" @click="cartStore.updateQuantity(item.id, item.quantity + 1)" />
                      <v-btn icon="mdi-trash-can-outline" size="x-small" color="error" variant="text" class="ml-2" @click="cartStore.removeFromCart(item.id)" />
                    </div>
                  </div>
                </template>
              </v-list-item>
              <v-divider v-if="index < cartStore.items.length - 1" />
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="1" class="pa-4">
          <h2 class="text-h6 font-weight-bold mb-4">Order Summary</h2>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2 text-medium-emphasis">Items ({{ cartStore.totalItems }})</span>
            <span class="text-body-2">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2 text-medium-emphasis">Shipping</span>
            <span class="text-body-2 text-success">Free</span>
          </div>
          <v-divider class="my-3" />
          <div class="d-flex justify-space-between mb-4">
            <span class="text-subtitle-1 font-weight-bold">Total</span>
            <span class="text-subtitle-1 font-weight-bold text-primary">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <v-btn color="primary" size="large" block rounded="lg" to="/checkout">Proceed to Checkout</v-btn>
          <v-btn variant="text" color="error" size="small" block class="mt-2" @click="cartStore.clearCart()">Clear Cart</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from '../stores/cartStore'
export default {
  name: 'CartView',
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  }
}
</script>