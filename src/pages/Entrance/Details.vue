<template>
    <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('entrance.details') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} 
          <router-link to="/entrance/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
              
            </button>
          </router-link>
          <router-link to="/entrance/print">
            <button class="btn btn btn-twitter">
                 Imprimir <i class="fa-solid fa-print"></i>
            </button>
          </router-link>
        </h4>
      </template>
        <div class="row">  
        <div class="col-ms-12 col-md-4">
            <h4 slot="header" class="card-title">
                    Datos de la entrada
                </h4>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Sucursal</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ entradas.sucursales.nombre}}</label>              
                </div>           
            </div>

            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Suplidor</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ entradas.suplidores.nombre}}</label>              
                </div>           
            </div>

            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Fecha</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ entradas.fecha}}</label>              
                </div>           
            </div>
            <div class="row mb-3">
                <label class="col-sm-3 col-form-label">Nota</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ entradas.nota}}</label>              
                </div>           
            </div>
        </div>
        
        <div class="row col-ms-12 col-md-8" style="border-left:solid; ">
            <div class="col-12">
                <h4 slot="header" class="card-title text-center">
                    Detalle
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
            </div>
        </div>
    </div>
        </card>
      </div>
</template>
<script>
import { Table, TableColumn ,Select, Option,} from 'element-ui'
import { BasePagination } from 'src/components'
import Loading from 'vue-loading-overlay'
import axios from 'axios'
import config from '@/config'
import { computed } from 'vue'
export default ({
components:{
    Loading,
    BasePagination,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
}
,computed: {
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
  data(){
    return{
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      entradas:{
        sucursales:{nombre:''},
        suplidores:{nombre:''},
    },
      id:0,
      title: '',
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      propsToSearch: ['codigo'],
      tableColumns: [
        {
          prop: 'productos.nombre',
          label: 'Producto',
          minWidth: 110
        },
        {
          prop: 'codigoProducto',
          label: 'Codigo',
          minWidth: 100
        },
        {
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
        },
        {
          prop: 'valor',
          label: 'Valor',
          minWidth: 100
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 70
        }
   
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    }
  }
  ,methods:{


  },
  mounted(){
    this.baseApiUrl=config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    axios.get(this.baseApiUrl+'entradas/'+this.id)
        .then((reponse)=>{
            this.entradas=reponse.data
            this.tableData=reponse.data.detalleEntradas
            })

  }
})
</script>
<style>
.floatr {
  float: right;
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
