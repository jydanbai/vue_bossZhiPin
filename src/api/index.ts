import ajax from './ajax';

export const registerWithPassword = (username:string,password:string,type:string) => ajax({
  method:"POST",
  url:"/register",
  data:{
    username,
    password,
    type
  }
})