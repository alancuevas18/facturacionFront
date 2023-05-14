<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('spends.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/spends/index">
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
                <div class="row">
                    <label class="col-sm-3 col-form-label">Fecha</label>
                    <div class="col-sm-9">
                      <ValidationProvider
                        name="fecha"
                        v-slot="{ passed, failed, errors }"
                      >
                        <base-input >
                          <el-date-picker
                            type="date"
                            placeholder="Fecha"
                            v-model="spend.fecha"
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
                  <label class="col-sm-3 col-form-label">Comprobante</label>
                  <div class="col-sm-9">
                    <ValidationProvider
                      name="Comprobante"
                      rules="min:3"
                      v-slot="{ passed, failed, errors }"
                    >
                      <base-input
                        required
                        v-model="spend.comprobante"
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
                  <label class="col-sm-3 col-form-label">Descripción*</label>
                  <div class="col-sm-9">
                    <ValidationProvider
                      name="descripcion"
                      rules="required|min:3"
                      v-slot="{ passed, failed, errors }"
                    >
                      <base-input
                        required
                        v-model="spend.descripcion"
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
                  <label class="col-sm-3 col-form-label">Sucursal*</label>
                  <div class="col-sm-9">
                    <el-select
                      required
                      filterable
                      class="select-primary w-100"
                      size="large"
                      placeholder="Sucursal"
                      v-model="spend.sucursalId"
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
                  <label class="col-sm-3 col-form-label">Tipo Gastos*</label>
                  <div class="col-sm-9">
                    <el-select
                      required
                      filterable
                      class="select-primary w-100"
                      size="large"
                      placeholder="Tipo de gastos"
                      v-model="spend.tipoGastoId"
                      @change="fillSubspendtype()"
                    >
                      <el-option
                        v-for="option in selects.spendType"
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
                  <label class="col-sm-3 col-form-label">Sub Tipo Gastos*</label>
                  <div class="col-sm-9">
                    <el-select
                      required
                      filterable
                      class="select-primary w-100"
                      size="large"
                      placeholder="Sub Tipo de gastos"
                      v-model="spend.subTipoGastoId"
                      @change="fillSubspendtype()"
                    >
                      <el-option
                        v-for="option in selects.subSpendType"
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
                  <label class="col-sm-3 col-form-label">Sub Total*</label>
                  <div class="col-sm-9">
                    <ValidationProvider
                      name="total"
                      rules="required"
                      v-slot="{ passed, failed, errors }"
                    >
                      <base-input
                       @keyup="reload()"
                        required
                        v-model="spend.subTotal"
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
                  <div class="col-10">
                     <label class="col-sm-3 col-form-label">Itbis:</label>                 
                     <label class="col-sm-6 col-form-label text-left">{{ spend.itbis }}</label>              
                  </div>
                  <div class="col-ms-2">
                       <base-checkbox v-model="selectitbis" :check="addItbis()"> Itbis
                      </base-checkbox>
                    </div>
                </div> 
                <div class="row">
                  <div class="col-12">
                    <label class="col-sm-3 col-form-label">Total:</label>
                    <label class="col-sm-9 col-form-label text-left">{{ SpendTotal }}</label>
                  </div>
                  <div class="col-12">
                    <label class="col-sm-3 col-form-label">Total Retenciones:</label>
                    <label class="col-sm-9 col-form-label text-left">{{ totalRetenciones }}</label>
                  </div>
                  <div class="col-12">
                    <label class="col-sm-3 col-form-label">Total:</label>
                    <label class="col-sm-9 col-form-label text-left">{{ totalpagar }}</label>
                  </div>
                </div>     
             
                 
              </div>
              <div class="col-ms-12 col-md-6">

                <div class="row">
                  <label class="col-sm-2 col-form-label">Retenciones</label>
                  <div class="col-sm-10">
                    <el-select
                      required
                      filterable
                      class="select-primary w-100"
                      size="large"
                      placeholder="Retenciones"
                      v-model="deductions.id" >
                      <el-option
                        v-for="option in selects.deductions"
                        class="select-primary"
                        :value="option.id"
                        :label="option.nombre"
                        :key="option.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              <div class="row col-11 m-auto">
                  <base-button
                  type="warning"
                  class="animation-on-hover w-100"
                  @click.native="addDedutions()"
                  ><i class="tim-icons icon-check-2 mr-2"></i>
                  Agregar</base-button>
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

              <router-link to="/spends/index">
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
import {BaseCheckbox, BaseRadio,BasePagination } from 'src/components/index'
import { Table, TableColumn, DatePicker, Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert2'
import { relativeTimeRounding } from 'moment'

extend('email', email)
extend('required', required)
extend('min', min)
extend('numeric', numeric)

export default {
  components: {
    Loading,
    BaseCheckbox,
    BaseRadio,
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
    },
    SpendTotal(){
      return parseFloat(this.spend.subTotal)+parseFloat(this.spend.itbis)
    },
    totalRetenciones(){
      return this.spend.detalleRetenciones.map(c=>c.total).reduce((a, b) => a + b, 0)
    },
    totalpagar(){
      return this.SpendTotal-this.totalRetenciones
    }
    // itbis() {
    //   if( this.selectitbis) {
    //     console.log( this.selectitbis)
    //     this.spend.itbis=this.spend.total*0.18
    //   }
    //   else{
    //     this.itbis=0 
    //   }
    //   return 0
    // }
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
      selectitbis: false,
      selects: {
        offices: [],
        spendType:[],
        subSpendType:[],
        simple: '',
        deductions:[],
      },
      spend: {
        descripcion: '',
        comprobante: '',
        fecha:new Date(),
        itbis:0,
        subTotal: 0,
        sucursalId:'',
        tipoGastoId:'',
        subTipoGastoId:null,
        turnoId:null,
        detalleRetenciones:[],
        id: 0
      },
      deductions:{
       id:''
      },
      pagination: {
        perPage: 30,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      tableColumns: [
        {
          prop: 'retenciones.descripcion',
          label: 'Retencion',
          minWidth: 70
        },
        {
          prop: 'retenciones.porcentaje',
          label: 'Porcentaje',
          minWidth: 70
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        },     
        
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
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
        .get(this.baseApiUrl + 'Gastos/' + this.id)
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
      return !this.spend.descripcion || !this.spend.subTotal
    },
    fillForm(obj) {
      this.spend = {
        descripcion:obj.descripcion,
        comprobante: obj.comprobante,
        fecha:obj.fecha,
        itbis:obj.itbis,
        subTotal: obj.subTotal,
        sucursalId:obj.sucursalId,
        tipoGastoId:obj.tipoGastoId,
        subTipoGastoId:obj.subTipoGastoId,
        turnoId:obj.turnoId,
        detalleRetenciones:obj.detalleRetenciones,
        id: obj.id
      }
      this.fillSubspendtype()
      this.reload()
      if (obj.id != 0){
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.id : ''
        addItbis()
      }
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

        axios
        .get(this.baseApiUrl + 'catalogo/tipogastos')
        .then((response) => {
          this.selects.spendType = response.data
        })
        .catch((error) => {
          this.error = error
        })
        axios
        .get(this.baseApiUrl + 'catalogo/retenciones')
        .then((response) => {
          this.selects.deductions = response.data
        })
        .catch((error) => {
          this.error = error
        })
        

    },
    fillSubspendtype(){
      axios
        .get(this.baseApiUrl + 'catalogo/subtipogastos?padreId='+this.spend.tipoGastoId)
        .then((response) => {
          this.selects.subSpendType = response.data
        })
        .catch((error) => {
          this.error = error
        })
    },
    clear() {
      this.spend.descripcion = ''
      this.spend.subTotal = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        this.spend.detalleRetenciones.forEach(e=>e.retenciones=null)
        axios
          .put(this.baseApiUrl + 'Gastos/' + this.spend.id, this.spend)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/spends/index' })
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
        this.spend.detalleRetenciones.forEach(e=>e.retenciones=null)
        axios
          .post(this.baseApiUrl + 'Gastos', this.spend)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/spends/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    addDedutions(){
      console.log('')
      if(this.deductions.id!='')
      {
        if(this.spend.detalleRetenciones.find(c=>c.RetencionId===this.deductions.id)==null)
          axios
            .get(this.baseApiUrl + 'Retenciones/'+this.deductions.id)
            .then((response) => {
              this.spend.detalleRetenciones.push({
                gastoId:0,
                RetencionId:this.deductions.id,
                retenciones:{descripcion:response.data.descripcion,porcentaje:response.data.porcentaje},   
                total:parseFloat((this.spend.subTotal*(response.data.porcentaje/100)).toFixed(2))
              })
              this.tableData= structuredClone(this.spend.detalleRetenciones)
              this.tableData.forEach(element=>element.retenciones.porcentaje+='%')
            }) 
      }
      else
       this.globalSweetMessage('Debe Selecionar una retencion','error')

    },
    reload(){
     this.spend.detalleRetenciones.forEach(element => {
      element.total=parseFloat(((element.retenciones.porcentaje/100)*this.spend.subTotal).toFixed(2))    
     })
     this.tableData= structuredClone(this.spend.detalleRetenciones)
    this.tableData.forEach(element=>element.retenciones.porcentaje+='%')
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
          if (result.value) {
            this.spend.detalleRetenciones.splice(row,1)
            this.tableData.splice(index,1)
          }
        })
    },
    addItbis(){
      this.spend.itbis =this.spend.subTotal * (this.selectitbis ? 0.18 : 0)
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
.pagination-select,
.search-input {
  width: 200px;
}
.swal2-icon-content {
  font-size: inherit !important;
}
.el-table th.el-table__cell {
  background-color: transparent;
}
</style>

