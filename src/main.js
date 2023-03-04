/*!

 =========================================================
 * Vue Black Dashboard PRO - v1.4.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/vue-black-dashboard-pro
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import swal from 'sweetalert2'

// router setup
import router from './routes/router'
import i18n from './i18n'
import './registerServiceWorker'
// plugin setup
Vue.use(DashboardPlugin)
Vue.use(VueRouter)
Vue.use(RouterPrefetch)

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
  i18n
})
