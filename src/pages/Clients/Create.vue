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
          {{ title }} / Cliente: <b>{{ currentCode }}</b>
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
              <label class="col-sm-2 col-form-label">Celular*</label>
              <div class="col-sm-10">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Escriba la celular y presione 'Enter'"
                    autofocus
                    v-model="client.celular"
                    v-on:keyup.enter="checkCelular()"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary m-0"
                      type="button"
                      @click="checkCelular()"
                    >
                      Verificar
                    </button>
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
                    v-model="client.identificacion"
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
                    v-model="client.nombre"
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
                    v-model="client.apellido"
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
                    v-model="client.correo"
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
                    v-model="client.direccion"
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
              <label class="col-sm-2 col-form-label">Telefono</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Telefono"
                  rules="numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.telefono"
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
              <label class="col-sm-2 col-form-label">Nombre Empresa</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="empresa"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresa"
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
              <label class="col-sm-2 col-form-label">Rnc</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="empresaRnc"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresaRnc"
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
              <label class="col-sm-2 col-form-label">Telefono empresa</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="empresaTelefono"
                  rules="required|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresaTelefono"
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
              <label class="col-sm-2 col-form-label">Direccion empresa</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="empresaDireccion"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresaDireccion"
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
              <label class="col-sm-2 col-form-label">Estado</label>
              <div class="col-sm-10">
                <el-select
                  :disabled="checkedID"
                  :readonly="readOnly"
                  :key="readOnly"
                  required
                  class="select-primary"
                  size="large"
                  placeholder="Estado"
                  v-model="client.estadoClientes"
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
      selects: {
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      client: {
        codigo: '',
        nombre: '',
        apellido: '',
        identificacion: '',
        correo: '',
        direccion: '',
        celular: '',
        telefono: '',
        estadoClientes: '',
        personaId: 0,
        id: 0,
        estadoPersona: true,
        empresa: '',
        empresaTelefono: '',
        empresaDireccion: '',
        empresaRnc: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id)
      this.globalFind('clientes', this.id, this.client).then((response) => {
        Object.keys(this.client).forEach((e) => {
          this.client[e] = response[e]
        })
      })

    this.currentCode = !this.id ? '' : this.id
    this.checkedID = !this.id && !this.client.identificacion
  },
  methods: {
    checkIdentification() {
      this.isLoading = true
      axios
        .get(
          this.baseApiUrl +
            'clientes/byidentificacion/' +
            this.client.identificacion
        )
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Cliente existe!', 'warning')
            this.$router.push({ path: '/clients/index' })
          } else {
            let identificacion = this.client.identificacion
            this.readOnly = response.data.personaId > 0
            this.client = this.globalFillObject(response.data)
            this.client.identificacion = identificacion
          }
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
        .get(this.baseApiUrl + 'clientes/byCelular/' + this.client.celular)
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Cliente existe!', 'warning')
            this.$router.push({ path: '/clients/index' })
          } else {
            let celular = this.client.celular
            this.client = this.globalFillObject(response.data)
            this.client.celular = celular
          }
        })
        .catch((error) => {
          this.globalSweetMessage('Error al consultar celular', 'error')
        })
        .finally(() => (this.isLoading = false))
      this.checkedID = false
    },
    validateFields() {
      return (
        !this.client.nombre ||
        !this.client.apellido ||
        !this.client.identificacion
      )
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.globalEdit('clientes', this.id, this.client, '/clients/index')
        this.client = this.globalClear(this.client)
      }
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.globalPost('clientes', this.client, '/clients/index')
        this.client = this.globalClear(this.client)
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
input:read-only {
  color: white;
}
</style>
