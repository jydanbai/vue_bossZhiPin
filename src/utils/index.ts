/**
 * 
 * @param type 用户身份
 * @param header vuex中的用户信息
 * 根据用户身份和用户信息完善程度判断跳转路由
 */
export function getRedirectTo(type: string, header: string) {
  let path
  if (type === 'laoban') {
    path = '/laoban'
  } else if (type === 'dashen') {
    path = '/dashen'
  }
  if (!header) {
    path += 'info'
  }
  return path
}

/**
 * 
 * @param roles 用户路由信息
 * @param route 动态路由表
 * 通过用户权限信息筛选动态路由表
 */
export function hasPermission(roles:string, route:any) {
  let rolesArr = roles.split(",")
  if (route.meta && route.meta.role) {
    return rolesArr.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 
 * @param router 公共路由
 * 提取公共路由路径
 */
export function exportWhiteListFromRouter(router:any){
  let res = []
  for(let item of router)
    res.push(item.path)
  return res
}