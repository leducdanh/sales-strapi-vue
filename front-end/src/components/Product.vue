<template>
  <div class="col-sm-4">
    <div class="product-image-wrapper">
      <div class="single-products">
        <div class="productinfo text-center">
          <router-link :to="`/product-detail/${alias}`">
            <img :src="image" alt />
          </router-link>
          <h4>{{price.toLocaleString()}} VND</h4>
          <p>{{namePro}}</p>
          <router-link :to="`/product-detail/${alias}`">
            <a class="btn btn-default add-to-cart" @click="AddToCart">
              <i class="fa fa-eye" aria-hidden="true"></i>Chi tiet
            </a>
          </router-link>
          <a class="btn btn-default add-to-cart" @click="AddToCart">
            <i class="fa fa-shopping-cart"></i>Add to cart
          </a>
        </div>
        <!-- <div class="product-overlay">
          <div class="overlay-content">
            <router-link :to="`/product-detail/${alias}`">
              <h2>${{price.toLocaleString()}}</h2>
            </router-link>
            <p>{{namePro}}</p>
            <a href="#" class="btn btn-default add-to-cart" @click="AddToCart">
              <i class="fa fa-shopping-cart"></i>Add to cart
            </a>
          </div>
        </div>-->
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
</template>

<script>
export default {
  name: "Product",
  props: ["price", "namePro", "image", "alias", "idPro"],
  methods: {
    AddToCart() {
      // localStorage.setItem("item", )
      let listProOnCart = [];
      if (localStorage.getItem("listProOnCart")) {
        listProOnCart = JSON.parse(localStorage.getItem("listProOnCart"));
      }
      for (const iterator of listProOnCart) {
        if (iterator.idPro == this.idPro) {
          iterator.quantity++;
          localStorage.setItem("listProOnCart", JSON.stringify(listProOnCart));
          return;
        }
      }
      const item = {
        price: this.price,
        namePro: this.namePro,
        image: this.image,
        alias: this.alias,
        idPro: this.idPro,
        quantity: 1
      };
      listProOnCart.push(item);
      localStorage.setItem("listProOnCart", JSON.stringify(listProOnCart));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-overlay {
  z-index: 10000;
}
.add-to-cart {
  margin-left: 15px;
}
</style>
