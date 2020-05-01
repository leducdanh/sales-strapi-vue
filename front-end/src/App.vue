<template>
  <div id="app">
    <HeaderTop />
    <Menu />
    <HeaderBottom />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTop from "@/components/HeaderTop.vue";
import Menu from "@/components/Menu.vue";
import HeaderBottom from "@/components/HeaderBottom.vue";

export default {
  components: {
    HeaderTop,
    Menu,
    HeaderBottom
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
