import {
  AUTH_SUCCESS,ERROR_MSG,UPDATE_USER,RESET_ERROR,SET_ROUTERS
} from './mutations-type';
import {reqUser} from '@/api/index';
import {constantRouterMap,asyncRouterMap} from '@/router/index';
import { hasPermission } from '@/utils/index';

export default {
  saveUser({commit}, {userInfo}) {
    commit(AUTH_SUCCESS,{userInfo})
    localStorage.setItem("userId",userInfo._id)
  },
  saveErrorMsg({commit}, {errMsg}) {
    commit(ERROR_MSG,{errMsg})
  },
  updateUserInfo({commit},{user}) {
    commit(UPDATE_USER,{user})
  },
  saveResetMsg({commit}, {resetMsg}) {
    commit(RESET_ERROR,{resetMsg})
  },
  async autoLogin({commit}){
    let result = await reqUser()
    if(result.code === 0 ){
      commit(UPDATE_USER,{user:result.data})
    }else if(result.code === 1 ){
      commit(RESET_ERROR,{resetMsg:result.msg})
    }
  },
  GenerateRoutes({ commit }, data) {
    debugger
    return new Promise(resolve => {
      const { roles } = data;
      const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false;
            });
            return v
          } else {
            return v
          }
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    })
  }
}