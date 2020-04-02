import Vue  from 'vue';
import store from './index'

import {SHOW_LOADING,HIDE_LOADING} from './mutations-type'

export default{
  [SHOW_LOADING](state:any){
    state.loading = true
  },
  [HIDE_LOADING](state:any){
    state.loading = false
  }
}