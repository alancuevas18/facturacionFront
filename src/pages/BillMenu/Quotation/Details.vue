<template>
    <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('quotation.details') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} 
          <router-link to="/billDashboard/quotation/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
              
            </button>
          </router-link>
          <div class="row">
            <div class="col-md-4 col-ms-12">
              <div class="input-group mb-3">
                <el-select
                      class="select-primary"
                      size="large"
                      v-model="impresora"
                    >
                      <el-option
                        v-for="option in selects.impresoras"
                        class="select-primary"
                        :value="option.id"
                        :label="option.nombre"
                        :key="option.id"
                      >
                      </el-option>
                </el-select>
                <div class="input-group-append">
                  <base-button
                  type="twitter m-0"
                  v-print="'#Print'">
                  <i class="fa-solid fa-print m-0 "></i> Imprimir</base-button>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-ms-12">
              <router-link :to="'/billDashboard/bill/create/'+this.id">
                <button class="btn btn-primary ml-1">
                    Generar Factura 
                </button>
              </router-link>
            </div>
        </div>
        </h4>
      </template>
        <div class="row">  
        <div class="col-ms-12 col-md-4">
            <h4 slot="header" class="card-title">
                    Datos de la cotización
                </h4>

            <div class="row">
                <label class="col-sm-3 col-form-label">Cliente</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ cotizaciones.nombre}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-3 col-form-label">Identificación</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ cotizaciones.identificacion}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-3 col-form-label">Vendedor</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ cotizaciones.vendedores}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-3 col-form-label">Sucursal</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ cotizaciones.sucursales}}</label>              
                </div>           
            </div>
            
            <div class="row">
                <label class="col-sm-3 col-form-label">Fecha</label>
                <div class="col-sm-9">
                  <label class="col-form-label"> {{ cotizaciones.fecha}}</label>              
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
              <!-- Report -->
      <div class="container d-none">
    <div id="Print" class="bg-white h-100">
      <img src="/logo.png"  class="img-fluid w-25" style="height: 150px; margin-left:5%;" alt="Responsive image"/>

       <div :class="'row textprint '+ impresora">
        <div class="col-2">
        </div>
        <div class="col-12 display-3">
          {{ cotizaciones.sucursales }}
        </div>
        <div class="col-12">Cotizacion</div>        
        <div class="col-12"> Codigo: {{cotizaciones.id}}</div>
        <div class="col-12"> Cliente: {{cotizaciones.nombre}}</div>
        <div class="col-12"> Rnc: {{cotizaciones.identificacion}}</div>
      <div class="col-12">
          <table class="mytable w-100">
            <thead class="">
              <tr class="border-bottom">
        
                <th>Descripcion</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody v-for="item in cotizaciones.detalleCotizaciones" :key="item.id">        
              <tr>
                <td colspan="2">        
                    {{item.productos?.nombre}}{{ item.servicios?.nombre }}
            
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr >
                <td>
                    {{item.cantidad}} X {{item.valorProducto}}                
                </td>
                <td>{{item.total}}</td>
              </tr>

            </tbody>

          </table>
          <hr> <div class="col-12 text-right">Total: {{cotizaciones.detalleCotizaciones.map(c=>c.total).reduce((a, b) => a + b, 0).toFixed(2)}}</div>

          

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
import { select } from 'd3'
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
    impresora:'w-100',
    isLoading: false,
    fullPage: true,
    baseApiUrl: '',
    cotizaciones:{
     detalleCotizaciones:[{total:0}]
    },
    selects: {
      tipoajuste:[],
      impresoras: [
          { id: 'w-30', nombre: '58mm' },
          { id: 'w-100', nombre: 'A4' }
        ]
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
          prop: 'productos.codigo',
          label: 'Codigo',
          minWidth: 100
        },
        {
          prop: 'productos.nombre',
          label: 'Nombre',
          minWidth: 100
        },
        {
          prop: 'productos.descripcion',
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
     axios.get(this.baseApiUrl+'Cotizaciones/'+this.id)
        .then((reponse)=>{
            this.cotizaciones=reponse.data
            this.tableData=reponse.data.detalleCotizaciones
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
body{
  background: white;
}
.textprint{
  font-size: 12pt;
  color: black;
}
.w-30{
  width: 38%;
  margin-left: 0.01px;
}
</style>
