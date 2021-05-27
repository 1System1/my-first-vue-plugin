<template>
    <div class="layout">
        <layout-head></layout-head>
        <layout-content></layout-content>
    </div>
</template>

<script>
export default {
  name: "Layout",
    components:{
      LayoutHead:()=>import("./LayoutHead"),
      LayoutContent:()=>import("./LayoutContent")
    }
}
</script>

<style scoped>
.layout{
  width: 100%;
  height: 100%;
  overflow: hidden;
}


</style>
