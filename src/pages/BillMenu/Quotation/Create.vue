<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('quotation.quotation') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/billDashboard/quotation/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
    
   
          
            <card card-body-classes="table-full-width">
                <h4 slot="header" class="card-title">
                </h4>
                <div class="row">
                <!-- Datos de la Cotizaciones -->
                  <div class="col-ms-12 col-md-4" >
                  
                     <div class="row ">
                      <label class="col-sm-4 col-form-label">Sucursal</label>
                      <div class="col-sm-8">
                        <el-select
                          required
                          :disabled="!readOnly"  
                          :key="readOnly" 
                          filterable
                          class="select-primary w-100"
                          size="large"
                          placeholder="Sucursal"
                          v-model="Cotizaciones.sucursalId"
                          @change="$event=>changeProduct()">
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
                      <label class="col-sm-4 col-form-label">Cliente</label>
                      <div class="col-sm-8">
                        <el-select
                          required
                          :disabled="!readOnly"  
                          :key="readOnly" 
                          filterable
                          class="select-primary w-100"
                          size="large"
                          placeholder="Cliente"
                          v-model="Cotizaciones.clienteId">
                          <el-option value="" label="Selecciona un cliente"/>
                          <el-option
                            v-for="option in selects.clients"
                            class="select-primary"
                            :value="option.id"
                            :label="option.nombre"
                            :key="option.id"
                          >
                          </el-option>

                        </el-select>
                      </div>
                    </div>
                    <div v-if="Cotizaciones.clienteId==''">
                      <div class="row">
                        <label class="col-sm-4 col-form-label">Nombre</label>
                        <div class="col-sm-8">
                          <ValidationProvider
                            name="Direccion"
                            rules="required"
                            v-slot="{ passed, failed, errors }"
                          >
                            <base-input
                              required
                              :disabled="checkedID"
                              v-model="Cotizaciones.nombre"
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
                      <div class="row ">
                        <label class="col-sm-4 col-form-label">Identificación</label>
                        <div class="col-sm-8">
                          <ValidationProvider
                            name="Direccion"
                            rules="required"
                            v-slot="{ passed, failed, errors }"
                          >
                            <base-input
                              required
                              :disabled="checkedID"
                              v-model="Cotizaciones.identificacion"
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
                    </div>

                    <div class="row mb-3">
                      <label class="col-sm-3 col-form-label">vendedor</label>
                      <div class="col-sm-9">
                        <el-select
                          required
                          :disabled="!readOnly"  
                          :key="readOnly" 
                          filterable
                          class="select-primary w-100"
                          size="large"
                          placeholder="Vendedor"
                          v-model="Cotizaciones.vendedorId">
                          <el-option value="" label="Selecciona un vendedor"/>
                          <el-option
                            v-for="option in selects.sellers"
                            class="select-primary"
                            :value="option.id"
                            :label="option.nombre"
                            :key="option.id"
                          >
                          </el-option>

                        </el-select>
                      </div>
                    </div>         
                  </div>
                  <!-- products details -->
                  <div class="col-sm-12 col-md-8"> 
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
                      <label class="col-sm-3 col-form-label">Precio de Venta</label>
                      <div class="col-sm-9">
                        <ValidationProvider
                          name="valor"
                          rules="min:1|numeric"
                          v-slot="{ passed, failed, errors }"
                        >
                          <base-input
                            required
                            v-model="product.Price"
                            type="number"
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
                          name="valor"
                          rules="min:1|numeric"
                          v-slot="{ passed, failed, errors }"
                        >
                          <base-input
                            required
                            type="number"
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
                 
                    <div class="row col-ms-12 col-md-12 d-flex justify-content-center">
                   
                      <base-button
                        @click.native="cleanProducts()"
                        type="danger"
                        class="animation-on-hover"
                        ><i class="tim-icons icon-simple-remove"></i
                        >Limpiar</base-button
                      >
                      
                      <base-button
                        type="primary"
                        native-type="submit"
                        class="animation-on-hover"
                        @click.native="!editingProduct ? addProduct() : editProduct()"
                        >{{ !editingProduct ? '+ Agregar' : 'Editar' }}</base-button
                      >
                    </div>
                  </div>
                  <card card-body-classes="table-full-width">
              <h4 slot="header" class="card-title">
              </h4>
              <!-- Table -->
                <div class="row">
                  <el-table :data="queriedData">
                    <el-table-column
                      v-for="column in tableColumns"
                      :key="column.label"
                      :min-width="column.minWidth"
                      :prop="column.prop"
                      :label="column.label.toLowerCase()"
                      
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
            </card>
             
            <div class="col-11 m-auto row">
          
                <div class="col-ms-12 col-md-6">
                  <router-link to="/productsoffice/index">
                    <base-button type="danger" class="animation-on-hover w-100"
                      ><i class="tim-icons icon-simple-remove"></i
                      >{{ $t('global.cancel') }}</base-button>
                  </router-link>
                </div>
                <div class="col-ms-12 col-md-6">
                  <base-button
                    type="success"
                    native-type="submit"
                    class="animation-on-hover w-100"
                    @click.native="create()"
                    ><i class="tim-icons icon-check-2 mr-2"></i
                    >{{ title }}</base-button>
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
        perPage: 50 ,
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
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
        },
        {
          prop: 'valorProducto',
          label: 'Precio',
          minWidth: 110
        },
      

        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        },
        
      ],
      showCotizaciones: false,
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      isLoading: false,
      fullPage: true,
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
        products: [],
        clients:[],
        sellers:[],
      },
      listStatus:[],
      currentProduct: {},
      product: {
        Price: '',        
        productQuantity: '',
        productName: '',
        code:'',
      },
      Cotizaciones: {
        id: 0,
        nombre:'',
        identificacion:'',
        clienteId:'',
        sucursalId: this.$store.state.officeId,
        vendedorId: '',
        clientes:null,
        vendedores:null,
        sucursales:null,
        detalleCotizaciones: []
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
    readOnly(){
      if(this.tableData.length>0)
      return false

    return true
    },
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
    changeProduct(){
      axios
        .get(this.baseApiUrl +'ProductosSucursales/BySuculsalAndProductos?SucursalId='+this.Cotizaciones.sucursalId+'&ProductoId='+this.product.productoId)
        .then((response) => {
          this.currentProduct = response.data
          this.product.Price=response.data.precio
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
      let detalleTable = {
        CotizacionesId:0,
        productoId: obj.id,
        codigo: obj.codigo,
        nombre: obj.nombre,
        descripcion: obj.descripcion,
        valorProducto:this.product.Price,
        cantidad: this.product.productQuantity,
        total: this.product.productQuantity*this.product.Price
      }
      this.tableData.push(detalleTable)
    },
    cleanProduct() {
      this.product.productName = ''
      this.product.productQuantity = ''
      this.product.Price = ''
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
        this.product.Price = row.valorProducto
        this.product.productName = row.nombre
        this.product.productQuantity = row.cantidad
      }
    },
    editProduct() {
      this.editRow.valorProducto = this.product.Price
      this.editRow.cantidad= this.product.productQuantity
      this.editRow.total = this.product.productQuantity*this.product.Price
      this.editingProduct = false
      this.editRow = ''
      this.product.productQuantity=0
      this.product.productoId=''
      this.product.Price=''
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
        !this.product.Price
      )
    },
    validateCotizaciones() {
      return (
        !this.Cotizaciones.sucursalId ||
        !this.Cotizaciones.clienteId 
      )
    },
    async fillCatalog() {
      this.isLoading = true
    await axios
        .get(this.baseApiUrl + 'catalogo/sucursales')
        .then((response) => {
          this.selects.offices = response.data
        })   
   await axios
        .get(this.baseApiUrl + 'catalogo/productos')
        .then((response) => {
          this.selects.products = response.data
        })

    await axios
        .get(this.baseApiUrl + 'catalogo/clientes')
        .then((response) => {
          this.selects.clients = response.data
        })
    await   axios
        .get(this.baseApiUrl + 'catalogo/vendedores')
        .then((response) => {
          this.selects.sellers = response.data
        }).finally(() => (this.isLoading = false))  
    },
    clear() {
      this.product.productName = ''
      this.product.productQuantity = ''
      this.product.Price = ''
      this.Cotizaciones.sucursalId = ''
    },

    create() {
      if (this.tableData.length == 0)
        return this.globalSweetMessage('No hay productos agregados', 'error')
      if (this.validateCotizaciones())
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
          total:this.tableData[i].cantidad*this.tableData[i].valorProducto,
          CotizacionesId: 0,
          Cotizaciones: null,
          productos: null,
        }

        this.Cotizaciones.detalleCotizaciones.push(product)
      }
      this.isLoading = true
      axios
          .post(this.baseApiUrl + 'Cotizaciones', this.Cotizaciones)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/quotation/index' })
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
.borderless td, .borderless th {
    border: none;
}
</style>
