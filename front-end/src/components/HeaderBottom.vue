<template>
  <div class="header-bottom">
    <!--header-bottom-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="mainmenu pull-left">
            <ul class="nav navbar-nav collapse navbar-collapse">
              <li>
                <router-link to="/">HOME</router-link>
              </li>
              <li class="dropdown" v-for="item in listMenu" :key="item.alias">
                <router-link :to="'/cat/' + item.alias">
                  {{item.name}}
                  <i v-if="item.submenu.length > 0" class="fa fa-angle-down"></i>
                </router-link>
                <ul v-if="item.submenu.length > 0" role="menu" class="sub-menu">
                  <li v-for="sub in item.submenu" :key="sub.alias">
                    <router-link :to="'/cat/' + sub.alias">{{sub.name}}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="col-sm-3">
          <div class="search_box pull-right">
            <input type="text" ref="keySearch" placeholder="Search" @keydown="search($event)" />
            <i class="fa fa-search" id="icon-search" aria-hidden="true"></i>
          </div>
        </div> -->
      </div>
      <!-- end row -->
      <div class="row">
        <div class="col-sm-12">
          <div class="search_box pull-right">
            <input type="text" ref="keySearch" placeholder="Search" @keydown="search($event)" />
            <i class="fa fa-search" id="icon-search" aria-hidden="true" @click="search($event, 'click')"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/header-bottom-->
</template>

<script>
import poco from "../../contact/domain.js";
import axios from "axios";

export default {
  name: "HeaderBottom",
  props: {},
  data() {
    return {
      listMenu: [],
      listIdMenu: []
    };
  },
  created() {
    axios
      .get(`${poco.domain}/categories?status=true`)
      .then(res => {
        for (const iterator of res.data) {
          const item = {
            name: iterator.name,
            alias: iterator.alias,
            submenu: []
          };
          if (this.listIdMenu.indexOf(item.alias) < 0) {
            this.listMenu.push(item);
            this.listIdMenu.push(item.alias);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${poco.domain}/sub-menus`)
      .then(res => {
        for (const iterator of res.data) {
          if (!iterator.status) continue;
          for (const itemMenu of this.listMenu) {
            if (iterator.categorie.alias == itemMenu.alias) {
              itemMenu.submenu.push(iterator);
            }
          }
        }
        this.$store.commit("setListMenu", this.listMenu);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    search(e, method = '') {
      if (method == 'click'){
        this.$router.push(`/search?keySearch=${e.path[1].children[0].value}`).catch(() => {});
        return
      }
      
      if (e.code != "Enter") return;
      this.$router.push(`/search?keySearch=${e.target.value}`).catch(() => {});
    },
  }
};
</script>

<style scoped>
ul.sub-menu {
  text-align: left !important;
}
.search_box{
  position: relative;
}.search_box input{
  width: 300px !important;
}
#icon-search{
  position: absolute;
  right: 5%;
  top: 30%;
  cursor: pointer;
}
button.navbar-toggle{
  margin-right: 0;
}
</style>
