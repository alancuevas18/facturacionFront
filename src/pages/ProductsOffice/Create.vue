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
              <label class="col-sm-2 col-form-label">Codigo*</label>
              <div class="col-sm-8 p-0">
                <ValidationProvider
                  name="codigo"
                  rules="required|min:1"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="productCode"
                    class="mr-1"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
              <div class="col-sm-1">
                <base-button
                  type="success"
                  class="animation-on-hover ml-0 p-2"
                  size="md"
                  @click.native="checkCode()"
                  ><i class="tim-icons icon-check-2"></i
                ></base-button>
              </div>
              <div class="col-sm-1">
                <base-button
                  type="info"
                  class="animation-on-hover ml-0 p-2"
                  size="md"
                  @click.native="suggestCode()"
                  ><i class="tim-icons icon-zoom-split"></i
                ></base-button>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Stock*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Stock"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="productByOffice.stock"
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
              <label class="col-sm-2 col-form-label">StockMinimo*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="StockMinimo"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
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
              <label class="col-sm-2 col-form-label">Total*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Total"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="productByOffice.total"
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
                  class="select-primary"
                  size="large"
                  placeholder="Sucursal"
                  v-model="productByOffice.sucursal"
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
              <label class="col-sm-2 col-form-label">estadoProductos*</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary mt-2"
                  size="large"
                  placeholder="Estado Producto"
                  v-model="productByOffice.estadoProductos"
                >
                  <el-option
                    v-for="option in selects.statusProduct"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
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

              <router-link to="/productsoffice/index">
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
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      selects: {
        simple: '',
        offices: [],
        statusProduct: [
          { value: 1, label: 'Activo' },
          { value: 2, label: 'Inactivo' },
          { value: 2, label: 'Agotado' }
        ]
      },
      productCode: '',
      productByOffice: {
        id: '',
        productoId: '',
        stock: '',
        stockMinimo: '',
        precio: '',
        productos: null,
        sucursales: null,
        precioMinimo: '',
        sucursalesId: 0,
        estadoProductos: '',
        total: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    if (this.id) this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    this.fillCatalog()
  },
  methods: {
    checkCode() {
      axios
        .get(
          this.baseApiUrl +
            'productos/bycodigoornombre/null/' +
            this.productCode
        )
        .then((response) => {
          this.productByOffice.productoId = response.data[0].id
        })
        .catch((error) => {
          this.globalSweetMessage('Codigo invalido', 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    checkId() {
      axios
        .get(this.baseApiUrl + 'productos/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data.result)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      console.log(this.productByOffice)
      return (
        !this.productByOffice.stock ||
        !this.productByOffice.stockMinimo ||
        !this.productByOffice.precio ||
        !this.productByOffice.precioMinimo ||
        !this.productByOffice.sucursalesId ||
        !this.productByOffice.estadoProductos ||
        !this.productByOffice.total
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
    },
    fillForm(obj) {
      this.product = {
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        codigo: obj.codigo,
        marcaId: obj.marcaId,
        marcas: null,
        imagen: obj.imagen,
        tipoProductoId: obj.tipoProductoId,
        tipoProductos: null,
        validarCodigo: true,
        id: obj.id
      }
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.product.codigo = ''
      this.product.nombre = ''
      this.product.imagen = ''
      this.product.descripcion = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        if (!this.productByOffice.id) this.checkCode()
        else {
          axios
            .put(
              this.baseApiUrl + 'productos/' + this.productByOffice.id,
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
      }
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        if (!this.productByOffice.id) this.checkCode()
        else {
          axios
            .post(this.baseApiUrl + 'productossucursales', this.productByOffice)
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
