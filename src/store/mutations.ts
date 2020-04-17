import Vue from 'vue';
import store from './index'

import { SHOW_LOADING, HIDE_LOADING, AUTH_SUCCESS, ERROR_MSG, UPDATE_USER, RESET_ERROR, SET_ROUTERS} from './mutations-type'
import { constantRouterMap } from '@/router/index';

export default {
  [SHOW_LOADING](state: any) {
    state.loading = true
  },
  [HIDE_LOADING](state: any) {
    state.loading = false
  },
  [AUTH_SUCCESS](state: any, { userInfo }) {
    state.userInfo = userInfo,
      state.errorMsg = ''
  },
  [ERROR_MSG](state: any, { errMsg }) {
    state.errorMsg = errMsg
  },
  [UPDATE_USER](state: any, { user }) {
    state.userInfo = user,
      state.errorMsg = ''
  },
  [RESET_ERROR](state: any, { resetMsg }) {
    state.resetMsg = resetMsg
  },
  [SET_ROUTERS](state:any,{routers}) {
    state.addRouters = routers;
    state.routers = constantRouterMap.concat(routers);
  }
}