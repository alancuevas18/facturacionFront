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
          {{ title }} <span v-if="product.codigo"> / Codigo: </span>
          {{ product.codigo }}
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
              <label class="col-sm-2 col-form-label">Codigo</label>
              <div class="col-sm-8">
             
                  <base-input                    
                    v-model="product.codigo"
                    class="w-100"
                  >
                  </base-input>
          
             </div>
             <div class="col-ms-2 d-flex align-items-center" v-if="id==null">
                <BaseCheckbox
                  v-model="codigoAuto"
                  :checked="codigoAuto"
                  :input="product.codigo=codigoAuto==true&&id==null?'':product.codigo"
                  class="m-0 p-0"
                >Automanico
                </BaseCheckbox>
             
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
                    autofocus
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
          <!-- <div class="row">
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
            </div>--> 
            <!-- <div class="row mb-2">
              <label class="col-sm-2 col-form-label">Validar Codigo</label>
              <div class="col-sm-10">
                <BaseCheckbox
                  v-model="product.validarCodigo"
                  :checked="product.validarCodigo"
                  class="m-0 p-0"
                >
                </BaseCheckbox>
              </div>
            </div> -->
            <div class="row mb-2">
              <label class="col-sm-2 col-form-label">Exento</label>
              <div class="col-sm-10">
                <BaseCheckbox
                  v-model="product.exento"
                  :checked="product.exento"
                  :input="product.itbis=product.exento==true?0:product.itbis"
                  class="m-0 p-0"
                >
                </BaseCheckbox>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Porcentaje Itbis</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="descripcion"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="product.itbis"
                    :error="errors[0]"
                    type="number"
                    @input="
                      if (product.itbis > 1) {
                        product.itbis = 1
                      }
                    "
                    step="0.01"
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
              <label class="col-sm-2 col-form-label">Marca</label>
              <div class="col-sm-10 input-group">
                <el-select
                  required
                  filterable
                  class="select-primary w-75"
                  size="large"
                  placeholder="marca"
                  v-model="product.marcaId"
                >
                  <el-option
                    v-for="option in selects.marcas"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
                <div class="input-group-append"> 
                  <base-button
                  :type="showInsertModalBrand ? 'danger' : 'success'"
                  class="m-0 "
                  @click.native="showModalInsertBrand()">                  
                  <i class="fa-solid fa-xmark"  v-if="showInsertModalBrand"></i>
                  <i class="fa-solid fa-plus" v-if="!showInsertModalBrand"></i>
                  </base-button
                >
                  </div>
           
                <div class="container">
                  <form
                    class="row col-10 mt-2"
                    v-if="showInsertModalBrand"
                    style=" border: #5b616b dotted;border-radius: 11px;"
                  >
                  <label class="col-sm-12 col-form-label text-left" >Agregar Marca</label>
                  <div class="col-12">
                    <base-input
                      class="w-100 mb-1"
                      placeholder="Descripcion"
                      required
                      v-model="newBrand.descripcion"
                    >
                    </base-input>               
                    </div>
                    <div class="col-12">
                      <base-button
                          type="success"
                          class="animation-on-hover w-100"
                          @click.native="insertNewBrand()"
                          ><i class="fas fa-paper-plane"></i
                        >Agregar Marca</base-button>
                      </div>
               
                  </form>
                </div>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Tipo de Producto</label>
              <div class="col-sm-10 input-group">
                <el-select
                  required
                  filterable
                  class="select-primary w-75"
                  size="large"
                  placeholder="Tipo de Producto"
                  v-model="product.tipoProductoId"
                >
                  <el-option
                    v-for="option in selects.tipoproductos"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
                <div class="input-group-append">
                <base-button
                  :type="showInsertModalProductType ? 'danger' : 'success'"
                  class="m-0"
                  @click.native="showModalInsertProductType()">
                  <i class="fa-solid fa-xmark"  v-if="showInsertModalProductType"></i>
                  <i class="fa-solid fa-plus" v-if="!showInsertModalProductType"></i>
                  </base-button>
                </div>
                <div class="container" >
                  <form
                    class="row col-10 mt-2"
                    v-if="showInsertModalProductType"
                    style=" border: #5b616b dotted;border-radius: 11px;"
                  >

                  <label class="col-sm-12 col-form-label text-left">Tipo de Producto</label>
                  <div class="col-12">
                    <base-input
                      class="w-100 mb-1"
                      placeholder="Descripcion"
                      required
                      v-model="newproductType.descripcion"
                    >
                    </base-input>
                    
                    </div>
                    <div class="col-12">
                          <base-button
                          type="success"
                          class="animation-on-hover w-100"
                          @click.native="insertNewProductType()"
                          ><i class="fas fa-paper-plane"></i
                        >Agregar Tipo de producto</base-button>
                      </div>
               
                  
                  </form>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
               <router-link to="/products/index">
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
      codigoAuto: false,
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      title: '',
      baseApiUrl: '',
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
        marcas: [],
        tipoproductos: []
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
        exento: false,
        itbis: 0,
        id: 0
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    this.codigoAuto = !this.id ? true: false
    console.log(this.codigoAuto)
    if (this.id)
      this.globalFind('productos', this.id, this.product).then((response) => {
        Object.keys(this.product).forEach((e) => {
          this.product[e] = response[e]
        })
      })
    this.fillCatalog(['marcas', 'tipoproductos'])
  },
  methods: {
    fillCatalog(catalogs) {
      catalogs.forEach((e) => {
        this.globalFillCatalog(e).then((response) => {
          this.selects[e] = response
        })
      })
    },
    validateFields() {
      return (
        !this.product.nombre ||
        !this.product.descripcion ||
         (this.codigoAuto !=true && !this.product.codigo)
         )
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.product.marcas = null
        this.product.tipoProductos = null
        this.globalEdit('productos', this.id, this.product, '/products/index')
        this.product = this.globalClear(this.product)
      }
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        this.globalPost('productos', this.product, '/products/index')
        this.product = this.globalClear(this.product)
      }
    },
    insertNewProductType() {
      this.isLoading = true
      axios
        .post(this.baseApiUrl + 'tipoproductos', this.newproductType)
        .then((response) => {
          this.globalSweetMessage(response.data.message)
          this.fillCatalog(['tipoproductos'])
          this.newproductType.descripcion = ''
          this.showInsertModalProductType = false
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
          this.globalSweetMessage(response.data.message)
          this.fillCatalog(['marcas'])
          this.newBrand.descripcion = ''
          this.showInsertModalBrand = false
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
