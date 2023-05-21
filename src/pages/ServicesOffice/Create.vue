<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('services.byOffice') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/servicesoffice/index">
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
              <label class="col-sm-2 col-form-label">Servicio*</label>
              <div class="col-sm-10">
                <el-select
                  required
                  :readonly="readonly"
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Servicio"
                  v-model="serviceByOffice.servicioId"
                >
                  <el-option
                    v-for="option in selects.services"
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
              <label class="col-sm-2 col-form-label">Precio*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="precio"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :readonly="readonly"
                    v-model="serviceByOffice.precio"
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
              <label class="col-sm-2 col-form-label">Precio Minimo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="PrecioMinimo"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :readonly="readonly"
                    v-model="serviceByOffice.precioMinimo"
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
                  :readonly="readonly"
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Sucursal"
                  v-model="serviceByOffice.sucursalesId"
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
              <label class="col-sm-2 col-form-label">Estado*</label>
              <div class="col-sm-10">
                <el-select
                  required
                  :readonly="readonly"
                  filterable
                  class="select-primary mt-2 w-100"
                  size="large"
                  placeholder="Estado servicio"
                  v-model="serviceByOffice.estadoServicio"
                >
                  <el-option
                    v-for="option in selects.statusProduct"
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

              <router-link to="/servicesoffice/index">
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
import { Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('required', required)
extend('min', min)
extend('numeric', numeric)

export default {
  components: {
    Loading,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      readonly: false,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      selects: {
        simple: '',
        offices: [],
        statusProduct: [],
        services:[]
      },
      serviceCode: '',
      serviceByOffice: {
        id: 0,
        servicioId: '',
        precio: '',
        servicios: null,
        sucursales: null,
        precioMinimo: '',
        sucursalesId: '',
        estadoServicio: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id) this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    this.fillCatalog()
  },
  methods: {

    checkId() {
      axios
        .get(this.baseApiUrl + 'serviciossucursales/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
          this.serviceByOffice.servicioId = response.data.servicioId
          this.readonly = false
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      return (
        !this.serviceByOffice.precio ||
        !this.serviceByOffice.precioMinimo ||
        !this.serviceByOffice.sucursalesId ||
        !this.serviceByOffice.estadoServicio
      )
    },
    fillCatalog() {

      axios
        .get(this.baseApiUrl + 'catalogo/servicios') //check
        .then((response) => {
          this.selects.services = response.data
        })
        .catch((error) => {
          this.errored = true
        })

      axios
        .get(this.baseApiUrl + 'catalogo/estadoproducto') //check
        .then((response) => {
          this.selects.statusProduct = response.data
        })
        .catch((error) => {
          this.errored = true
        })

        axios
        .get(this.baseApiUrl + 'catalogo/sucursales')
        .then((response) => {
          this.selects.offices = response.data
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))

    },
    fillForm(obj) {
      this.serviceByOffice = {
        id: obj.id,
        servicioId: obj.servicios.id,
        precio: obj.precio,
        servicios: null,
        sucursales: null,
        precioMinimo: obj.precioMinimo,
        sucursalesId: obj.sucursalesId,
        estadoServicio: obj.estadoServicio
      }
      this.serviceCode = obj.servicios.codigo
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.serviceByOffice.precio = ''
      this.serviceByOffice.precioMinimo = ''
      this.serviceByOffice.sucursalesId = ''
      this.serviceByOffice.estadoServicio = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
          axios
            .put(
              this.baseApiUrl +
                'serviciossucursales/' +
                this.serviceByOffice.id,
              this.serviceByOffice
            )
            .then((response) => {
              this.globalSweetMessage(response.data.message)
              this.clear()
              this.$router.push({ path: '/servicesoffice/index' })
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
            .post(this.baseApiUrl + 'serviciossucursales', this.serviceByOffice)
            .then((response) => {
              this.globalSweetMessage(response.data.message)
              this.clear()
              this.$router.push({ path: '/servicesoffice/index' })
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

.inline {
  display: inline-block;
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
