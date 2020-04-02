/**
 * 使用axios封装的ajax请求
 * 返回一个promise对象
 */

import axios from "axios";
import store from "../store";
import {Toast} from 'vant';
import qs from 'qs';
import { Notify } from "vant";
import {SHOW_LOADING,HIDE_LOADING} from '@/store/mutations-type';

// 1. 生成Axios的伪实例, 能够使用Axios实例的属性，但不是Axios的实例
const instance = axios.create({
  baseURL: "/api", // 设置请求的基本路径
  timeout: 10000 // 设置超时时间
});

instance.interceptors.request.use(
  (config:any) => {
    store.commit(SHOW_LOADING);
    if (
      config.method.toUpperCase() === "POST" &&
      config.data instanceof Object
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    store.commit(HIDE_LOADING);
  }
  
);

instance.interceptors.response.use(
  response => {
    store.commit(HIDE_LOADING);
    return response.data;
  },
  error => {
    store.commit(HIDE_LOADING);
    Toast.fail("请求异常, status: " + error.code);
    // 返回一个pending的promise, 中断promise链
    return new Promise(() => {});
  }
);

export default instance;
