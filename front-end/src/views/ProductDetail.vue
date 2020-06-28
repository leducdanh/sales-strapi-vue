<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <LeftSidebar />
      </div>
      <div class="col-sm-9 padding-right">
        <div class="product-details">
          <!--product-details-->
          <div class="col-sm-5">
            <div class="view-product">
              <img v-if="infopro" :src="infopro.image_link" alt />
              <!-- <h3>ZOOM</h3> -->
            </div>
            <div id="similar-product" class="carousel slide" data-ride="carousel">
              <!-- Wrapper for slides    -->
              <div class="carousel-inner">
                <div v-for="(index) in Math.round(ListImgDetail.length/3 + 0.4)" :key="index" 
                    :class="index < 2 ? `item active`: `item` ">
                  <a href v-for="(item, inx) in ListImgDetail" :key="item.id">
                    <img v-if="inx >= (3 * (index - 1)) && inx < (3 * (index))" :src="ListImgDetail[inx].image_link" alt />
                  </a>
                </div>
              </div>

              <!-- Controls -->
              <a class="left item-control" href="#similar-product" data-slide="prev">
                <i class="fa fa-angle-left"></i>
              </a>
              <a class="right item-control" href="#similar-product" data-slide="next">
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <div class="col-sm-7">
            <div class="product-information">
              <!--/product-information-->
              <img src="../assets/images/product-details/new.jpg" class="newarrival" alt />
              <h2 v-if="infopro">{{infopro.name}}</h2>
              <!-- <img src="../assets/images/product-details/rating.png" alt /> -->
              <span>
                <span v-if="infopro">{{infopro.price.toLocaleString()}} VND</span>
                <label>Quantity:</label>
                <input type="text" value="1" />
              </span>
              
                <button type="button" class="btn btn-fefault cart" @click="AddToCart">
                  <i class="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              <p v-if="infopro" class="text-left">
                {{infopro.content}}
              </p>
              <!-- <p>
                <b>Condition:</b> New
              </p>
              <p>
                <b>Brand:</b> E-SHOPPER
              </p> -->
              <a href>
                <img src="../assets/images/product-details/share.png" class="share img-responsive" alt />
              </a>
            </div>
            <!--/product-information-->
          </div>
        </div>
        <!--/product-details-->
      </div>
    </div>
  </div>
</template>

<script>
import LeftSidebar from '../components/LeftSidebar.vue';
import poco from "../../contact/domain.js"
import axios from 'axios';

export default {
  name: "ProductDetail",
  components: {
      LeftSidebar
  },
  props: {},
  data() {
    return {
      infopro: null,
      ListImgDetail: []
    }
  },
  created() {
    var self = this;
    axios.get(`${poco.domain}/products?alias=${this.$route.params.name}`)
    .then(res => {
      self.infopro = JSON.parse(JSON.stringify(res.data[0]))
      axios.get(`${poco.domain}/product-images?product.id=${self.infopro.id}`)
      .then(res2 => {
        self.ListImgDetail = JSON.parse(JSON.stringify(res2.data))
        // console.log(self.ListImgDetail)
      })
    })
    .catch(err => {
      console.log(err)
    })

  },
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
    },}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
    left: 0;
}
a img {
    width: 25%;
}
</style>
