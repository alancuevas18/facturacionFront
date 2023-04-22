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

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == 401) {
      swal.fire({
        title: 'Su session a expirado',
        icon: icon,
        buttonsStyling: false
      })
      store.commit('logOut')
    }
  }
)

var token = localStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
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
