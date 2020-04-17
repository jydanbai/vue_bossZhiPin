/*
路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Login/login.vue');
const Register = () => import('@/views/Register/register.vue');
const NotFound = () => import('@/components/NotFound/NotFound.vue');
const Laoban = () => import('@/views/Laoban/laoban.vue');
const Dashen = () => import('@/views/Dashen/dashen.vue');
const DashenInfo = () => import('@/views/DashenInfo/dashen-info.vue');
const LaobanInfo = () => import('@/views/LaobanInfo/laoban-info.vue');
const Message = () => import('@/views/Message/message.vue');
const Personal = () => import('@/views/Personal/personal.vue');


Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
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
  // {
  //   path: '/404',
  //   component: NotFound,
  //   meta: {
  //     showFooter: false
  //   },
  // }
]
const router = new VueRouter({
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/dasheninfo',
    component: DashenInfo,
    name: '大神信息完善',
    meta: {
      role: ['dashen'],
      showFooter: false,
    },
  },
  {
    path: '/laobaninfo',
    component: LaobanInfo,
    name: '老板信息完善',
    meta: {
      role: ['laoban'],
      showFooter: false,
    },
  },
  {
    path: '/laoban',
    component: Laoban,
    name: '老板首页',
    meta: {
      role: ['laoban'],//页面需要的权限,
      showFooter: true,
    },
  },
  {
    path: '/dashen',
    component: Dashen,
    name: '大神首页',
    meta: {
      role: ['dashen'],
      showFooter: true,
    },
  },

  {
    path: '/message',
    component: Message,
    name: '消息页',
    meta: {
      role: ['laoban', 'dashem'],
      showFooter: true,
    },
  },
  {
    path: '/personal',
    component: Personal,
    name: '个人中心',
    meta: {
      role: ['laoban', 'dashen'],
      showFooter: true,
    },
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    component: NotFound,
    meta: {
      showFooter: false
    },
  }
];

// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) { 
//     from.name ? next({
//       name: from.name
//     }) : next('/errorinfo'); 
//   } else {
//     next(); //如果匹配到正确跳转
//   }
// })

export default router