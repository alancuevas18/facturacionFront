<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('suppliers.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }}
          <router-link to="/suppliers/index">
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
              <label class="col-sm-2 col-form-label">Codigo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="codigo"
                  rules="required"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.code"
                    :readonly="id"
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
              <label class="col-sm-2 col-form-label">Nombre*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Nombre"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.name"
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
                  name="Apellido"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.lastName"
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
              <label class="col-sm-2 col-form-label">Identificacion*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Identificacion"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.nationalID"
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
                  name="Correo"
                  rules="required|email"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.email"
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
              <label class="col-sm-2 col-form-label">Direccion*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Direccion"
                  rules="required"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.address"
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
              <label class="col-sm-2 col-form-label">Celular*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Celular"
                  rules="required|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.cellPhone"
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
              <label class="col-sm-2 col-form-label">Telefono*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Telefono"
                  rules="required|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="supplier.phone"
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
              <label class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-10">
                <el-select
                  required
                  class="select-primary"
                  size="large"
                  placeholder="Status"
                  v-model="supplier.status"
                >
                  <el-option
                    v-for="option in selects.options"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
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

              <router-link to="/suppliers/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >Cancel</base-button
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
import { DatePicker, Select, Option } from 'element-ui'
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
    [DatePicker.name]: DatePicker,
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
      fixedCode: '',
      selects: {
        simple: '',
        options: [
          { value: 'active', label: 'Activo' },
          { value: 'inactive', label: 'Inactivo' }
        ]
      },
      supplier: [
        {
          code: '',
          name: '',
          lastName: '',
          nationalID: '',
          email: '',
          address: '',
          cellPhone: '',
          phone: '',
          status: ''
        }
      ]
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id = '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    if (this.id) {
      this.fillForm()
    }
  },
  methods: {
    validateFields() {
      return (
        !this.supplier.code ||
        !this.supplier.name ||
        !this.supplier.lastName ||
        !this.supplier.nationalID ||
        !this.supplier.email ||
        !this.supplier.address ||
        !this.supplier.cellPhone ||
        !this.supplier.phone ||
        !this.supplier.status
      )
    },
    fillForm() {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'suplidores/' + this.id)
        .then((response) => {
          this.fixedCode = response.data.codigo
          this.supplier = {
            code: response.data.codigo,
            name: response.data.nombre,
            lastName: response.data.apellido,
            nationalID: response.data.identificacion,
            email: response.data.correo,
            address: response.data.direccion,
            cellPhone: response.data.celular,
            phone: response.data.telefono,
            status: response.data.estadoSuplidor ? 'active' : 'inactive',
            id: response.data.id,
            personaId: response.data.personaId
          }
          console.log(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    clear() {
      this.supplier.code = ''
      this.supplier.name = ''
      this.supplier.lastName = ''
      this.supplier.nationalID = ''
      this.supplier.email = ''
      this.supplier.address = ''
      this.supplier.cellPhone = ''
      this.supplier.phone = ''
      this.supplier.status = ''
    },
    edit() {
      let supplier = {
        nombre: this.supplier.name,
        estadoSuplidor: this.supplier.status == 'active' ? true : false,
        personaId: this.supplier.personaId,
        codigo: this.fixedCode,
        apellido: this.supplier.lastName,
        identificacion: this.supplier.nationalID,
        correo: this.supplier.email,
        direccion: this.supplier.address,
        celular: this.supplier.cellPhone,
        telefono: this.supplier.phone,
        estadoPersona: this.supplier.status == 'active' ? true : false,
        id: this.supplier.id
      }
      console.log(supplier)
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'suplidores/' + this.id, supplier)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/suppliers/index' })
          })
          .catch((error) => {
            this.globalSweetMessage('Error al ejecutar accion', 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {
      let supplier = {
        nombre: this.supplier.name,
        estadoSuplidor: this.supplier.status == 'active' ? true : false,
        personaId: 0,
        codigo: this.supplier.code,
        apellido: this.supplier.lastName,
        identificacion: this.supplier.nationalID,
        correo: this.supplier.email,
        direccion: this.supplier.address,
        celular: this.supplier.cellPhone,
        telefono: this.supplier.phone,
        estadoPersona: this.supplier.status == 'active' ? true : false,
        id: 0
      }
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'suplidores', supplier)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/suppliers/index' })
          })
          .catch((error) => {
            this.globalSweetMessage('Error al ejecutar accion', 'error')
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
