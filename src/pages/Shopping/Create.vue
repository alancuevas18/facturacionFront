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
            <div class="compra" v-if="showshopping">
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Sucursal</label>
                <div class="col-sm-4">
                  <el-select
                    required
                    filterable
                    class="select-primary"
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
                <label class="col-sm-2 col-form-label">Suplidor</label>
                <div class="col-sm-4">
                  <el-select
                    required
                    filterable
                    class="select-primary"
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

              
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Tipo compra</label>
                <div class="col-sm-4">
                  <el-select
                    required
                    filterable
                    class="select-primary"
                    size="large"
                    placeholder="Sucursal"
                    v-model="compra.tipoCompra"
                    @change="$event=>changetypeshopping()"  
                  >
                    <el-option
                      v-for="option in selects.typeShopping"
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
                <label class="col-sm-2 col-form-label">Estado</label>
                <div class="col-sm-4">
                  <el-select
                    required
                    filterable
                    class="select-primary"
                    size="large"
                    placeholder="Sucursal"
                    :key="compra.estadoCompra"
                    v-model="compra.estadoCompra"
                  >
                    <el-option
                      v-for="option in selects.status"
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
                <label class="col-sm-2 col-form-label">Total</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compra.total }}</label>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Fecha</label>
                <div class="col-sm-4">
                  <ValidationProvider
                    name="fecha"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha"
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
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Nota</label>
                <div class="col-sm-4">
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
            
              <hr />
            </div>
            <!-- products details -->
            <div v-if="!showshopping">
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Producto</label>
                <div class="col-sm-4">
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
                <label class="col-sm-2 col-form-label">Valor</label>
                <div class="col-sm-4">
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
                <label class="col-sm-2 col-form-label">Cantidad</label>
                <div class="col-sm-4">
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
              <div class="row">
                <div class="offset-sm-4 col-sm-3">
                  <label>Mostrar: </label>
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
            </div>
            <div class="row d-flex justify-content-center">
              <base-button
                v-if="!showshopping"
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="changeShow()"
                ><i class="fa-solid fa-arrow-right"></i>Siguiente</base-button
              >
              <base-button
                v-if="showshopping"
                type="warning"
                native-type="submit"
                class="animation-on-hover"
                @click.native="changeShow()"
                ><i class="fa-solid fa-arrow-left"></i>Atras</base-button
              >
              <base-button
                v-if="showshopping"
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
          prop: 'id',
          label: 'Id',
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
          prop: 'valorProducto',
          label: 'Valor',
          minWidth: 100
        },
        {
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
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
        status: [],
        products: [],
        typeShopping:[]
      },
      listStatus:[],
      currentProduct: {},
      product: {
        productPrice: '',
        productQuantity: '',
        productName: '',
        code:'',
      },
      compra: {
        id: 0,
        suplidorId: '',
        fecha: new Date(),
        sucursalId: '',
        estadoCompra:3,
        total:0,
        abono:0,
        tipoCompra: 1,
        Suplidores:null,
        Sucursales:null,
        detallecompras: []
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
    changeShow() {
      this.showshopping = !this.showshopping

     this.compra.total=this.tableData.reduce((accumulator, object) => { return accumulator + object.total;}, 0)
     
    },
    changetypeshopping(){
      if(this.compra.tipoCompra==1){
        this.selects.status= this.listStatus.filter(c=>c.id==3)
        this.compra.estadoCompra=3
      }
      else{
        this.selects.status= this.listStatus.filter(c=>c.id!=3)
        this.compra.estadoCompra=1
      }
     },
    changeProduct(){
      axios
        .get(this.baseApiUrl +'productos/'+this.product.productoId)
        .then((response) => {
          this.currentProduct = response.data
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
         this.currentProduct['valor'] = this.product.productPrice
         this.currentProduct['cantidad'] = this.product.productQuantity
         this.fillTable(this.currentProduct)
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
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        marcaProducto: obj.marcas.descripcion,
        valorProducto: obj.valor,
        cantidad: obj.cantidad,
        total: obj.cantidad*obj.valor
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
        (tableRow) => tableRow.id === row.id
      )
      if (this.indexToUpdate >= 0) {
        this.editRow = row
        this.editingProduct = true
        this.product.productoId = row.productoId
        this.product.productName = row.nombre
        this.product.productPrice = row.valorProducto
        this.product.productQuantity = row.cantidad


      }
    },
    editProduct() {
      this.editRow.valorProducto = this.product.productPrice
      this.editRow.cantidad = this.product.productQuantity
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
        .get(this.baseApiUrl + 'catalogo/TipoCompra')
        .then((response) => {
          this.selects.typeShopping = response.data
        })
        .catch((error) => {
          this.errored = true
        })

        
        axios
        .get(this.baseApiUrl + 'catalogo/EstadoCompra')
        .then((response) => {
          this.listStatus= response.data
          this.selects.status = response.data.filter(c=>c.id==3)
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
          valorProducto: this.tableData[i].valorProducto,
          total: this.tableData[i].valorProducto* this.tableData[i].cantidad,
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
