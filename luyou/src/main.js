// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'

import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'

/* 引入资源请求插件 */
import VueResource from 'vue-resource'

/* 使用VueResource插件 */
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

const userNameFormLocalStorage = localStorage.getItem('userName')
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    if (userNameFormLocalStorage) { // 已经登陆
      next()
    } else {
      // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
      next({ path: '/login', query: { referrer: to.fullPath } })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
