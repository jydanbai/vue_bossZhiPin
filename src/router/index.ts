/*
路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main/main.vue'
import Job from '../views/Job/job.vue'
import Talent from '../views/Talent/talent.vue'
import Message from '../views/Message/message.vue'
import Personal from '../views/Personal/personal.vue'
import Register from '../views/Register/register.vue'
import Login from '../views/Login/login.vue'

import NotFound from '../components/NotFound/NotFound.vue';

Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      component: Main,
      meta: {
        showFooter: true
      },
      children: [
        {
          path: '/main/job',
          component: Job,
        },
        {
          path: '/main/talent',
          component: Talent,
        },
        {
          path: '/main/message',
          component: Message,
        },
        {
          path: '/main/personal',
          component: Personal,
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      },
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false
      },
    },
    {
      path: '/errorinfo',
      component: NotFound,
      meta: {
        showFooter: false
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { 
    from.name ? next({
      name: from.name
    }) : next('/errorinfo'); 
  } else {
    next(); //如果匹配到正确跳转
  }
})

export default router