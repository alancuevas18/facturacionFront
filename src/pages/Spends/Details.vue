<template>
    <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('spends.details') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} 
          <router-link to="/Spends/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
              
            </button>
          </router-link>
          <base-button
                  type="twitter"
                  size="lg"
                  v-print="'#Print'"
                ><i class="fa-solid fa-print "></i> Imprimir</base-button
                >
        </h4>
      </template>
        <div class="row">  
        <div class="col-ms-12 col-md-5">
            <h4 slot="header" class="card-title">
                    Datos de la Compra
                </h4>
          <div class="row">
                <label class="col-sm-4 col-form-label">Descripción</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.descripcion}}</label>              
                </div>           
          </div>     
           <div class="row">
                <label class="col-sm-4 col-form-label">Sucursal</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.sucursales}}</label>              
                </div>           
            </div>

            <div class="row">
                <label class="col-sm-4 col-form-label">Tipo de Gastos</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.tipoGastos}}</label>              
                </div>           
            </div>
            
            <div class="row">
                <label class="col-sm-4 col-form-label">Sub Tipo de Gastos</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.subTipoGastos}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Fecha</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.fecha}}</label>              
                </div>           
            </div>
            
            <div class="row">
                <label class="col-sm-4 col-form-label">NCF</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.comprobante}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Sub Total</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.subTotal}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Itbis</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.itbis}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Total</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ gastos.total}}</label>              
                </div>           
            </div>
    
        </div>
        
        <div class="row col-ms-12 col-md-7" style="border-left:solid; ">
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
      <!-- Report -->
      <div class="container d-none bg-white">
    <div id="Print" class="bg-white h-100 imprimir">
       <div class="row">
        <div class="col-2">
          <img />
        </div>
        <div class="col-12 display-3">
          {{ gastos.sucursales }}
        </div>
        <div class="col-12"> Fecha: {{gastos.fecha}}</div>
        <div class="col-12 text-center">Gastos</div>
        <div class="col-12"> Codigo: {{gastos.id}}</div>
        <div class="col-12"> NCF: {{gastos.comprobante}}</div>
      <div class="col-12">

          <hr> <div class="col-12 text-right">Sub Total: {{gastos.subTotal.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Itbis: {{gastos.itbis.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Total:{{gastos.total.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">ISR:{{gastos.totalRetenciones.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Monto Pagado:{{gastos.montoPagar.toFixed(2)}}</div>


        </div>
       </div>
    </div>
         </div>
       <!-- End Report -->

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
      gastos:{},
    selects: {
      estadoCompra:[]
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
      propsToSearch: ['retenciones.descripcion'],
      tableColumns: [
        {
          prop: 'retenciones.descripcion',
          label: 'Retencion',
          minWidth: 110
        },
        {
          prop: 'retenciones.porcentaje',
          label: 'Porcentaje',
          minWidth: 110
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
 async mounted(){
    this.baseApiUrl=config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    axios.get(this.baseApiUrl+'gastos/'+this.id)
        .then((reponse)=>{
            this.gastos=reponse.data
            reponse.data.detalleRetenciones.forEach(element => {
              this.tableData.push(element)            
              element.retenciones.porcentaje+='%'
              });   
            })

  }
})
</script>
<style>
body{
  background: white;
}
.imprimir{
  font-size:30pt;
}
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
