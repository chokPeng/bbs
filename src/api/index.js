import axios from "axios";
import router  from '@/router/router.js';
import qs from 'qs'
import store from '@/vuex/store.js'
axios.defaults.baseURL = 'http://localhost:8090';
axios.interceptors.request.use(function (config) {
    let url = config.url;
    if (url!='/login'&&url!='/post') {
        window.console.log(url)
        window.console.log(store.state.userId)
        if(store.state.userId==''){
            window.console.log("未登录")
            router.push("/login")
        }
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
//异常处理
axios.interceptors.response.use(function(response){
    // Any status code that lie within the range of 2xx cause this function to trigger
    return {
        code: response.status,
        message: response.statusText,
        data: response.data
    }
},function(err){
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '错误请求'
            break
        case 401:
            err.message = '未授权，请重新登录'
            router.push("/login")
            break
        case 403:
            err.message = '拒绝访问'
            break
        case 404:
            err.message = '请求错误,未找到该资源'
            break
        case 405:
            err.message = '请求方法未允许'
            break
        case 408:
            err.message = '请求超时'
            break
        case 500:
            err.message = '服务器端出错'
            break
        case 501:
            err.message = '网络未实现'
            break
        case 502:
            err.message = '网络错误'
            break
        case 503:
            err.message = '服务不可用'
            break
        case 504:
            err.message = '网络超时'
            break
        case 505:
            err.message = 'http版本不支持该请求'
            break
        default:
            err.message = `连接错误${err.response.status}`
        }
        let errData = {
            code: err.response.status,
            message: err.message
        }
        // 统一错误处理可以放这，例如页面提示错误...
        window.console.log('统一错误处理: ', errData)
    }
    return Promise.reject(err)
})
export default {
    getConfessionWall:()=>axios.get(`/confessionWall`),
    getPost: (data) => axios.get(`/post/${data}`),
    getAllPosts:()=>axios.get(`/post`),
    getUserInfo:(data)=>axios.get(`/user/${data}`),
    addLike:(data)=>axios.post(`confessionWall/like`,qs.stringify(data)),
    saveFollower:(data)=>axios.post(`/relationship/follower`,qs.stringify(data)),
    getFollowers:(data)=>axios.get(`/relationship/followers/${data}`),
    logout:()=>axios.get(`/logout`).then((res)=>{
        window.console.log(res)
        if(res.code==200){
            router.push("/login")
        }
    }),
   // postConfessionWall:(data) =>axios.post()
    postFormData:(url, params)=>
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
            },
            url,
            method: 'post',
            data: params
        }),
}