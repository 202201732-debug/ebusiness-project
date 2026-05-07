<template>
<div>

<h1>Mobile Store</h1>

<div v-for="product in products" :key="product._id">

<ProductCard
:product="product"
@add-to-cart="addToCart"
/>

</div>

</div>
</template>

<script>
import ProductService from '../services/ProductService'
import ProductCard from '../components/ProductCard.vue'

export default {

components: {
ProductCard
},

data() {
return {
products: []
}
},

async mounted() {

const res = await ProductService.getProducts()

this.products = res.data

},

methods: {

addToCart(product) {
console.log("Added:", product)
}

}

}
</script>