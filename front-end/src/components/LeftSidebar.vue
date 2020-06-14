<template>
  <div class="left-sidebar">
    <h2>Category</h2>
    <div class="panel-group category-products" id="accordian">
      <div class="panel panel-default" v-for="item in $store.getters.listMenu" :key="item.alias">
        <div class="panel-heading">
          <h4 class="panel-title">
            <router-link
              :to="'/#/cat/' + item.alias"
            >{{item.name}}</router-link>
            <a v-if="item.submenu.length > 0" class="badge pull-right"
              data-toggle="collapse"
              data-parent="#accordian"
              :href="'#' + item.alias">
              <i class="fa fa-plus"></i>
            </a>
          </h4>

          <div :id="item.alias" class="panel-collapse collapse">
            <div class="panel-body">
              <ul>
                <li v-for="itemSub in item.submenu" :key="itemSub.alias">
                  <router-link :to="'/#/cat/' + itemSub.alias">{{itemSub.name}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import poco from "../../contact/domain.js";
import axios from "axios";

export default {
  name: "LeftSidebar",
  props: {},
  data() {
    return {
      Categories: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get(`${poco.domain}/categories`)
      .then(res => {
        self.Categories = JSON.parse(JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-sidebar {
  text-align: left;
}
</style>
