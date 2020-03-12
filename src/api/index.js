import axios from "axios";
import router  from '@/router/router.js';
import qs from 'qs'
import store from '@/vuex/store.js'
axios.defaults.baseURL = 'http://localhost:8090';
axios.interceptors.request.use(function (config) {
    let url = config.url;
    if (url!='/login'&&url!='/post') {
        //window.console.log(url)
        //window.console.log(store.state.userId)
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
let config = {
    headers: {
        'Content-Type': 'multipart/form-data;'
    } 
}
export default {
    getSquare:(data)=>axios.get(`/square`,{params:{topic:data}}),
    getSquareById:(data)=>axios.get(`square/${data}`),
    getPostTopic:()=>axios.get(`/post/topic`),
    getPostId:(data)=>axios.post(`/post/drafts`,qs.stringify(data)),
    getPost: (data) => axios.get(`/post/${data}`),
    getAllPosts:()=>axios.get(`/post`),
    getUserInfo:(data)=>axios.get(`/user/${data}`),
    addLike:(data)=>axios.post(`square/like`,qs.stringify(data)),
    follow:(data)=>axios.post(`/relationship/follow`,qs.stringify(data)),
    unfollow:(data)=>axios.post(`/relationship/unfollow`,qs.stringify(data)),
    getFollowers:(data)=>axios.get(`/relationship/followers/${data}`),
    getFollowees:(data)=>axios.get(`/relationship/followees/${data}`),
    savePostComment:(data)=>axios.post(`/postComment`,qs.stringify(data)),
    saveSquare:(data)=>axios.post(`/square`,data,config),
    savePostCommentReply:(data)=>axios.post(`/commentReply/post`,data),
    saveSquareCommentReply:(data)=>axios.post(`/commentReply/square`,data),
    saveSquareComment:(data)=>axios.post(`/squareComment`,qs.stringify(data)),
    signout:(data)=>axios.delete(`/signout`,{params:data}).then((res)=>{
        window.console.log(res)
        if(res.code==200){
            router.push("/login")
        }
    }),
    signin:(data)=>axios.post(`login`,qs.stringify(data)),
    savePost:(data)=>axios.post(`/post`,qs.stringify(data)),
    getActive:(data)=>axios.get(`/active/${data}`),
    getTopic:(data)=>axios.get(`/topic/${data}`),
    saveUserInfo:(data)=>axios.post(`/user`,data,config),
    signup:(data)=>axios.put(`/user`,data),
    getPrivateMessage:(data)=>axios.get(`/privateMessage`,{params:data}),
    savePrivateMessage:(data)=>axios.post(`/privateMessage`,qs.stringify(data)),
    getAllPrivateMessage:(data)=>axios.get(`/privateMessage/all`,{params:data}),
    search:(data)=>axios.get(`/search`,{params:data}),
    getOnlineUser:()=>axios.get(`/onlineUser`),
    isUserOnline:(data)=>axios.get(`/isOnline`,{params:data}),    //判断用户是否在线
    savePostLike:(data)=>axios.post(`/postLike`,qs.stringify(data)),
    saveSquareLike:(data)=>axios.post(`/square/like`,qs.stringify(data)),
    deleteSquareLike:(data)=>axios.delete(`/square/like`,{params:data}),
    deletePostLike:(data)=>axios.delete(`/postLike`,{params:data}),
    getPostLike:(data)=>axios.get(`/postLike`,{params:data}),
    deletePost:(data)=>axios.delete(`/post`,{params:data}),
    deleteSquare:(data)=>axios.delete(`/square/${data}`),
    isUserLike:(data)=>axios.get(`isUserLike`,{params:data}),
    getUserSquareLikeList:(data)=>axios.get(`/square/like`,{params:data}),
    saveCollection:(data)=>axios.post(`/collection`,qs.stringify(data)),
    deleteCollection:(data)=>axios.delete(`/collection`,{params:data}),
    getCollection:(data)=>axios.get(`/collection`,{params:data}),
    getCollectedPostIdList:(data)=>axios.get(`/collection/postIdList`,{params:data})
}