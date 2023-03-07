<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('clients.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/clients/index">
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
              <label class="col-sm-2 col-form-label">Identificacion*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Identificacion"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    title="Escriba la identificaion y presione 'Enter'"
                    placeholder="Escriba la identificaion y presione 'Enter'"
                    required
                    autofocus
                    v-on:keyup.enter="checkIdentification()"
                    v-model="client.nationalID"
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
                    :disabled="checkedID"
                    v-model="client.name"
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
                    :disabled="checkedID"
                    v-model="client.lastName"
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
                    :disabled="checkedID"
                    v-model="client.email"
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
                    :disabled="checkedID"
                    v-model="client.address"
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
                    :disabled="checkedID"
                    v-model="client.cellPhone"
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
                    :disabled="checkedID"
                    v-model="client.phone"
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
                  :disabled="checkedID"
                  required
                  class="select-primary"
                  size="large"
                  placeholder="Status"
                  v-model="client.status"
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
                :disabled="checkedID"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/clients/index">
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
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      mandatoryFields: ['name', 'lastName', 'nationalID'],
      selects: {
        simple: '',
        options: [
          { value: 'active', label: 'Activo' },
          { value: 'inactive', label: 'Inactivo' }
        ]
      },
      client: [
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
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    if (this.id) this.fillForm(this.id)
    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.client.nationalID
  },
  methods: {
    checkIdentification() {
      this.isLoading = true
      axios
        .get(
          this.baseApiUrl +
            'clientes/byidentificacion/' +
            this.client.nationalID
        )
        .then((response) => {
          if (response.data.id > 0) {
            this.title = 'Editar'
            this.globalSweetMessage('Cliente existente')
            //no editar si existe la persona llenar los campos y personaID
            this.id = response.data.id
          }
          this.fillForm(response.data.id)
        })
        .catch((error) => {
          this.globalSweetMessage('Error al consultar identificacion', 'error')
        })
        .finally(() => (this.isLoading = false))
      this.checkedID = false
    },
    validateFields() {
      this.mandatoryFields.forEach((field) => {
        this.client[field]
      })
      // return (
      //   !this.client.code ||
      //   !this.client.name ||
      //   !this.client.lastName ||
      //   !this.client.nationalID ||
      //   !this.client.email ||
      //   !this.client.address ||
      //   !this.client.cellPhone ||
      //   !this.client.phone ||
      //   !this.client.status
      // )
    },
    fillForm(id) {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'clientes/' + id)
        .then((response) => {
          this.currentCode = ' / Codigo: ' + response.data.codigo
          this.fixedCode = response.data.codigo
          this.client = {
            code: response.data.codigo,
            name: response.data.nombre,
            lastName: response.data.apellido,
            nationalID: this.client.nationalID
              ? this.client.nationalID
              : response.data.identificacion,
            email: response.data.correo,
            address: response.data.direccion,
            cellPhone: response.data.celular,
            phone: response.data.telefono,
            status: response.data.estadoClientes ? 'active' : 'inactive',
            id: response.data.id,
            personaId: response.data.personaId
          }
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    clear() {
      this.client.code = ''
      this.client.name = ''
      this.client.lastName = ''
      this.client.nationalID = ''
      this.client.email = ''
      this.client.address = ''
      this.client.cellPhone = ''
      this.client.phone = ''
      this.client.status = ''
    },
    edit() {
      let client = {
        nombre: this.client.name,
        estadoClientes: this.client.status == 'active' ? true : false,
        personaId: this.client.personaId,
        codigo: this.fixedCode,
        apellido: this.client.lastName,
        identificacion: this.client.nationalID,
        correo: this.client.email,
        direccion: this.client.address,
        celular: this.client.cellPhone,
        telefono: this.client.phone,
        estadoPersona: this.client.status == 'active' ? true : false,
        id: this.client.id
      }
      console.log(client)
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'clientes/' + this.id, client)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/clients/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {
      let client = {
        nombre: this.client.name,
        estadoClientes: this.client.status == 'active' ? true : false,
        personaId: 0,
        codigo: '',
        apellido: this.client.lastName,
        identificacion: this.client.nationalID,
        correo: this.client.email ?? null,
        direccion: this.client.address ?? null,
        celular: this.client.cellPhone ?? null,
        telefono: this.client.phone ?? null,
        estadoPersona: this.client.status == 'active' ? true : false,
        id: 0
      }
      console.log(client)
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'clientes', client)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/clients/index' })
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

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
