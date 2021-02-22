import axios from "axios";
import Vue from "vue";

class ProductTypeApi {
    createType(data) {
        return axios.post(Vue.prototype.$hostName+'/type-product/create-type', data)
    }
}
export default new ProductTypeApi();