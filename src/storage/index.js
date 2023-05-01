import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import router from '../routes/router'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: '',
    usuario: '',
    office: '',
    routerHistory:[],
    password: '',
    rol: ''
  },
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value
    },
    setUsuario(state, userName) {
      state.usuario = userName
    },
    setSucursal(state,oficina) {
      state.office=oficina
    },
    setToken(state, token) {
      state.token = token
    },
    setRol(state, rol) {
      state.rol = rol
    },
    logOut(state) {
      router.push('/login')
      state.isAuthenticated = false
      state.token = ''
      state.usuario = ''
      state.rol = ''
      localStorage.removeItem('token')
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
