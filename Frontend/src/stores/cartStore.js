// src/stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(sessionStorage.getItem('cart') || '[]')
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this._saveToSession()
    },

    removeFromCart(productId) {
      this.items = this.items.filter(i => i.id !== productId)
      this._saveToSession()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
      this._saveToSession()
    },

    clearCart() {
      this.items = []
      sessionStorage.removeItem('cart')
    },

    _saveToSession() {
      sessionStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
})