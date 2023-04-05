<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('spendsType.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/spendsType/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div class="row">
      <div :class="spendsType.id==0?'col-ms-12 col-md-12':'col-ms-12 col-md-6'">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
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
                    v-model="spendsType.descripcion"
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

            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="!id ? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/spendsType/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div v-show="spendsType.id!=0" class="col-ms-12 col-md-6">
        
        <div class="row">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-center">
            Sub Tipo de Gatos
          </h4>
          <ValidationObserver v-slot="{ handleSubmit}">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
             <div class="row"> 
              <label class="col-sm-3 col-form-label">Descripción*</label>
               <base-input class="col-sm-9" v-model="SubSpendsType.descripcion"></base-input>              
             </div>
             <div class="row col-11 m-auto">
             <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="SubSpendsType.id==0 ? createSubType() : editSubtype()"
                ><i class="tim-icons icon-check-2"></i
                >{{ SubSpendsType.id==0 ? 'Crear' : 'Editar' }}</base-button>
               
                <base-button type="danger" class="animation-on-hover"
                @click="SubSpendsType.id=0, SubSpendsType.descripcion=''"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </div>
          </form>
          </ValidationObserver>
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
    </div>  
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio,BasePagination } from 'src/components/index'
import { DatePicker, Select, Option,Table, TableColumn } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'
import BaseInput from '../../components/Inputs/BaseInput.vue'

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
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      spendsType: {
        descripcion: '',
        id:0
      },
      
      SubSpendsType:{
       id:0,
       tipogastoId:0,
       descripcion: '',
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      propsToSearch: ['descripcion'],
      tableColumns: [
        {
          prop: 'descripcion',
          label: 'Descripción',
          minWidth: 70
        },
        
      ],
      tableData: [
        {descripcion:'dalan'},
        {descripcion:'eli'}
      ],
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
    this.fillTable()
  },
  methods: {
    checkId() {
      axios
        .get(this.baseApiUrl + 'TipoGastos/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    fillTable(){
      axios
        .get(this.baseApiUrl + 'SubTipoGastos/ByTipoGasto/'+this.id)
        .then((response) => {
        this.tableData=response.data
        })
        .catch((error) => {
          this.errored = true
        })
    },
    validateFields() {
      return !this.spendsType.descripcion
    },
    validateFieldsSubType() {
      return !this.spendsType.descripcion
    },
    fillForm(obj) {
      this.spendsType = {
        descripcion: obj.descripcion,
        id: obj.id
      }
      this.SubSpendsType.tipogastoId= obj.id

      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.id : ''
    },
    clear() {
      this.spendsType.descripcion = ''
    },
    clearSubtype() {
      this.SubSpendsType.descripcion = ''
      this.SubSpendsType.id = 0
      
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'TipoGastos/' + this.spendsType.id, this.spendsType)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/spendsType/index' })
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
          .post(this.baseApiUrl + 'TipoGastos', this.spendsType)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/spendsType/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    createSubType() {
      if (this.validateFieldsSubType()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'SubTipoGastos', this.SubSpendsType)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clearSubtype()
            this.fillTable()

          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    editSubtype() {
      if (this.validateFieldsSubType()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'SubTipoGastos/' + this.SubSpendsType.id, this.SubSpendsType)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clearSubtype()
            this.fillTable()
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    handleEdit(index, row){
     this.SubSpendsType.descripcion=row.descripcion
     this.SubSpendsType.id=row.id
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
</style>
