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
        path: 'search/',
        name: 'Search',
        component: () => import('../views/Search.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: () => import('../views/Wishlist.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
