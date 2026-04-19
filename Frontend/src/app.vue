<template>
<nav>
<router-link to="/">Home</router-link>
<router-link to="/checkout">Checkout</router-link>

<button @click="login">
Login
</button>
</nav>

<router-view />
</template>

<script>
export default {
methods: {
login() {
localStorage.setItem('token', '12345');
}
}
}
</script>