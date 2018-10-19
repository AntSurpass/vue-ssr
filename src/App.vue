<template>
    <div id="app">
      <Header></Header>
      <router-link to="/login">login</router-link>
      <router-link to="/main">mian</router-link>
    <div class="view">
  <router-view></router-view>
    </div>
    <!-- <notify context="test notify"></notify> -->
    <button @click="notify">sss</button>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";

export default {
  metaInfo: {
    title: "首页"
  },
  data() {
    return {
      name: "hdslo"
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    notify() {
      this.$notify({
        context: "test $notify",
        btn: "close"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  color: greenyellow;
  position: relative;
  top: 0;
  left: 0;
  .view {
    height: 1000px;
    height: 1000px;
    background-color: aqua;
  }
}
</style>
