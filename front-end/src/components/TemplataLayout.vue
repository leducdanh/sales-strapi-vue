<template>
  <div>
    <HeaderTop />
    <Menu />
    <HeaderBottom />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop.vue";
import Menu from "@/components/Menu.vue";
import HeaderBottom from "@/components/HeaderBottom.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    HeaderTop,
    Menu,
    Footer,
    HeaderBottom
  }
};
</script>
x