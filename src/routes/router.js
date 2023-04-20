import VueRouter from 'vue-router'
import routes from './routes'
import store from '../storage'

// configure router
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  var isAuthenticated = store.state.isAuthenticated
  var userRol = store.state.rol
  if (to.meta.needsAuth) {
    if (isAuthenticated) {
      if (
        to.meta.validRols == '*' ||
        to.meta.validRols == '' ||
        to.meta.validRols == undefined
      )
        next() //GLOBAL ACCESS
      else {
        let ableRols = to.meta.validRols.split(',')
        if (ableRols.find((e) => e == userRol)) next()
        else next('/')
      }
    } else {
      next('/login') //NEED AUTHS
    }
  } else {
    next() //NO AUth NEEDS
  }
})
export default router
