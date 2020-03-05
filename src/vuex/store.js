import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
const state={
    userId:'',
    avatar:'',
    followingList:[],
    squareLikeList:[]
}
const mutations={
    storeNameAndAvatar(state,payload){
        state.userId=payload.userId,
        state.avatar=payload.avatar
    },
    storeFollowingList(state,payload){
        state.followingList=payload.followingList
    },
    storeSquareLikeList(state,payload){
        state.squareLikeList=payload.squareLikeList
    },
}
export default new Vuex.Store({
    state,
    mutations,
    plugins: [
        createVuexAlong({
        // 设置保存的集合名字，避免同站点下的多项目数据冲突
            name: "hello-vuex-along",
            local: {
            // list: ["state"],
            // // 过滤模块 ma 数据， 将其他的存入 localStorage
            // isFilter: true,
            },
            session: {
            // 保存模块 ma 中的 a1 到 sessionStorage
                list: ["state"],
            },
        }),
    ]
})