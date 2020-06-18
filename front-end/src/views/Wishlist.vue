<template>
  <div class="ProductByCat">
    <SliderCarousel />
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <LeftSidebar />
        </div>
        <div class="col-sm-9 padding-right">
          <Product
            v-for="item in Products"
            :key="item.product.id"
            :price="item.product.price"
            :namePro="item.product.name"
            :image="item.product.image_link"
            :alias="item.product.alias"
            :idPro="item.product.id"
            :wishlist="item.id"
            v-on:DelWishlist="handleDelWishList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SliderCarousel from "@/components/SliderCarousel.vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import Product from "@/components/Product.vue";
import poco from "../../contact/domain.js";
import axios from "axios";
import base64 from "base-64";

export default {
  name: "wishlists",
  components: {
    SliderCarousel,
    LeftSidebar,
    Product
  },
  data() {
    return {
      Products: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get(`${poco.domain}/wishlists?username=${base64.decode(localStorage.getItem("username"))}`)
      .then(res => {
        self.Products = JSON.parse(JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleDelWishList(idDel) {
      for(let i=0;i<this.Products.length ;i++){
        if (this.Products[i].id == idDel)
          this.Products.splice(i, 1)
      }
    }
  }
};
</script>

