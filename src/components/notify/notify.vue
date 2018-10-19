<template>
<transition name="fade" @after-leave="afterleave" @after-enter="afterenter">
<div class="notify" :style="style" v-show="visiable"       @mouseenter="clearTime"
      @mouseleave="creatTime">
<span class="msg">{{context}}</span><span class="btn" @click="close">{{btn}}</span>
</div>
</transition>
</template>

<script>
export default {
  name: "notify",
  data() {
    return {
      visiable: true
    };
  },
  props: {
    context: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    }
  },
  computed: {
    style() {
      return {};
    }
  },
  methods: {
    close(e) {
      this.$emit("close");
    },
    afterleave() {
      this.$emit("closed");
    },
    afterenter() {},
    creatTime() {},
    clearTime() {}
  }
};
</script>

<style lang="scss" scoped>
.notify {
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: violet;
  text-align: center;
  overflow: hidden;
  .msg {
    float: left;
  }
  .btn {
    float: right;
  }
}
</style>
