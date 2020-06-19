<template>
  <div class="header-middle">
    <!--header-middle-->
    <div class="container">
      <div class="row">
        <div class="col-md-4 clearfix">
          <!-- <div class="logo pull-left">
            <router-link to="/">
              <img src="../assets/images/home/logo.png" alt />
            </router-link>
          </div> -->
            <router-link to="/">
              <img src="../assets/images/home/logo.png" class="logo pull-left" alt />
            </router-link>
          <div class="btn-group pull-right clearfix">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-default dropdown-toggle usa"
                data-toggle="dropdown"
              >
                USA
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link to>Canada</router-link>
                </li>
                <li>
                  <router-link to>UK</router-link>
                </li>
              </ul>
            </div>

            <div class="btn-group">
              <button
                type="button"
                class="btn btn-default dropdown-toggle usa"
                data-toggle="dropdown"
              >
                DOLLAR
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link to>Canadian Dollar</router-link>
                </li>
                <li>
                  <router-link to>Pound</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8 clearfix">
          <div class="shop-menu clearfix pull-right">
            <ul class="nav navbar-nav">
              <li>
                <router-link to>
                  <i class="fa fa-user"></i> Account
                </router-link>
              </li>
              <li v-if="showItemMenu">
                <router-link to="/wishlist">
                  <i class="fa fa-star"></i> Wishlist
                </router-link>
              </li>
              <!-- <li>
                <router-link to="checkout.html">
                  <i class="fa fa-crosshairs"></i> Checkout
                </router-link>
              </li> -->
              <li>
                <router-link to="/cart">
                  <i class="fa fa-shopping-cart"></i> Cart
                </router-link>
              </li>
              <li v-if="!showItemMenu">
                <router-link to="/login">
                  <i class="fa fa-lock"></i> Login
                </router-link>
              </li>
              <li v-if="showItemMenu">
                <a style="cursor: pointer" @click="Logout()">
                  <i class="fa fa-lock"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/header-middle-->
</template>

<script>
import swal from "sweetalert";
export default {
  name: "Menu",
  props: {},
  computed: {
    showItemMenu() {
      return localStorage.getItem("jwt");
    }
  },
  methods: {
    Logout() {
      swal({
        title: "Đăng xuất",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          localStorage.clear();
          window.location.assign("/");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media (max-width: 767px) {
  .mainmenu ul li a {
    color: #fff;
    text-align: left;
  }
  ul.sub-menu {
    position: relative;
    width: auto;
    display: block;
    background: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    top: 0;
    text-align: left !important;
  }
}
</style>
