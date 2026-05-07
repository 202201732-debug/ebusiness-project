<template>
<div>

<h2>{{ product.name }}</h2>

<p>${{ product.price }}</p>

<button @click="$emit('add-to-cart', product)">
Add to Cart
</button>

</div>
</template>

<script>
export default {
props: ['product']
}
</script>