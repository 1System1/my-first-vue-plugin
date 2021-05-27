import axios from 'axios';
const request = axios.create({
  baseURL: '/aapi',
  timeout: 20000 // 请求超时时间
  , headers: {
    "Authorization":"bearer f8b785c2-86b0-4585-a242-8b257e8ba8b0"
  }
});
request.all = axios.all;
request.spread = axios.spread;
/**
 * @desc 请求之前的处理
 * @author shj
 * @params
 */
request.interceptors.request.use(config => {
  return config;
}, error => {
    return Promise.reject(error)
  }
)


/**
 * @desc 响应之后的拦截处理
 * @author shj
 * @params
 */
request.interceptors.response.use(
  response => {
    return response.data;
  }, res => {
  return Promise.reject( res);
})
export default request
