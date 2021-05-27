// import indicator from './packages/components/views/indicator';
const indicators= require("./src/components/views/indicator/src/index.vue")
// const components =[
//   indicator
// ]

// const install = function(Vue, {}) {
//   components.forEach(component => {
//     Vue.component(component.name, component);
//   });
//
// };

console.log('window.Vue----------------------',window.Vue)
// if (typeof window !== 'undefined' && window.Vue) {
//     // window.Vue.use(testH)
//   install(window.Vue);
// }
const indicator = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('indicator', indicators)
  }
}

const exports={
  indicator
}
export default exports
