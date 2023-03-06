import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLagn from '../views/HomeLagn.vue'
import LoginLagn from '../views/LoginLagn.vue'

Vue.use(VueRouter)

const guest = (to, from, next) => {
  if (!localStorage.getItem('user')) {
    return next()
  } else {
    return next('/')
  }
}

const auth = (to, from, next) => {
  if (localStorage.getItem('user')) {
    return next()
  } else {
    return next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: auth,
    component: HomeLagn
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: guest,
    component: LoginLagn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
