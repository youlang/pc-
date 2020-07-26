//建议所有缓存localStorage写在这里
import localstore from "@/utils/localStore";

let ver = "_20200622_";
export default function install (Vue, joint = {}) {
    // 存储集合
    let local = joint.local = Vue.prototype.$local = {};
    local.userInfo = val => {
        let key = "userInfo" + ver;
        val && localstore.sessionSet(key, val, -1);
        return localstore.sessionGet(key);
    };
    local.appToken = val => {
        let key = "appToken" + ver;
        val && localstore.sessionSet(key, val, -1);
        return localstore.sessionGet(key);
    };
    return local;
}
