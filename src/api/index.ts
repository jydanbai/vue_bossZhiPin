import ajax from './ajax';

export const registerWithPassword = (username: string, password: string, type: string) => ajax({
  method: "POST",
  url: "/register",
  data: {
    username,
    password,
    type
  }
})

export const loginWithPassword = (username: string, password: string) => ajax({
  method: "POST",
  url: "/login",
  data: {
    username,
    password,
  }
})

export const reqUpdateUser = (user: Object) => ajax({
  method: "POST",
  url: "/update",
  data: user
})