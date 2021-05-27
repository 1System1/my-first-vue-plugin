import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import routers from "./routers"
let index = new VueRouter({
  base: '/',
  mode: 'history',
  routes: routers
})

/**
 *  @desc  :  路由守卫,路由发生改变前
 *  @author:  gjx
 *  @date  :  2020/3/20
 */
// index.beforeEach((to, from, next) => {
//
// })
export default index;
