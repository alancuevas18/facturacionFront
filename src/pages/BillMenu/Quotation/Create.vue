<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('global.add') }} {{ $t('shift.shift') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/shift/index">
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
              <label class="col-sm-2 col-form-label">Abierto Por*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="abiertoPor"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="shift.abiertoPor"
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
              <label class="col-sm-2 col-form-label">Abierto En</label>
              <div class="col-sm-4">
                <ValidationProvider
                  name="abiertoEn"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input>
                    <el-date-picker
                      type="date"
                      placeholder="Fecha de Apertura"
                      v-model="shift.abiertoEn"
                      :error="errors[0]"
                      :class="[
                        { 'has-success': passed },
                        { 'has-danger': failed }
                      ]"
                    >
                    </el-date-picker>
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Cerrado Por*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="cerradoPor"
                  rules="min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    v-model="shift.cerradoPor"
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
              <label class="col-sm-2 col-form-label">Cerrado En</label>
              <div class="col-sm-4">
                <ValidationProvider
                  name="cerradoEn"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input>
                    <el-date-picker
                      type="date"
                      placeholder="Fecha de Cierre"
                      v-model="shift.cerradoEn"
                      :error="errors[0]"
                      :class="[
                        { 'has-success': passed },
                        { 'has-danger': failed }
                      ]"
                    >
                    </el-date-picker>
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Monto Inicial*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="montoInicial"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="shift.montoInicial"
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
              <label class="col-sm-2 col-form-label">Monto Cierre*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="montoCierre"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="shift.montoCierre"
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
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Sucursal</label>
              <div class="col-sm-4">
                <el-select
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Sucursal"
                  v-model="shift.sucursalId"
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
            <div class="row">
              <label class="col-sm-2 col-form-label">Estado</label>
              <div class="col-sm-4">
                <el-select
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Sucursal"
                  v-model="shift.estadoTurno"
                >
                  <el-option
                    v-for="option in selects.shiftStatus"
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

              <router-link to="/shift/index">
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
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      selects: {
        simple: '',
        shiftStatus: [],
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      shift: {
        codigo: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id) this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.shift.nationalID
  },
  methods: {
    checkId() {
      axios
        .get(this.baseApiUrl + 'Vendedores/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      return (
        !this.shift.nombre || !this.shift.apellido || !this.shift.identificacion
      )
    },
    fillForm(obj) {
      this.shift = {
        estadoVendedores: obj.estadoVendedores,
        personaId: obj.personaId,
        codigo: obj.codigo,
        nombre: obj.nombre,
        apellido: obj.apellido,
        identificacion: this.shift.identificacion
          ? this.shift.identificacion
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
      this.shift.codigo = ''
      this.shift.nombre = ''
      this.shift.apellido = ''
      this.shift.identificacion = ''
      this.shift.correo = ''
      this.shift.direccion = ''
      this.shift.celular = ''
      this.shift.telefono = ''
      this.shift.estadoVendedores = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'Vendedores/' + this.shift.id, this.shift)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/shift/index' })
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
          .post(this.baseApiUrl + 'Vendedores', this.shift)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/shift/index' })
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
