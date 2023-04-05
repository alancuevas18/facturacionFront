<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('products.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/products/index">
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
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="product.codigo"
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
                    v-model="product.nombre"
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
              <label class="col-sm-2 col-form-label">Descripcion*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="descripcion"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="product.descripcion"
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
              <label class="col-sm-2 col-form-label">Imagen*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="imagen"
                  rules="required"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="product.imagen"
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
            <div class="row mb-2">
              <label class="col-sm-2 col-form-label">Validar Codigo</label>
              <div class="col-sm-10">
                <BaseCheckbox
                  v-model="product.validarCodigo"
                  :checked="product.validarCodigo"
                  class="m-0 p-0"
                >
                </BaseCheckbox>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Marca</label>
              <div class="col-sm-10">
                <el-select
                  :readonly="readOnly"
                  :key="readOnly"
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="marca"
                  v-model="product.marcaId"
                >
                  <el-option
                    v-for="option in selects.brands"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
                <base-button
                  :type="showInsertModalBrand ? 'danger' : 'success'"
                  class="animation-on-hover"
                  size="sm"
                  @click.native="showModalInsertBrand()"
                  >{{ showInsertModalBrand ? 'x' : '+' }}</base-button
                >
                <div class="container">
                  <form
                    class="row align-items-center"
                    v-if="showInsertModalBrand"
                  >
                    <base-input
                      class=""
                      placeholder="Descripcion"
                      required
                      v-model="newBrand.descripcion"
                    >
                    </base-input>
                    <base-button
                      type="success"
                      class="animation-on-hover"
                      size="sm"
                      @click.native="insertNewBrand()"
                      ><i class="fas fa-paper-plane"></i
                    ></base-button>
                  </form>
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Tipo de Producto</label>
              <div class="col-sm-10">
                <el-select
                  :readonly="readOnly"
                  :key="readOnly"
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Tipo de Producto"
                  v-model="product.tipoProductoId"
                >
                  <el-option
                    v-for="option in selects.productType"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
                <base-button
                  :type="showInsertModalProductType ? 'danger' : 'success'"
                  class="animation-on-hover"
                  size="sm"
                  @click.native="showModalInsertProductType()"
                  >{{ showInsertModalProductType ? 'x' : '+' }}</base-button
                >
                <div class="container">
                  <form
                    class="row align-items-center"
                    v-if="showInsertModalProductType"
                  >
                    <base-input
                      class="mb-0"
                      placeholder="Descripcion"
                      required
                      v-model="newproductType.descripcion"
                    >
                    </base-input>
                    <base-button
                      type="success"
                      class="animation-on-hover"
                      size="sm"
                      @click.native="insertNewProductType()"
                      ><i class="fas fa-paper-plane"></i
                    ></base-button>
                  </form>
                </div>
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

              <router-link to="/products/index">
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
    BaseCheckbox,
    BaseRadio,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      showInsertModalProductType: false,
      showInsertModalBrand: false,
      readOnly: false,
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      newproductType: {
        id: 0,
        descripcion: ''
      },
      newBrand: {
        id: 0,
        descripcion: ''
      },
      selects: {
        simple: '',
        brands: [],
        productType: []
      },
      product: {
        nombre: '',
        descripcion: '',
        codigo: '',
        marcaId: '',
        marcas: null,
        imagen: '',
        tipoProductoId: '',
        tipoProductos: null,
        validarCodigo: false,
        id: 0
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
        .get(this.baseApiUrl + 'productos/' + this.id)
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
        !this.product.nombre ||
        !this.product.descripcion ||
        !this.product.codigo
      )
    },
    fillCatalog() {
      axios
        .get(this.baseApiUrl + 'catalogo/marcas')
        .then((response) => {
          this.selects.brands = response.data
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))

      axios
        .get(this.baseApiUrl + 'catalogo/tipoproductos')
        .then((response) => {
          this.isLoading = true
          this.selects.productType = response.data
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
        validarCodigo: obj.validarCodigo,
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
        axios
          .put(this.baseApiUrl + 'productos/' + this.product.id, this.product)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/products/index' })
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
          .post(this.baseApiUrl + 'productos', this.product)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/products/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    insertNewProductType() {
      this.isLoading = true
      axios
        .post(this.baseApiUrl + 'tipoproductos', this.newproductType)
        .then((response) => {
          this.fillCatalog()
          this.newproductType.descripcion = ''
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    insertNewBrand() {
      this.isLoading = true
      axios
        .post(this.baseApiUrl + 'marcas', this.newBrand)
        .then((response) => {
          this.fillCatalog()
          this.newBrand.descripcion = ''
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    showModalInsertProductType() {
      this.showInsertModalProductType = !this.showInsertModalProductType
    },
    showModalInsertBrand() {
      this.showInsertModalBrand = !this.showInsertModalBrand
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
