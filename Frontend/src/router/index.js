import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
{
path: '/',
component: HomeView
},
{
path: '/checkout',
component: CheckoutView,
meta: { requiresAuth: true }
}
]

const router = createRouter({
history: createWebHistory(),
routes
})

router.beforeEach((to, from, next) => {

const token = localStorage.getItem('token');

if (to.meta.requiresAuth && !token) {
next('/');
} else {
next();
}

})

export default router