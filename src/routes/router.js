import VueRouter from 'vue-router'
import routes from './routes'
import store from '../storage'
import axios from 'axios'
import swal from 'sweetalert2'

// configure router
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    store.state.routerHistory.push(from.path)
    if (savedPosition) {
      return savedPosition
    } else {

      return { x: 0, y: 0 }
    }
  }
})
async function refreshToken() {
  if (store.state.isAuthenticated)
 await   axios
      .post('https://emacsoft.com/Authorization/RefreshToken')
      .then((response) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.result.token
          store.state.office=response.data.result.sucursal
      })
      .catch((error) => {
        this.globalSweetMessage(error.response.data.message, 'error')
      })
}
router.beforeEach(async (to, from, next) => {
  var isAuthenticated = store.state.isAuthenticated
  console.log(from)
  var userRol = store.state.rol
  if (to.meta.needsAuth) {
    if (isAuthenticated) {
      if (
        to.meta.validRols == '*' ||
        to.meta.validRols == '' ||
        to.meta.validRols == undefined
      ) {
      await  refreshToken()
        next() //GLOBAL ACCESS
      } else {
        let ableRols = to.meta.validRols.split(',')
        if (ableRols.find((e) => e == userRol)) {
          refreshToken()
          next()
        } else next('/')
      }
    } else {
      next('/login') //NEED AUTHS
    }
  } else {
    refreshToken()
    next() //NO AUth NEEDS
  }
})
export default router
