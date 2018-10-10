<template>
    <div id="app">
      <Header></Header>
      <Footer></Footer> 
    </div>
</template>

<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";

export default {
  data() {
    return {
      name: "hdslo"
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss" scoped>
#app {
  color: greenyellow;
  position: relative;
  top: 0;
  left: 0;
}
</style>
