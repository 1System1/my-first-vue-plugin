<template>
  <div class="layout-head">

  </div>
</template>

<script>
export default {
  name: "LayoutHead"
}
</script>

<style scoped lang="scss">
  @include themeify {
    .layout-head{
      width: 100%;
      height: $layout-head-height;
      background-color: $color-primary;
    }
  }

</style>
