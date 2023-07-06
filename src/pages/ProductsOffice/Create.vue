<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('products.byOffice') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/productsoffice/index">
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
              <label class="col-sm-2 col-form-label">Codigo:</label>
              <div class="col-sm-10">
                <label class="col-form-label"> {{ productCode }}</label>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Producto:</label>
              <div class="col-sm-10">
                <label class="col-form-label"> {{ productNombre }}</label>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Stock:</label>
              <div class="col-sm-10">
                <label class="col-form-label">
                  {{ productByOffice.stock }}</label
                >
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">StockMinimo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="StockMinimo"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    :readonly="readonly"
                    v-model="productByOffice.stockMinimo"
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
                    v-model="productByOffice.precio"
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
              <label class="col-sm-2 col-form-label">PrecioMinimo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="PrecioMinimo"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :readonly="readonly"
                    v-model="productByOffice.precioMinimo"
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
              <label class="col-sm-2 col-form-label">Total:</label>
              <div class="col-sm-10">
                <label class="col-form-label">
                  {{ productByOffice.total }}</label
                >
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Sucursal:</label>
              <div class="col-sm-10 pt-1">
                <label class="p-2"> {{ productByOffice.sucursales  }}</label>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Estado:</label>
              <div class="col-sm-10">
                <label class="col-form-label"> {{ productByOffice.estadoProductosName  }}</label>

              </div>
            </div>
            <div class="row d-flex justify-content-center">   
              <router-link to="/productsoffice/index">
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
      readonly: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      selects: {
        simple: '',
        offices: [],
        statusProduct: []
      },
      offices: '',
      productCode: '',
      productNombre: '',
      productByOffice: {
        id: 0,
        productoId: '',
        stock: '',
        stockMinimo: '',
        precio: '',
        productos: null,
        sucursales: null,
        precioMinimo: '',
        sucursalesId: '',
        estadoProductos: '',
        total: 0
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
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'productossucursales/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
          this.readonly = false
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      return (
        !this.productByOffice.precio ||
        !this.productByOffice.sucursalesId 
      )
    },
    fillCatalog() {
      axios
        .get(this.baseApiUrl + 'catalogo/sucursales')
        .then((response) => {
          this.selects.offices = response.data
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
      axios
        .get(this.baseApiUrl + 'catalogo/estadoproducto')
        .then((response) => {
          this.selects.statusProduct = response.data
        })
        .catch((error) => {
          this.errored = true
        })
    },
    fillForm(obj) {
      this.productByOffice = {
        id: obj.id,
        productoId: obj.productos.id,
        stock: obj.stock,
        stockMinimo: obj.stockMinimo,
        precio: obj.precio,
        productos: null,
        sucursales: obj.sucursales,
        precioMinimo: obj.precioMinimo,
        sucursalesId: obj.sucursalesId,
        estadoProductos: obj.estadoProductos,
        estadoProductosName: obj.estadoProductosName,
        total: obj.total
      }
      this.productCode = obj.productos.codigo
      this.productNombre= obj.productos.nombre
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.productByOffice.stock = ''
      this.productByOffice.stockMinimo = ''
      this.productByOffice.precio = ''
      this.productByOffice.precioMinimo = ''
      this.productByOffice.sucursalesId = ''
      this.productByOffice.estadoProductos = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true

        axios
          .put(
            this.baseApiUrl + 'productossucursales/' + this.productByOffice.id,
            this.productByOffice
          )
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/productsoffice/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {}
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
