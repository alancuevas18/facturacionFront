import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin'
import App from './App.vue'
import swal from 'sweetalert2'
import axios from 'axios'
import config from '@/config'
import * as Xlsx from 'xlsx'
import { localize } from"./vee-validate";

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
    globalSweetMessage(message, icon = 'success') {
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
    globalHandleDelete(index, row, tableData, page) {
      swal
        .fire({
          title: 'Estas seguro?',
          text: `Esta accion no se puede reversar!`,
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
            cancelButton: 'btn btn-danger btn-fill'
          },
          confirmButtonText: 'Confimar!',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false
        })
        .then((result) => {
          if (result.value) {
            let baseApiUrl = config.global.baseApiUrl
            this.isLoading = true
            axios
              .delete(baseApiUrl + page + '/' + row.id)
              .then(() => {
                this.globalSweetMessage()
                let indexToDelete = tableData.findIndex(
                  (tableRow) => tableRow.id === row.id
                )
                if (indexToDelete >= 0) {
                  tableData.splice(indexToDelete, 1)
                }
              })
              .catch((error) => {
                this.globalSweetMessage(error.response.data.message, 'error')
              })
              .finally(() => (this.isLoading = false))
          }
        })

      return tableData
    },
    globalFillTable(page) {
      let baseApiUrl = config.global.baseApiUrl
      this.isLoading = true
      return axios
        .get(baseApiUrl + page)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          this.globalSweetMessage('Error al obtener los datos', 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    globalFilter(tableData, propsToSearch, value) {
      return tableData.filter((c) =>
        propsToSearch.some((name) =>
          c[name].toString().toLowerCase().includes(value.toLowerCase())
        )
      )
    },
    globalFind(page, id, obj) {
      let baseApiUrl = config.global.baseApiUrl
      this.isLoading = true
      let result = {}
      return axios
        .get(baseApiUrl + page + '/' + id)
        .then((response) => {
          Object.keys(obj).forEach((e) => {
            result[e] = response.data[e]
          })
          return result
        })
        .catch((error) => {
          return []
        })
        .finally(() => (this.isLoading = false))
    },
    globalClear(obj) {
      obj = {}
      return obj
    },
    globalFillObject(obj) {
      let result = {}
      Object.keys(obj).forEach((e) => {
        result[e] = obj[e]
      })
      return result
    },
    globalEdit(page, id, obj, redirect = null) {
      let baseApiUrl = config.global.baseApiUrl
      this.isLoading = true
      axios
        .put(baseApiUrl + page + '/' + id, obj)
        .then((response) => {
          this.globalSweetMessage(response.data.message)
          if (redirect) this.$router.push({ path: redirect })
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    globalPost(page, obj, redirect = null) {
      let baseApiUrl = config.global.baseApiUrl
      axios
        .post(baseApiUrl + page, obj)
        .then((response) => {
          this.globalSweetMessage(response.data.message)
          if (redirect) this.$router.push({ path: redirect })
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    globalFillCatalog(catalog) {
      let baseApiUrl = config.global.baseApiUrl
      return axios
        .get(baseApiUrl + 'catalogo/' + catalog)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          this.globalSweetMessage('Error al cargar la pagina', 'error')
        })
    },
    exportExcel(datos,file){
      const data =   Xlsx.utils.json_to_sheet(datos)
      const wb = Xlsx.utils.book_new()
      Xlsx.utils.book_append_sheet(wb, data, 'data')
      Xlsx.writeFile(wb,file+'.xlsx')
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
