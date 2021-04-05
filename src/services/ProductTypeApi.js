import axios from "axios";
import Vue from "vue";

class ProductTypeApi {
    createType(data) {
        return axios.post(Vue.prototype.$hostName+'/type-product/', data)
    }

    getAllType() {
        return axios.get(Vue.prototype.$hostName+'/type-product/')
    }
}
export default new ProductTypeApi();