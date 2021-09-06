// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import store from './store/index.js'
import Vuex from 'vuex'
import 'lib-flexible/flexible'
// import Search from 'vant/lib/Search'
// import 'vant/lib/Search/style'

Vue.use(Vuex)
Vue.use(less)
// Vue.use(Search)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
