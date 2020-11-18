import axios from "axios";
import Vue from "vue";

class UserApi {

    verifyToken() {
        //this.token = token
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
        return axios.get(Vue.prototype.$hostName+"/check/login/verify/token")
    }
}

export default new UserApi();