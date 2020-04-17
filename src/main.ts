import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'amfe-flexible/index.js'
import router from './router'
import * as API from './api'
import Cookies from 'js-cookie';

import { Tabbar, TabbarItem, Button, Loading, Toast, NavBar } from 'vant';
import { getRedirectTo, exportWhiteListFromRouter } from '@/utils/index';
import { constantRouterMap, asyncRouterMap } from '@/router/index';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(NavBar);

Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

const whiteList = exportWhiteListFromRouter(constantRouterMap)
console.log(store);
router.beforeEach((to, from, next) => {
  debugger
  const userid = Cookies.get('userid')
  const { userInfo } = store.state
  if (!userid) {
    if (whiteList.indexOf(to.path) !== -1) {
      if (to.path === '/') {
        next('/login')
      } else {
        next()// 在免登录白名单，直接进入
      }
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  } else {

    if (!userInfo._id) {
      store.dispatch('autoLogin').then(res => {
        store.dispatch('GenerateRoutes', { data: res.data.type }).then(() => { // 生成可访问的路由表
          router.addRoutes(store.state.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch(err => {
        console.log(err);
      })
    } else {
      store.dispatch('GenerateRoutes', { data: userInfo.type }).then(() => { // 生成可访问的路由表
        router.addRoutes(store.state.addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
    }



  }
  // if (to.matched.length === 0) {
  //   from.name ? next({
  //     name: from.name
  //   }) : next('/404');
  // } else {
  //   next(); //如果匹配到正确跳转
  // }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
