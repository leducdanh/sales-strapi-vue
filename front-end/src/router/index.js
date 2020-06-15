import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TemplataLayout from "../views/TemplataLayout.vue";
import ProductByCat from '../views/ProductByCat.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: TemplataLayout,
    redirect: "/",
    children: [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
    {
        path: 'cat/:alias',
        name: 'ProductByCat',
        component: ProductByCat
    },
    {
        path: 'product-detail/:name',
        name: 'ProductDetail',
        component: () => import('../views/ProductDetail.vue')
    },
    {
        path: 'cart',
        name: 'Cart',
        component: Cart
    }
	]
  },
]

const router = new VueRouter({
  routes
})

export default router
