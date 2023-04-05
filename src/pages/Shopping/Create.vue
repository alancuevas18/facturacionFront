<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('shopping.shopping') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/shopping/index">
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
              <!-- Datos de la compra -->
           <div class="col-ms-12 col-md-4" >
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Sucursal</label>
                <div class="col-sm-9">
                  <el-select
                    required
                    filterable
                    class="select-primary w-100"
                    size="large"
                    placeholder="Sucursal"
                    v-model="compra.sucursalId"
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
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Suplidor</label>
                <div class="col-sm-9">
                  <el-select
                    required
                    filterable
                    class="select-primary w-100"
                    size="large"
                    placeholder="Suplidor"
                    v-model="compra.suplidorId"
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
                <label class="col-sm-3 col-form-label">Fecha</label>
                <div class="col-sm-9">
                  <ValidationProvider
                    name="fecha"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha"
                        class="w-100"
                        v-model="compra.fecha"
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
                  <label class="col-sm-3 col-form-label">NFC</label>
                  <div class="col-sm-9">
                    <ValidationProvider
                      name="Comprobante"
                      rules="min:3"
                      v-slot="{ passed, failed, errors }"
                    >
                      <base-input
                        required
                        v-model="compra.comprobante"
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
                <label class="col-sm-3 col-form-label">Sub total</label>
                <div class="col-sm-9">
                <label class="col-form-label">{{ compra.subtotal }}</label>
                </div>
              </div>
              <div class="row">
                  <label class="col-sm-3 col-form-label">Itbis</label>
                  <div class="col-sm-9">
                    <ValidationProvider
                      name="itbis"
                      v-slot="{ passed, failed, errors }"
                    >
                      <base-input
                        required
                        v-model="compra.itbis"
                        :error="errors[0]"
                        type="number"
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
                  <label class="col-sm-3 col-form-label">Total</label>
                  <div class="col-sm-9">
                <label class="col-form-label">{{ comprastotal }}</label>
                  </div>
              </div>
              
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Nota</label>
                <div class="col-sm-9">
                  <ValidationProvider
                    name="nota"
                    v-slot="{ passed, failed, errors }"
                  >
                    <textarea
                      rows="4"
                      class="form-control"
                      required
                      v-model="compra.nota"
                      :error="errors[0]"
                      :class="[
                        { 'has-success': passed },
                        { 'has-danger': failed }
                      ]"
                    ></textarea>
                  </ValidationProvider>
                </div>
              </div>             
            </div>
            <!-- products details -->
            <div class="col-ms-12 col-md-8">
              <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">
          </h4>
              <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Producto</label>
                <div class="col-sm-9">
                  <el-select
                    required
                    filterable
                    :disabled="editingProduct"
                    class="select-primary w-100"
                    size="large"
                    placeholder="Producto"
                    v-model="product.productoId"
                    @change="$event=>changeProduct()"                 
                  >
                    <el-option
                      v-for="option in selects.products"
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
                <label class="col-sm-3 col-form-label">Precio Compra</label>
                <div class="col-sm-9">
                  <ValidationProvider
                    name="valor"
                    rules="min:1|numeric"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input
                      required
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
              <div class="row">
                <label class="col-sm-3 col-form-label">Precio de Venta</label>
                <div class="col-sm-9">
                  <ValidationProvider
                    name="valor"
                    rules="min:1|numeric"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input
                      required
                      v-model="product.productSellPrice"
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
                <label class="col-sm-3 col-form-label">Cantidad</label>
                <div class="col-sm-9">
                  <ValidationProvider
                    name="cantidad"
                    rules="min:1|numeric"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input
                      required
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
              </div>


              <div class="row col-ms-12 col-md-6 d-flex justify-content-center">
                <base-button
                  type="primary"
                  native-type="submit"
                  class="animation-on-hover"
                  @click.native="!editingProduct ? addProduct() : editProduct()"
                  >{{ !editingProduct ? '+ Agregar' : 'Editar' }}</base-button
                >
                <base-button
                  @click.native="cleanProducts()"
                  type="danger"
                  class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >Limpiar</base-button
                >
              </div>
              <hr />
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
                  <el-table-column
                    :min-width="135"
                    align="right"
                    label="Actions"
                  >
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
              </card>
            </div>
            <div class="col-11 m-auto row">
                <div class="col-ms-12 col-md-6">
                  <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover w-100"
                @click.native="create()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button>
                </div>
                <div class="col-ms-12 col-md-6">
                  <router-link to="/productsoffice/index">
                    <base-button type="danger" class="animation-on-hover w-100"
                      ><i class="tim-icons icon-simple-remove"></i
                      >{{ $t('global.cancel') }}</base-button>
                  </router-link>
                </div>
         
           
            </div>

          </div>
      
          </form>
        </ValidationObserver>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option, DatePicker } from 'element-ui'
import { BasePagination } from 'src/components'
import { extend } from 'vee-validate'
import { required, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert2'
extend('required', required)
extend('min', min)
extend('numeric', numeric)

export default {
  components: {
    Loading,
    BasePagination,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      pagination: {
        perPage: 50,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      tableColumns: [
        {
          prop: 'codigo',
          label: 'Codigo',
          minWidth: 100
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
          prop: 'precioCompra',
          label: 'Precio Compra',
          minWidth: 130
        },
        {
          prop: 'precioVenta',
          label: 'Precio Venta',
          minWidth: 110
        },
        {
          prop: 'cantidad',
          label: 'Cant.',
          minWidth: 75
        },

        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        },
     
        
      ],
      showshopping: false,
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      isLoading: false,
      fullPage: true,
      readonly: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      editingProduct: false,
      editRow: {},
      indexToUpdate: '',
      title: '',
      selects: {
        simple: '',
        offices: [],
        suppliers: [],
        products: [],
      },
      listStatus:[],
      currentProduct: {},
      product: {
        productPrice: '',
        productSellPrice: '',
        productQuantity: '',
        productName: '',
        code:'',
      },
      compra: {
        id: 0,
        suplidorId: '',
        fecha: new Date(),
        comprobante:'',
        itbis:0,
        subtotal:0,
        abono:0,
        estadoCompra:1,
        sucursalId: '',
        Suplidores:null,
        Sucursales:null,
        detallecompras: []
      }
    }
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
    },
    comprastotal(){
      let subtotal=0
       this.tableData.forEach(element => {
        subtotal+=element.total
        this.compra.subtotal=subtotal
       })
       let total = parseInt(this.compra.subtotal) + parseInt(this.compra.itbis)       
      return total
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
    changeShow() {
      this.showshopping = !this.showshopping

     this.compra.total=this.tableData.reduce((accumulator, object) => { return accumulator + object.total;}, 0)
     
    },
    changeProduct(){
      axios
        .get(this.baseApiUrl +'ProductosSucursales/BySuculsalAndProductos?SucursalId='+this.compra.sucursalId+'&ProductoId='+this.product.productoId)
        .then((response) => {
          this.currentProduct = response.data
          this.product.productSellPrice=response.data.precio
          this.product.productQuantity=1
        })
        .catch((error) => {
          this.globalSweetMessage('Codigo invalido', 'error')
        })        
    },

    addProduct() {
      if (this.validateFields())
        return this.globalSweetMessage(
          'Favor llenar todos los campos!',
          'error'
        )
      if (this.isAddedProduct(this.product.productoId))
        return this.globalSweetMessage(
          'Este producto a sido agregado!',
          'error'
        )
        console.log(this.product.productQuantity*this.product.productPrice)
         this.fillTable(this.currentProduct.productos)
          this.cleanProduct()
    },
    //valide product to add a table
    isAddedProduct(id) {
      function findProduct(product) {        
        return (product.productoId === id) 
      }
      return this.tableData.find((product) => findProduct(product))
    },
    fillTable(obj) {
      console.log(obj)
      let detalleTable = {
        compraId:0,
        productoId: obj.id,
        codigo: obj.codigo,
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        precioCompra: this.product.productPrice,
        precioVenta:this.product.productSellPrice,
        cantidad: this.product.productQuantity,
        total: this.product.productQuantity*this.product.productPrice
      }
      this.tableData.push(detalleTable)
    },
    cleanProduct() {
      this.product.productName = ''
      this.product.productQuantity = ''
      this.product.productPrice = ''
    },
    cleanProducts() {
      this.tableData = []
      this.clear()
    },
    handleEdit(index, row) {
      this.indexToUpdate = this.tableData.findIndex(
        (tableRow) => tableRow.productoId === row.productoId
      )
      if (this.indexToUpdate >= 0) {
        this.editRow = row
        this.editingProduct = true
        this.product.productoId = row.productoId
        this.product.productSellPrice = row.precioVenta
        this.product.productPrice = row.precioCompra
        this.product.productName = row.nombre
        this.product.productQuantity = row.cantidad


      }
    },
    editProduct() {
      this.editRow.precioCompra = this.product.productPrice
      this.editRow.precioVenta = this.product.productSellPrice
      this.editRow.cantidad = this.product.productQuantity
      this.editRow.total = this.product.productQuantity*this.product.productPrice
      this.editingProduct = false
      this.editRow = ''
      this.product = {}
    },
    handleDelete(index, row) {
      swal
        .fire({
          title: 'Estas seguro?',
          text: `Esta accion no se puede reversar!`,
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
            cancelButton: 'btn btn-danger btn-fill'
          },
          confirmButtonText: 'Confimar!',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false
        })
        .then((result) => {
          this.tableData.splice(index, 1)
        })
    },

    validateFields() {
      return (
        !this.product.productoId ||
        !this.product.productQuantity ||
        !this.product.productPrice
      )
    },
    validateshopping() {
      return (
        !this.compra.sucursalId ||
        !this.compra.suplidorId ||
        !this.compra.fecha
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
        .get(this.baseApiUrl + 'catalogo/productos')
        .then((response) => {
          this.selects.products = response.data
        })
        .catch((error) => {
          this.errored = true
        })
    },
    clear() {
      this.product.productName = ''
      this.product.productQuantity = ''
      this.product.productPrice = ''
      this.compra.sucursalId = ''
      this.compra.suplidorId = ''
      this.compra.nota = ''
    },

    create() {
      if (this.tableData.length == 0)
        return this.globalSweetMessage('No hay productos agregados', 'error')
      if (this.validateshopping())
        return this.globalSweetMessage(
          'Favor llenar todos los campos!',
          'error'
        )
      for (let i = 0; i < this.tableData.length; i++) {
        let product = {
          id: 0,
          productoId: this.tableData[i].productoId,
          cantidad: this.tableData[i].cantidad,
          precioCompra: this.tableData[i].precioCompra,
          precioVenta: this.tableData[i].precioVenta,
          total: this.tableData[i].precioCompra* this.tableData[i].cantidad,
          compraId: 0,
          compras: null,
          productos: null,
        }
        this.compra.detallecompras.push(product)
      }
      console.log(this.compra)

      this.isLoading = true
      axios
          .post(this.baseApiUrl + 'compras', this.compra)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/shopping/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))

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
