<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('deliveries.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/deliveries/index">
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
              <label class="col-sm-2 col-form-label">Celular*</label>
              <div class="col-sm-10">
                <div class="input-group mb-3">
                  <input type="number" 
                    class="form-control" 
                    placeholder="Escriba la celular y presione 'Enter'" 
                    autofocus
                    v-model="delivery.celular"
                    v-on:keyup.enter="checkCelular()">
                  <div class="input-group-append">
                    <button 
                    class="btn btn-outline-secondary m-0" 
                    type="button" 
                    @click="checkCelular()">Verificar</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Identificación</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="identificacion"
                  rules="min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    v-model="delivery.identificacion"
                    :readonly="readOnly"
                    :key="readOnly"
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
                    v-model="delivery.nombre"
                    :readonly="readOnly"
                    :key="readOnly"
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
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="delivery.apellido"
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
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="delivery.correo"
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
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="delivery.direccion"
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
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="delivery.telefono"
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
                  :readonly="readOnly"
                  :key="readOnly"
                  required
                  class="select-primary"
                  size="large"
                  placeholder="Status"
                  v-model="delivery.estadoMensajero"
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

              <router-link to="/deliveries/index">
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
      readOnly: false,
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
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      delivery: {
        codigo: '',
        nombre: '',
        apellido: '',
        identificacion: '',
        correo: '',
        direccion: '',
        celular: '',
        telefono: '',
        estadoMensajero: '',
        personaId: 0,
        id: 0,
        estadoPersona: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id) this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.delivery.nationalID
  },
  methods: {
    checkId() {
      axios
        .get(this.baseApiUrl + 'Mensajeros/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    checkIdentification() {
      this.isLoading = true
      axios
        .get(
          this.baseApiUrl +
            'Mensajeros/byidentificacion/' +
            this.delivery.identificacion
        )
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Mensajero existe!', 'warning')
            this.$router.push({ path: '/deliveries/index' })
          } else {
            this.readOnly = response.data.personaId > 0
          }
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.globalSweetMessage('Error al consultar identificacion', 'error')
        })
        .finally(() => (this.isLoading = false))
      this.checkedID = false
    },
    checkCelular() {
      this.isLoading = true
      axios
        .get(
          this.baseApiUrl +
            'Mensajeros/byCelular/' +
            this.delivery.celular
        )
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Mensajero existe!', 'warning')
            this.$router.push({ path: '/deliveries/index' })
          } 
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.globalSweetMessage('Error al consultar celular', 'error')
        })
        .finally(() => (this.isLoading = false))
      this.checkedID = false
    },
    validateFields() {
      return (
        !this.delivery.nombre ||
        !this.delivery.apellido ||
        !this.delivery.identificacion
      )
    },
    fillForm(obj) {
      this.delivery = {
        estadoMensajero: obj.estadoMensajero,
        personaId: obj.personaId,
        codigo: obj.codigo,
        nombre: obj.nombre,
        apellido: obj.apellido,
        identificacion: this.delivery.identificacion
          ? this.delivery.identificacion
          : obj.identificacion,
        correo: obj.correo,
        direccion: obj.direccion,
        celular: obj.celular,
        telefono: obj.telefono,
        estadoPersona: true,
        id: obj.id
      }
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.delivery.codigo = ''
      this.delivery.nombre = ''
      this.delivery.apellido = ''
      this.delivery.identificacion = ''
      this.delivery.correo = ''
      this.delivery.direccion = ''
      this.delivery.celular = ''
      this.delivery.telefono = ''
      this.delivery.estadoMensajero = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(
            this.baseApiUrl + 'Mensajeros/' + this.delivery.id,
            this.delivery
          )
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/deliveries/index' })
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
        axios
          .post(this.baseApiUrl + 'Mensajeros', this.delivery)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/deliveries/index' })
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
