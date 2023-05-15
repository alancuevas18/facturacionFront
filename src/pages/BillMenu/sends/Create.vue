<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('global.add') }} {{ $t('sends.sends') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }}
          <router-link to="/billDashboard/sends/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div class="row">
        <div class="col-ms-12 col-md-4">
            <h4 slot="header" class="card-title">
                    Datos de la factura
                </h4>

            <div class="row">
                <label class="col-sm-4 col-form-label">Cliente</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.nombre}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Identificación</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.identificacion}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Vendedor</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas?.vendedores}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Sucursal</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.sucursales?.nombre}}</label>              
                </div>           
            </div>
            
            <div class="row">
                <label class="col-sm-4 col-form-label">Fecha</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.fecha}}</label>              
                </div>           
            </div>


     
        </div>       
        <div class="col-ms-12 col-md-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
            <div class="row">
              <label class="col-sm-2 col-form-label">Codigo Factura</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Codigo Factura"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.facturaId"
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
              <label class="col-sm-2 col-form-label">Cliente</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="cliente"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.cliente"
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
              <label class="col-sm-2 col-form-label">Numero Contacto</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Numero Contacto"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.numeroContacto"
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
              <label class="col-sm-2 col-form-label">Direccion</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Direccion"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.direccion"
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
              <label class="col-sm-2 col-form-label">Fecha Envio</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Fecha Envio"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.fechaEnvio"
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
              <label class="col-sm-2 col-form-label">Fecha Entrega</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Fecha Entrega"
                  rules=""
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="send.fechaEntrega"
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
              <label class="col-sm-2 col-form-label mt-2">Sucursal</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Sucursal"
                  v-model="send.sucursalId"
                >
                  <el-option
                    v-for="option in selects.sucursales"
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
              <label class="col-sm-2 col-form-label mt-2">Mensajero</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Mensajero"
                  v-model="send.mensajeroId"
                >
                  <el-option
                    v-for="option in selects.mensajeros"
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
              <label class="col-sm-2 col-form-label mt-2">Estado Envio</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Estado Envio"
                  v-model="send.estadoEnvios"
                >
                  <el-option
                    v-for="option in selects.estadoEnvios"
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
              <label class="col-sm-2 col-form-label mt-2">Nota</label>
              <div class="col-sm-10">
                <textarea class="form-control" v-model="send.nota"></textarea>
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

              <router-link to="/billDashboard/sends/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
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
      validInvoice: false,
      readOnly: false,
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      selects: {
        sucursales: [],
        clientes: [],
        vendedores: []
      },
      facturas:{
        sucursales:{nombre:''}
      },
      send: {
        id: 0,
        cliente: null,
        numeroContacto: null,
        direccion: null,
        fechaEnvio: null,
        fechaEntrega: null,
        nota: null,
        sucursalId: null,
        sucursales: null,
        facturaId: null,
        facturas: null,
        mensajeroId: null,
        mensajeros: null,
        estadoEnvios: null
      }
    }
  },
 async mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id) await this.checkId()
    this.checkedID = !this.id
     this.fillCatalogs([
      'sucursales',
      'vendedores',
      'clientes',
      'mensajeros',
      'estadoEnvios'
    ])
  },
  methods: {
   async checkId() {
  await axios
        .get(this.baseApiUrl + 'envios/' + this.id)
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
        !this.send.sucursalId ||
        !this.send.mensajeroId ||
        !this.send.estadoEnvios ||
        !this.send.fechaEnvio ||
        !this.send.direccion ||
        !this.send.cliente ||
        !this.send.numeroContacto
      )
    },
    fillForm(obj) {
      this.send = {
        id: obj.id,
        cliente: obj.cliente,
        numeroContacto: obj.numeroContacto,
        direccion: obj.direccion,
        fechaEnvio: obj.fechaEnvio,
        fechaEntrega: obj.fechaEntrega,
        nota: obj.nota,
        sucursalId: obj.sucursalId,
        facturaId: obj.facturaId,
        mensajeroId: obj.mensajeroId,
        estadoEnvios: obj.estadoEnvios
      }
    },
    clear() {
      this.send.sucursalId = ''
      this.send.mensajeroId = ''
      this.send.estadoEnvios = ''
      this.send.fechaEnvio = ''
      this.send.direccion = ''
      this.send.cliente = ''
      this.send.numeroContacto = ''
    },
    edit() {
      this.validateInvoice()
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else if (!this.validInvoice) {
        this.globalSweetMessage('Favor insertar factura valida!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'Envios/' + this.send.id, this.send)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/sends/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {
      this.validateInvoice()
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else if (!this.validInvoice) {
        this.globalSweetMessage('Favor insertar factura valida!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'Envios', this.send)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/sends/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    fillCatalogs(catalogs) {
      console.log(this.send)
      axios
        .get(this.baseApiUrl + 'facturas/' + this.send.facturaId)
        .then((response) => {
          console.log(response)
          this.factura=response.data
        })
      catalogs.forEach((catalog) => {
        axios
          .get(this.baseApiUrl + 'catalogo/' + catalog)
          .then((response) => {
            this.selects[catalog] = response.data
          })
          .catch((error) => {
            this.globalSweetMessage('Error al cargar la pagina', 'error')
          })
      })
    },
    validateInvoice() {
      return axios
        .get(this.baseApiUrl + 'facturas/' + this.send.facturaId)
        .then((res) => {
          if (res.data.id != 0) this.validInvoice = true
          else this.validInvoice = false
        })
        .catch((error) => {
          this.globalSweetMessage('No se pudo comprobar la factura')
        })
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
