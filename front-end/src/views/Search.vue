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
            :key="item.id"
            :price="item.price"
            :namePro="item.name"
            :image="item.image_link"
            :alias="item.alias"
            :idPro="item.id"
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
    const keyS = this.$route.query.keySearch;
    axios
      .get(`${poco.domain}/products?name_contains=${keyS}`)
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
      const keyS = this.$route.query.keySearch;
      axios
        .get(`${poco.domain}/products?name_contains=${keyS}`)
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

