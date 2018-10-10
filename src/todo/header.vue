<template>
    <div id="header">
      {{name}}
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "header"
    };
  }
};
</script>
<style lang="scss" scoped>
#header {
  color: green;
}
</style>

