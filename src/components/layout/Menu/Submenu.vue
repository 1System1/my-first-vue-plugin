<template>
  <!--不是叶子节点-->
    <el-submenu v-if="!node.isLeaf"  :index="node.path">
      <template slot="title">
        <i :class="node.icon" v-if="node.icon"></i>
        <span slot="title">{{node.text}}</span>
      </template>
      <template v-if="node.children">
        <submenu v-for="menu in node.children" :key="menu.path" :node="menu"></submenu>
      </template>
    </el-submenu>
    <el-menu-item :index="node.path" v-else>
      {{node.text}}
    </el-menu-item>

</template>

<script>
export default {
  name: "Submenu",
  props:{
    node:{
      type:Object,
      required:true
    }
  }
}
</script>

<style scoped>

</style>
