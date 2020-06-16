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

export default {
  name: "Home2",
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
    console.log("this.$route.params.alias", this.$route.params.alias)
    axios
      .get(`${poco.domain}/category-of-products?categorie.alias=${this.$route.params.alias}`)
      .then(res => {
        self.Products = JSON.parse(JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    $route() {
      var self = this;
      axios
        .get(`${poco.domain}/category-of-products?categorie.alias=${this.$route.params.alias}`)
        .then(res => {
          self.Products = JSON.parse(JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

