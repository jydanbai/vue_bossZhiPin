import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@/views/Login/login.vue');
const Register = () => import('@/views/Register/register.vue');
const NotFound = () => import('@/components/NotFound/NotFound.vue');
const Laoban = () => import('@/views/Laoban/laoban.vue');
const Dashen = () => import('@/views/Dashen/dashen.vue');
const DashenInfo = () => import('@/views/DashenInfo/dashen-info.vue');
const LaobanInfo = () => import('@/views/LaobanInfo/laoban-info.vue');
const Message = () => import('@/views/Message/message.vue');
const Personal = () => import('@/views/Personal/personal.vue');

export const constantRouterMap = [
  {
    path: '/',
    name: '首页',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    name:'登录',
    meta: {
      showFooter: false
    },
  },
  {
    path: '/register',
    comonent: Register,
    name:'注册',
    meta: {
      showFooter: false
    },
  },

]
Vue.use(Router)
//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表 
const asyncRouterMap = [
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
];