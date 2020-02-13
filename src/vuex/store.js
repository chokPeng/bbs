import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
    userId:'',
    name:'',
    avatar:'',
}
const mutations={
    storeNameAndAvatar(state,payload){
        state.userId=payload.userId,
        state.avatar=payload.avatar
    }
}
export default new Vuex.Store({
    state,
    mutations
})