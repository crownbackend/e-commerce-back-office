import axios from "axios";
import Vue from "vue";

class UserApi {

    verifyToken() {
        //this.token = token
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
        return axios.get(Vue.prototype.$hostName+"/check/login/verify/token")
    }

    getAllUsers() {
        return axios.get(Vue.prototype.$hostName+'/users/')
    }

    getUser(id) {
        return axios.get(Vue.prototype.$hostName+'/users/user/'+id)
    }

    createUser(email, lastName, firstName, address, city, telephone) {
        let data = {
            email: email,
            lastName: lastName,
            firstName: firstName,
            address: address,
            city: city,
            telephone: telephone,
        }
        return axios.post(Vue.prototype.$hostName+'/users/', data)
    }

    editUser(id, email, lastName, firstName, address, enabled, city, telephone) {
        let formData = new FormData()
        formData.append("email", email)
        formData.append("lastName", lastName)
        formData.append("firstName", firstName)
        formData.append("address", address)
        formData.append("enabled", enabled)
        formData.append("city", city)
        formData.append("telephone", telephone)
        formData.append('_method', 'PUT')
        return axios.post(Vue.prototype.$hostName+'/users/user/'+id+'/edit', formData)
    }

    filterUsers(filter) {
        return axios.get(Vue.prototype.$hostName+'/users/'+filter)
    }

    loadMoreUsers(filter, date) {
        return axios.get(Vue.prototype.$hostName+'/users/load/more/'+filter+'/'+date)
    }

    searchUser(search) {
        let formData = new FormData()
        formData.append("search", search)
        return axios.post(Vue.prototype.$hostName+'/users/search/user', formData)
    }

    verifyEmail(email) {
        let formData = new FormData()
        formData.append("email", email)
        return axios.post(Vue.prototype.$hostName+'/users/check/email/validate', formData)
    }

    verifyAddress(address) {
        return axios.get(Vue.prototype.$hostName+'/users/check/address/'+ address)
    }
}

export default new UserApi();