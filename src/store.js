import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, token, email) {
    state.status = 'success'
    state.token = token
    state.email = email
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
    state.email = ''
  },
}

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(Vue.prototype.$hostName+"/login_check", {
        "Content-Type:": "application/json",
        username: user.username,
        password: user.password
      })
          .then(resp => {
            const token = resp.data.token
            const email = resp.data.email
            localStorage.setItem('token', token)
            localStorage.setItem('email', email)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            reject(err)
          })
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})