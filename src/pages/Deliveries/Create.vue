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
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Escriba la celular y presione 'Enter'"
                    autofocus
                    v-model="delivery.celular"
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
              <router-link to="/deliveries/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
              
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="!id ? create() : edit()"
                :disabled="checkedID"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >
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
    if (this.id)
      this.globalFind('mensajeros', this.id, this.delivery).then((response) => {
        Object.keys(this.delivery).forEach((e) => {
          this.delivery[e] = response[e]
        })
      })

    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.delivery.nationalID
  },
  methods: {
    checkCelular() {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'Mensajeros/byCelular/' + this.delivery.celular)
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Mensajero existe!', 'warning')
            this.$router.push({ path: '/deliveries/index' })
          }
          let celular = this.delivery.celular
          this.delivery = this.globalFillObject(response.data)
          this.delivery.celular = celular
        })
        .catch(() => {
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
    edit() {
      if (this.validateFields())
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      else {
        this.globalEdit(
          'mensajeros',
          this.id,
          this.delivery,
          '/deliveries/index'
        )
        this.delivery = this.globalClear(this.delivery)
      }
    },
    create() {
      if (this.validateFields())
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      else {
        this.globalPost('mensajeros', this.delivery, '/deliveries/index')
        this.delivery = this.globalClear(this.delivery)
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
