import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
import UserApi from "@/services/UserApi";

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Users
const Users = () => import('@/components/users/Users')
const User = () => import('@/components/users/User')
const UserEdit = () => import('@/components/users/EditUser')
const UserCreate = () => import('@/components/users/CreateUser')

// login
const Login = () => import('@/components/security/Login')

Vue.use(Router)
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})



function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              name: 'User',
              component: User
            },
            {
              path: ':id/edit',
              name: 'UserEdit',
              component: UserEdit
            },
            {
              path: '/create/user',
              name: 'UserCreate',
              component: UserCreate
            }
          ]
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/login",
      name: 'Login',
      component: Login
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
    }
  ]
}


// check token is valid
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    UserApi.verifyToken()
        .then(response => {
          if(response.status === 500) {
            next('/account/login')
          }
        })
        .catch(err => {
          if(err.response.status === 500) {
            store.dispatch('logout')
            next('/account/login')
          }
        });
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/account/login')
  } else {
    next()
  }
})

export default router
