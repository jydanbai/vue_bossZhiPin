import {
  AUTH_SUCCESS,ERROR_MSG
} from './mutations-type';
import {getRedirectTo} from '@/utils/index';
export default {
  saveUser({commit}, {userInfo,$router}) {
    commit(AUTH_SUCCESS,{userInfo})
    localStorage.setItem("user_name",userInfo)
    const {type,header} = userInfo
    $router.push(getRedirectTo(type,header))
  },
  saveErrorMsg({commit}, {errMsg}) {
    commit(ERROR_MSG,{errMsg})
  },
  updateUser({commit},{user,})
}