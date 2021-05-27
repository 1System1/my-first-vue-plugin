<template>
  <el-menu :default-active="defaultActive"
           class="left-menu"
           @open="handleOpen"
           @close="handleClose"
           :collapse="isCollapse"
           :router="isRouter"
           :background-color="backGround"
  >
    <template v-for="(menu,index) in menuDatas">
      <submenu :node="menu" :key="index"></submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  props:{
    defaultActive:{
      type:String,
      default:""
    },
    isRouter:{
      type:Boolean,
      default:false
    },
    isCollapse:{
      type:Boolean,
      default:false
    },
    menuDatas:{
      type:Array,
      default:()=>[]
    },
    backGround:{
      type:String,
      default:"#ffffff"
    }
  },
  components:{
    submenu:()=>import("./Submenu")
  },
  methods:{
    handleOpen(index,path){
      this.$emit("handleOpen",index,path)
    },
    handleClose(index,path){
      this.$emit("handleClose",index,path)
    }
  }
}
</script>


<style scoped lang="scss">
  @include themeify {
    .left-menu{
      width: $left-menu-width;
      flex-shrink: 0;
    }
  }
</style>
