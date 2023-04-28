<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('users.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }}
          <router-link to="/users/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
            <div class="row">
              <label class="col-sm-2 col-form-label">Nombre*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="nombre"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="user.nombre"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Apellido*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="apellido"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="user.apellido"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Nombre de Usuario*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="nombreUsuario"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="user.nombreUsuario"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Contraseña*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="contrasena"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    type="password"
                    required
                    autofocus
                    v-model="user.contrasena"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Correo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="correo"
                  rules="required|email|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="user.correo"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Sucursal*</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Sucursal"
                  v-model="user.sucursalId"
                >
                  <el-option
                    v-for="option in selects.offices"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="!id ? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/users/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio } from 'src/components/index'
import { Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('email', email)
extend('required', required)
extend('min', min)
extend('numeric', numeric)

export default {
  components: {
    Loading,
    BaseCheckbox,
    BaseRadio,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      title: '',
      selects: { offices: [] },
      user: {
        id: 0,
        nombre: '',
        apellido: '',
        nombreUsuario: '',
        contrasena: '',
        correo: '',
        bloqueado: null,
        sucursalId: '',
        createdBy: null,
        modifiedBy: null,
        createdDate: null,
        modifiedDate: null,
        deleted: null,
        sucursales: null
        // usuarioSucursal: {
        //     id: 0,
        //     createdBy : null,
        //     modifiedBy: null,
        //     createdDate: null,
        //     modifiedDate: null,
        //     deleted: null,
        //     sucursales: null,
        //     sucursalId: null,
        //     usuarioId: null,
        //     nombreUsuario: null,
        // }
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id = '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    this.fillCatalog()
    if (this.id) this.fillForm()
  },
  methods: {
    fillCatalog() {
      axios.get(this.baseApiUrl + 'catalogo/sucursales').then((response) => {
        this.selects.offices = response.data
      })
    },
    validateFields() {
      return (
        !this.user.nombre ||
        !this.user.apellido ||
        !this.user.nombreUsuario ||
        !this.user.contrasena ||
        !this.user.correo ||
        !this.user.sucursalId
      )
    },
    fillForm() {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'marcas/' + this.id)
        .then((response) => {
          this.brand = {
            id: response.data.id,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            nombreUsuario: response.data.nombreUsuario,
            contrasena: response.data.contrasena,
            correo: response.data.correo,
            sucursalId: response.data.sucursalId
          }
        })
        .catch((error) => {
          this.globalSweetMessage('Error al cargar la pagina', 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    clear() {
      this.user.nombre = ''
      this.user.apellido = ''
      this.user.nombreUsuario = ''
      this.user.contrasena = ''
      this.user.correo = ''
      this.user.sucursalId = ''
    },
    edit() {
      let brand = {
        id: this.brand.id,
        descripcion: this.brand.description
      }
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'marcas/' + this.brand.id, brand)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/users/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        console.log(this.user)
        axios
          .post(this.baseApiUrl + 'usuario/register', this.user)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/users/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    }
  }
}
</script>
<style>
.floatr {
  float: right;
}
</style>
