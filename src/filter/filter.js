import { format } from 'timeago.js';
import store from '../vuex/store.js'
const filters={
    changeTime:function(dateStr){
        return format(dateStr, 'zh_CN');
    },
    judgeFollow:function(userId){
        window.console.log("userId"+store.state.userId)
        return store.state.followingList.some(id=>{
            userId===id
        })
    },
    addImagePrefix:function(image){
        return "http://www.robben.fun:8090/image/"+image;
    },
    getUserAvatarById:function(userId){
        return "http://www.robben.fun:8090/image/"+userId+".jpg"
    },
    changePlaceholder:function(placeholder){
        window.console.log("placeholder:")
        window.console.log(placeholder)
        if(placeholder==''){
            return "请输入内容"
        }
        return placeholder;
    }
}
export default filters;