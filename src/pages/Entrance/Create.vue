<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('entrance.entrance') }}
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
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Sucursal</label>
              <div class="col-sm-4">
                <el-select
                  :disabled="addedProducts"
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Sucursal"
                  v-model="entrada.sucursalId"
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
              <label class="col-sm-2 col-form-label">Suplidor</label>
              <div class="col-sm-4">
                <el-select
                  :disabled="addedProducts"
                  required
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Suplidor"
                  v-model="entrada.suplidorId"
                >
                  <el-option
                    v-for="option in selects.suppliers"
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
                  :disabled="addedProducts"
                  filterable
                  class="select-primary"
                  size="large"
                  placeholder="Estado"
                  v-model="entrada.estadoDetalleEntrada"
                >
                  <el-option
                    v-for="option in selects.statusDetails"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id + option.nombre"
                  >
                  </el-option>
                </el-select>
              </div>
              <label class="col-sm-2 col-form-label">Nota</label>
              <div class="col-sm-4">
                <ValidationProvider
                  name="nota"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="entrada.nota"
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
            <hr />
            <!-- products details -->
            <div class="row">
              <label class="col-sm-2 col-form-label">Producto</label>
              <div class="col-sm-3">
                <ValidationProvider
                  name="producto"
                  rules="required|min:2"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="product.productCode"
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
                  class="animation-on-hover"
                  size="sm"
                  @click.native="checkProductCode()"
                  ><i class="tim-icons icon-check-2 mr-2"></i
                ></base-button>
              </div>

              <label class="col-sm-2 col-form-label">Precio</label>
              <div class="col-sm-4">
                <ValidationProvider
                  name="precio"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="!validProduct"
                    v-model="product.productPrice"
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
            <hr />
            <div class="row">
              <label class="col-sm-2 col-form-label">Cantidad</label>
              <div class="col-sm-4">
                <ValidationProvider
                  name="cantidad"
                  rules="required|min:1|numeric"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    :disabled="!validProduct"
                    v-model="product.productQuantity"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
              <label class="col-sm-2 col-form-label">Mostrar</label>
              <div class="col-sm-3">
                <el-select
                  class="select-primary mb-3 pagination-select"
                  v-model="pagination.perPage"
                  placeholder="Per page"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in pagination.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <base-button
                :disabled="!validProduct"
                type="primary"
                native-type="submit"
                class="animation-on-hover"
                @click.native="addProduct()"
                >+ Agregar</base-button
              >
              <base-button
                @click.native="cleanProducts()"
                type="danger"
                class="animation-on-hover"
                ><i class="tim-icons icon-simple-remove"></i
                >Limpiar</base-button
              >
            </div>
            <!-- Table -->
            <div class="row">
              <el-table :data="queriedData">
                <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  :min-width="column.minWidth"
                  :prop="column.prop"
                  :label="column.label"
                >
                </el-table-column>
                <el-table-column :min-width="135" align="right" label="Actions">
                  <div slot-scope="props">
                    <base-button
                      @click.native="handleEdit(props.$index, props.row)"
                      class="edit btn-link"
                      type="warning"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
                    </base-button>
                    <base-button
                      @click.native="handleDelete(props.$index, props.row)"
                      class="remove btn-link"
                      type="danger"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-simple-remove"></i>
                    </base-button>
                  </div>
                </el-table-column>
              </el-table>
            </div>
            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="create()"
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
import { Table, TableColumn, Select, Option, Autocomplete } from 'element-ui'
import { BasePagination } from 'src/components'
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
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  computed: {
    queriedData() {
      let result = this.tableData
      if (this.searchedData.length > 0) {
        result = this.searchedData
      }
      return result.slice(this.from, this.to)
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length
    }
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      tableColumns: [
        {
          prop: 'codigo',
          label: 'Codigo',
          minWidth: 70
        },
        {
          prop: 'nombre',
          label: 'Nombre',
          minWidth: 100
        },
        {
          prop: 'descripcion',
          label: 'Descripcion',
          minWidth: 200
        },
        {
          prop: 'marcaProducto',
          label: 'Marca',
          minWidth: 120
        },
        {
          prop: 'tipoProducto',
          label: 'Tipo Producto',
          minWidth: 120
        },
        {
          prop: 'precio',
          label: 'Precio',
          minWidth: 100
        },
        {
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
        }
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      isLoading: false,
      fullPage: true,
      readonly: true,
      validProduct: false,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      addedProducts: false,
      title: '',
      selects: {
        simple: '',
        offices: [],
        suppliers: [],
        statusDetails: []
      },
      currentProduct: {},
      product: {
        productPrice: '',
        productQuantity: '',
        productCode: ''
      },
      entrada: {
        id: 0,
        suplidorId: '',
        sucursalId: '',
        fehca: '',
        nota: '',
        estadoDetalleEntrada: ''
      },
      detalleEntradas: []
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
    checkProductCode() {
      if (!this.product.productCode)
        return this.globalSweetMessage('Favor digitar codigo', 'error')
      axios
        .get(
          this.baseApiUrl +
            'Productos/ByCodigoOrNombre?Nombre=' +
            this.product.productCode +
            '&Codigo=' +
            this.product.productCode
        )
        .then((response) => {
          this.validProduct = true
          this.currentProduct = response.data[0]
        })
        .catch((error) => {
          this.globalSweetMessage('Codigo invalido', 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    addProduct() {
      if (this.validateFields())
        return this.globalSweetMessage(
          'Favor llenar todos los campos!',
          'error'
        )
      this.currentProduct['precio'] = this.product.productPrice
      this.currentProduct['cantidad'] = this.product.productQuantity
      this.fillTable(this.currentProduct)
      this.addedProducts = true
      this.validProduct = false
      this.product.productCode = ''
      this.product.productQuantity = ''
      this.product.productPrice = ''
    },
    fillTable(obj) {
      let detalleTable = {
        codigo: obj.codigo,
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        marcaProducto: obj.marcas.descripcion,
        tipoProducto: obj.tipoProductos.descripcion,
        precio: obj.precio,
        cantidad: obj.cantidad
      }
      this.tableData.push(detalleTable)
      console.log(this.tableData)
    },
    cleanProducts() {
      this.tableData = []
      this.addedProducts = false
      this.clear()
    },
    // resetCode() {
    //   this.productByOffice.productoId = 0
    //   this.productCode = ''
    // },
    // checkId() {
    //   axios
    //     .get(this.baseApiUrl + 'productossucursales/' + this.id)
    //     .then((response) => {
    //       this.isLoading = true
    //       this.fillForm(response.data)
    //       this.productByOffice.productoId = response.data.productoId
    //       this.readonly = false
    //     })
    //     .catch((error) => {
    //       this.error = error
    //     })
    //     .finally(() => (this.isLoading = false))
    // },
    validateFields() {
      return (
        !this.product.productCode ||
        !this.product.productQuantity ||
        !this.product.productPrice ||
        !this.entrada.sucursalId ||
        !this.entrada.suplidorId ||
        !this.entrada.estadoDetalleEntrada
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
        .get(this.baseApiUrl + 'catalogo/suplidores')
        .then((response) => {
          this.selects.suppliers = response.data
        })
        .catch((error) => {
          this.errored = true
        })

      axios
        .get(this.baseApiUrl + 'catalogo/estadodetalleentrada')
        .then((response) => {
          this.selects.statusDetails = response.data
        })
        .catch((error) => {
          this.errored = true
        })
    },
    // fillForm(obj) {
    //   this.productByOffice = {
    //     id: obj.id,
    //     productoId: obj.productos.id,
    //     stock: obj.stock,
    //     stockMinimo: obj.stockMinimo,
    //     precio: obj.precio,
    //     productos: null,
    //     sucursales: null,
    //     precioMinimo: obj.precioMinimo,
    //     sucursalesId: obj.sucursalesId,
    //     estadoProductos: obj.estadoProductos,
    //     total: obj.total
    //   }
    //   this.productCode = obj.productos.codigo
    //   if (obj.id != 0)
    //     this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    // },
    clear() {
      this.product.productCode = ''
      this.product.productQuantity = ''
      this.product.productPrice = ''
      this.entrada.sucursalId = ''
      this.entrada.suplidorId = ''
      this.entrada.estadoDetalleEntrada = ''
    }
    // edit() {
    //   if (this.validateFields()) {
    //     this.globalSweetMessage('Favor llenar todos los campos!', 'error')
    //   } else {
    //     this.isLoading = true
    //     if (!this.productByOffice.id) this.checkCode()
    //     else {
    //       axios
    //         .put(
    //           this.baseApiUrl +
    //             'productossucursales/' +
    //             this.productByOffice.id,
    //           this.productByOffice
    //         )
    //         .then((response) => {
    //           this.globalSweetMessage(response.data.message)
    //           this.clear()
    //           this.$router.push({ path: '/productsoffice/index' })
    //         })
    //         .catch((error) => {
    //           this.globalSweetMessage(error.response.data.message, 'error')
    //         })
    //         .finally(() => (this.isLoading = false))
    //     }
    //   }
    // },
    // create() {
    //   if (this.validateFields()) {
    //     this.globalSweetMessage('Favor llenar todos los campos!', 'error')
    //   } else {
    //     this.isLoading = true
    //     if (!this.productByOffice.productoId) this.checkCode()
    //     else {
    //       axios
    //         .post(this.baseApiUrl + 'productossucursales', this.productByOffice)
    //         .then((response) => {
    //           this.globalSweetMessage(response.data.message)
    //           this.clear()
    //           this.$router.push({ path: '/productsoffice/index' })
    //         })
    //         .catch((error) => {
    //           this.globalSweetMessage(error.response.data.message, 'error')
    //         })
    //         .finally(() => (this.isLoading = false))
    //     }
    //   }
    // }
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
