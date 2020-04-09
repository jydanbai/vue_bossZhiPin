import Vue from 'vue';
import store from './index'

import { SHOW_LOADING, HIDE_LOADING, AUTH_SUCCESS,ERROR_MSG } from './mutations-type'

export default {
  [SHOW_LOADING](state: any) {
    state.loading = true
  },
  [HIDE_LOADING](state: any) {
    state.loading = false
  },
  [AUTH_SUCCESS](state: any, {userInfo}) {
    state.userInfo = userInfo,
    state.errorMsg = ''
  },
  [ERROR_MSG](state: any, {errMsg}) {
    state.errorMsg = errMsg
  }
}