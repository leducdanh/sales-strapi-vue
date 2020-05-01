<template>
<router-link :to="`/product-detail/${alias}`">
  <div class="col-sm-4">
    <div class="product-image-wrapper">
      <div class="single-products">
        <div class="productinfo text-center">
          <img :src="image" alt />
          <h4>{{price.toLocaleString()}} VND</h4>
          <p>{{namePro}}</p>
          <a href="#" class="btn btn-default add-to-cart" @click="AddToCart">
            <i class="fa fa-shopping-cart"></i>Add to cart
          </a>
        </div>
        <div class="product-overlay">
          <div class="overlay-content">
            <h2>${{price.toLocaleString()}}</h2>
            <p>{{namePro}}</p>
            <a href="#" class="btn btn-default add-to-cart" @click="AddToCart">
              <i class="fa fa-shopping-cart"></i>Add to cart
            </a>
          </div>
        </div>
      </div>
      <div class="choose">
        <ul class="nav nav-pills nav-justified">
          <li>
            <a href="#">
              <i class="fa fa-plus-square"></i>Add to wishlist
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-plus-square"></i>Add to compare
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</router-link>
</template>

<script>
export default {
  name: "Product",
  props: ['price', 'namePro', 'image', 'alias'],
  methods: {
    AddToCart(){
      // localStorage.setItem("item", )
      console.log(this.props)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-overlay{
  z-index: 10000;
}
</style>
