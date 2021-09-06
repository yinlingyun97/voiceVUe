import Vue from 'vue'
import Router from 'vue-router'
import MapPosition from '@/pages/MapPosition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: MapPosition
    }
  ]
})
