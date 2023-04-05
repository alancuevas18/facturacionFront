<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('payments.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/shopping/shoppingPending">
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
           <div class="col-ms-12 col-md-6">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Tipo Pago</label>
                <div class="col-sm-10">
                  <el-select
                    required
                    filterable
                    class="select-primary w-100"
                    size="large"
                    placeholder="Sucursal"
                    v-model="payment.tipoPago"
                  >
                    <el-option
                      v-for="option in selects.typepayment"
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
                <label class="col-sm-2 col-form-label">Fecha</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="fecha"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha"
                        v-model="payment.fecha"
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
              <label class="col-sm-2 col-form-label">Total*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="total"
                  rules="required"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="payment.total"
                    :error="errors[0]"
                     @input="if(payment.total > compras.totalPendiente){payment.total = compras.totalPendiente}"
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
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Nota</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="nota"
                    v-slot="{ passed, failed, errors }"
                  >
                    <textarea
                      rows="4"
                      class="form-control"
                      required
                      v-model="payment.nota"
                      :error="errors[0]"
                      :class="[
                        { 'has-success': passed },
                        { 'has-danger': failed }
                      ]"
                    ></textarea>
                  </ValidationProvider>
                </div>
              </div>
            

            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="payment.id ==0? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/payments/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
            </div>

           </div>
           <div class="col-ms-12 col-md-6">
           
              <div class="compra">
                <div class="row col-12 justify-content-center">
                  <h4 >Datos de Compra</h4>
                </div>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Sucursal</label>
                <div class="col-sm-4">
                <label class="col-form-label"> {{ compras.sucursales.nombre}}</label>              
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Suplidor</label>
                <div class="col-sm-4">
                <label class="col-form-label"> {{ compras.suplidores.nombre}}</label>  
                </div>
              </div>

       
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Estado</label>
                <div class="col-sm-4">
                  <label class="col-form-label"> {{ estadoCompra}}</label> 
                  
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Fecha</label>
                <div class="col-sm-4">
                  <label class="col-form-label"> {{ compras.fecha}}</label>                   
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">NFC</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.comprobante }}</label>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Sub Total</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.subTotal }}</label>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Itbis</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.itbis }}</label>
                </div>
              </div>

              <div class="row">
                <label class="col-sm-2 col-form-label">Total</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.total }}</label>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Abono</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.abono }}</label>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 col-form-label">Saldo Pendiente</label>
                <div class="col-sm-4">
                <label class="col-form-label">{{ compras.totalPendiente }}</label>
                </div>
              </div>
          
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Nota</label>
                <div class="col-sm-4">
                  <label class="col-form-label"> {{ compras.nota}}</label> 

                </div>
              </div>
            
              <hr />
            </div>
            
           </div>
          </div>
   

          </form>
        </ValidationObserver>
        <div class="row mt-5">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-center">
            Pagos realizado
          </h4>
          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
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

              <base-input>
                <el-input
                  type="search"
                  class="mb-3 search-input"
                  clearable
                  prefix-icon="el-icon-search"
                  placeholder="Buscar"
                  v-model="searchQuery"
                  aria-controls="datatables"
                >
                </el-input>
              </base-input>
            </div>
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
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
          </div>
        </card>
      </div>
    </div>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>

import { BaseCheckbox, BaseRadio,BasePagination } from 'src/components/index'
import { DatePicker,Table, TableColumn, Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'
import { max } from 'moment'

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
    [Option.name]: Option,
    BasePagination,
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
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      mandatoryFields: ['name', 'lastName', 'nationalID'],
      selects: {
        typepayment:[],
        typeShopping:[],
        status: [],
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      estadoCompra:'',
      payment: {
        compraId: 0,
        tipoPago: 1,
        fecha: new Date(),
        total:1,
        nota: '',
        compras:null,
        id: 0
      },
      compras:{
          totalPendiente:10,
          sucursales:{nombre:''},
          suplidores:{nombre:''}
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      propsToSearch: ['fecha', 'total'],
      tableColumns: [
        {
          prop: 'fecha',
          label: 'Fecha',
          minWidth: 70
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        },    
        
        {
          prop: 'tipoPago',
          label: 'Tipo de pago',
          minWidth: 100
        },     
        
            
        {
          prop: 'nota',
          label: 'Nota',
          minWidth: 100
        },     
        
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
      
    }
  },
 async mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = this.payment.id==0 ? 'Crear' : 'Editar'
    if (this.id) await this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    await this.fillCatalog()
    this.fillTable()

  },
  methods: {
   async  checkId() {
   await axios
        .get(this.baseApiUrl + 'Compras/' + this.id)
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
      return this.payment.total<0
    },
    fillForm(obj) {
      this.payment.compraId = obj.id
      this.compras = obj
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.id : ''
    },
   async fillCatalog() {
   await axios
        .get(this.baseApiUrl + 'catalogo/tipopago')
        .then((response) => {
          this.selects.typepayment = response.data
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => {
         this.isLoading = false 

        }) 
        
    await  axios
        .get(this.baseApiUrl + 'catalogo/EstadoCompra')
        .then((response) => {
          this.estadoCompra=  response.data.find(c=>c.id===this.compras.estadoCompra).nombre
        })
        .catch((error) => {
          this.errored = true
        })


    },
    fillTable(){
      this.compras.pagos.forEach((element,index) => {
      this.tableData.push(element)
      this.tableData[index]['tipoPago'] = this.selects.typepayment.find(c=>c.id==element.tipoPago).nombre
      })
    },
    reload(){
      axios
        .get(this.baseApiUrl + 'Pagos/ByCompras/'+this.payment.compraId)
        .then((response) => {
        this.compras.pagos=response.data
        this.tableData=[]
        this.fillTable()
        })
        .catch((error) => {
          this.errored = true
        })
        
    },

    clear() {
      this.payment.nota = ''
      this.payment.total = 1
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Total debe ser mayor a 0', 'error')

      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'Gastos/' + this.payment.id, this.payment)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/payments/index' })
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
          .post(this.baseApiUrl + 'Pagos', this.payment)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.compras.totalPendiente=response.data.result.compras.totalPendiente
            this.compras.abono=response.data.result.compras.abono
            this.clear()
            this.reload()
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
.el-table th.el-table__cell {
  background-color: transparent;
}
</style>
