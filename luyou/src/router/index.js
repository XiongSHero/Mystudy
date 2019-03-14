import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import login from '../components/Login'
import App from '../components/App'
import Userinfo from '../components/Userinfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/app',
      component: App,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'Hellworld',
          component: HelloWorld
        },
        {
          path: 'userinfo',
          component: Userinfo
        }
      ]
    }
  ]
})
