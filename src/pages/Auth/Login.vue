<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white">
            <template slot="">
              <h2 class="card-title">{{ $t('global.wellcome') }}</h2>
            </template>

            <div>
              <ValidationProvider
                name="usuario"
                rules="required"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="user.usuario"
                  type="text"
                  placeholder="Usuario"
                  addon-left-icon="tim-icons icon-email-85"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>

              <ValidationProvider
                name="contrasena"
                rules="required|min:5"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="user.contrasena"
                  placeholder="Contrasena"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>
            </div>

            <div slot="footer">
              <base-button
                native-type="submit"
                type="info"
                class="mb-3"
                size="lg"
                block
              >
                {{ $t('global.login') }}
              </base-button>
              <div class="pull-left"></div>

              <div class="pull-right">
                <h6>
                  <a href="#" class="link footer-link">{{
                    $t('global.needHelp')
                  }}</a>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { extend } from 'vee-validate'
import { required, min } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('min', min)

extend('required', required)

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      usuario: '',
      contrasena: '',
      baseApiUrl: '',
      user: {}
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.user.usuario = 'eliezerm25'
    this.user.contrasena = 'eliezer@'
  },
  methods: {
    async submit() {
      this.isLoading = true
      this.user = {
        usuario: this.user.usuario,
        contrasena: this.user.contrasena
      }
      await axios
        .post('https://emacsoft.com/Authorization/Token', this.user)
        .then((response) => {
          let rol = response.data.result.roles[0] ?? 'Root'
          localStorage.setItem('token', response.data.result.token)
          localStorage.setItem('isAuthenticated', 'true')
          this.$store.commit('setAuthenticated', true)
          this.$store.commit('setToken', response.data.result.token)          
          this.$store.commit('setSucursal',response.data.result.sucursal)
          this.$store.commit('setUsuario', this.user.usuario)
          this.$store.commit('setRol', rol)
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.result.token
          if (rol == 'Supervisor')
            this.$router.push({ path: '/billDashboard/index' })
          else if (rol == 'Vendedor')
            this.$router.push({ path: '/billDashboard/bill/index' })
          else this.$router.push({ path: '/' })
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
