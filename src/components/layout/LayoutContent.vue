<template>
  <div class="layout-content">
      <menus :menuDatas="menuDatas"  :isCollapse=isCollapse :isRouter="isRouter"></menus>
      <layout-main></layout-main>

  </div>
</template>

<script>
import Menu from "@/mock/Menu"
export default {
  name: "LayContent",
  components:{
    menus:()=>import("./Menu"),
    LayoutMain:()=>import("./LayoutMain")
  },
  data(){
    return{
      menuDatas:Menu.MENUS,
      isRouter:Menu.isRouter,
      isCollapse:Menu.isCollapse,
    }
  }
}
</script>

<style scoped>
.layout-content{
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
