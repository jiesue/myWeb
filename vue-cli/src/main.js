import Vue from 'vue';
import App from './App.vue'

/* eslint-disable no-new */
//runtime
window.Vm = new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount("#app")

// compiler
// new Vue({
//   el: '#app',
//   router: router,
//   store: store,
//   template: '<App/>',
//   components: { App }
// })