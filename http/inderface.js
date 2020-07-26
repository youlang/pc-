import axios from 'axios';
import router from '../../multiple/route/router'  //引入router
import store from '../vuex'
const qs = require('qs')
let commParam = { appToken: store.state.common.appToken, appId: 'f1d0d375-bcd0-4f06-a24b-bedf80108a73' }
axios.interceptors.request.use(
    config => {
        config.headers.token = localStorage.getItem('token') || ''  //请求头加上token
        if (!/^(?:http?:)?\/\//.test(config.url))
            config.url = 'http://lib.mj2004.com' + config.url;
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // //拦截响应，做统一处理 
        if (response.data.code == 401) {
            return router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
        }
        // console.log(response)
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    })
let httpServer = {
    post (url, data = {}, type) {
        let config = null,_data = Object.assign({}, commParam, data)
        if (type == 'json') {
            config = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
            _data = JSON.stringify(_data)
        }else{
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
            _data = qs.stringify(_data)
        }
        return axios.post(url, _data, config).then(res => {
            return Promise.resolve(res.data);
        });
    },
    get (url, data = {}, addParm = {}) {
        return axios.get(url, { params: Object.assign({}, commParam, addParm, data) }).then(res => {
            return Promise.resolve(res.data);
        });
    },
};

export default httpServer;
