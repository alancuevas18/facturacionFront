import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import swal from 'sweetalert2'
import axios from 'axios'

// router setup
import router from './routes/router'
import i18n from './i18n'
import './registerServiceWorker'
import store from './storage'

// plugin setup
Vue.use(DashboardPlugin)
Vue.use(VueRouter)
Vue.use(RouterPrefetch)

var token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == 401) {
      if (!store.state.isAuthenticated)
        swal.fire({
          title: 'Lo sentimos, la sesión ha expirado',
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        })
      store.commit('logOut')
    }
    return Promise.reject(error)
  }
)

Vue.mixin({
  methods: {
    globalSweetMessage: function (message, icon = 'success') {
      if (message == '' || message == undefined) {
        if (icon == 'success') message = 'Realizado con exito'
        else if (icon == 'error') message = 'No se pudo realizar la accion'
      }
      swal.fire({
        title: message,
        icon: icon,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success btn-fill'
        }
      })
    },
    globalTry: function () {
      console.log('GLOBAL TRY')
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
  i18n
})
