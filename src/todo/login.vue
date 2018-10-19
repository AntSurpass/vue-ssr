<template>
    <div id="login">
      {{name}}
    </div>
</template>

<script>
export default {
  metaInfo: {
    title: '登录'
  },
  data() {
    return {
      name: "login"
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 500px;
  width: 500px;
  color: green;
  background-color:firebrick;
}
</style>

