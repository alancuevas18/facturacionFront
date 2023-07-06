<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
<card>
    <template slot="header">
        <h4 class="card-title">
            {{ $t('Reports.ReportBills') }}
   
        </h4>
      </template>
      <div>
        <form>
            <div class="row">

                <div class="col-md-6">
                <label class="col-sm-12 col-form-label">Fecha Inicio</label>
                <div class="col-sm-10">
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha Inicio"
                        v-model="reportes.fechaInicio"
                      >
                      </el-date-picker>
                    </base-input>
                </div>
              </div>
              <div class="col-md-6">
                <label class="col-sm-12 col-form-label">Fecha Fin</label>
                <div class="col-sm-10">
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha Fin"
                        v-model="reportes.fechaFin"
                      >
                      </el-date-picker>
                    </base-input>
                </div>
              </div>


            </div>
          <div class="row">
            
            <div class="col-md-6">
              <label class="col-sm-12 col-form-label mt-2">Sucursal</label>
              <div class="col-sm-10">
                <el-select
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Sucursal"
                  v-model="reportes.sucursalId"
                >
                  <el-option
                    v-for="option in selects.sucursales"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="col-sm-12 col-form-label mt-2">Cliente</label>
              <div class="col-sm-10">
                <el-select
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Cliente"
                  v-model="reportes.clienteId"
                >
                  <el-option
                    v-for="option in selects.clientes"
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
          <div class="row">
            
            <div class="col-md-6">
              <label class="col-sm-12 col-form-label mt-2">Tipo</label>
              <div class="col-sm-10">
                <el-select
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Tipo"
                  v-model="reportes.tipoFactura"
                >
                  <el-option
                    v-for="option in selects.TipoFactura"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="col-sm-12 col-form-label mt-2">Estado</label>
              <div class="col-sm-10">
                <el-select
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Estado"
                  v-model="reportes.estadoFactura"
                >
                  <el-option
                    v-for="option in selects.EstadoFactura"
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
          <div class="col-md-12 col-ms-12 mt-2">            
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover w-100"
                @click.native="create()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >Filtrar</base-button
              >
              </div>
        </form>
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
        <div class="col-12">
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
          <hr> <div class="col-12 text-right"> <label> Descuento: {{reportesFacturas.map(c=>c.descuento).reduce((a, b) => a + b, 0).toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"> <label> Abono: {{reportesFacturas.map(c=>c.abono).reduce((a, b) => a + b, 0).toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"> <label> Total: {{reportesFacturas.map(c=>c.total).reduce((a, b) => a + b, 0).toFixed(2)}}</label></div>

        </div>
      </div>
</card>

      <!-- Report -->
      <div class="container d-none">
    <div id="Print" class="bg-white h-100 mb-3 mt-2">
      <img src="/logo.png"  class="img-fluid w-25" style="height: 150px; margin-left:36%;" alt="Responsive image"/>

       <div :class="'row textprint '+ impresora">
        <div class="col-2">
        </div>
        <div class="col-12 display-5"   v-if="reportes.sucursalId!=null">
          <b>Sucursal:</b>  {{ reportesFacturas.length!=0?reportesFacturas[0].sucursales.nombre:''}}
        </div>
      <div class="col-12">
          <table class="mytable w-100">
            <thead class="">
              <tr class="border-bottom">
        
                <th v-if="reportes.sucursalId==null">Sucursal</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Descuento</th>
                <th>Sub total</th>
                <th>Itbis</th>
                <th>Abono</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody v-for="item in reportesFacturas" :key="item.codigo">        
              <tr>
                <td v-if="reportes.sucursalId==null">{{item.sucursales.nombre}}</td>
                <td>{{item.tipoFacturaName}}</td>
                <td>{{item.estadoFacturaName}}</td>         
                <td>{{item.descuento}}</td>
                <td>{{item.subTotal}}</td>
                <td>{{item.itbis}}</td>
                <td>{{item.abono}}</td>
                <td>{{item.total}}</td>
              </tr>

            </tbody>

          </table>
          <hr> <div class="col-12 text-right">Descuento: {{reportesFacturas.map(c=>c.descuento).reduce((a, b) => a + b, 0).toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Abono: {{reportesFacturas.map(c=>c.abono).reduce((a, b) => a + b, 0).toFixed(2)}}</div>
         <hr> <div class="col-12 text-right">Total: {{reportesFacturas.map(c=>c.total).reduce((a, b) => a + b, 0).toFixed(2)}}</div>
         

        </div>
       </div>
    </div>
         </div>
       <!-- End Report -->
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { DatePicker, Select, Option,Table, TableColumn, } from 'element-ui'
import axios from 'axios'
import config from '@/config'
export default {
    components:{
      Loading,
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
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
    data(){
      return{
        impresora:'w-100',
        isLoading: false,
        fullPage: true,
        pagination: {
        perPage:10000,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
        },
        baseApiUrl:'',
        reportes:{
         fechaInicio: '2023-05-10',
         fechaFin: new Date(),
         sucursalId:null,
         clienteId:null,
         tipoFactura:null,
         estadoFactura:null
        },
        selects:{
            sucursales:[],
            clientes:[],
            TipoFactura:[],
            EstadoFactura:[],
            impresoras: [
              { id: 'w-100', nombre: 'A4' }
            ]
        },
        searchQuery: '',
      propsToSearch: ['codigo'],
      tableColumns: [
       {
          prop: 'nombre',
          label: 'Cliente',
          minWidth: 130
        },
        {
          prop: 'sucursales.nombre',
          label: 'sucursal',
          minWidth: 130
        },
        {
          prop: 'tipoFacturaName',
          label: 'Tipo',
          minWidth: 130
        },
        {
          prop: 'estadoFacturaName',
          label: 'Estado',
          minWidth: 130
        },
        {
          prop: 'descuento',
          label: 'Descuento',
          minWidth: 80
        },
        {
          prop: 'subTotal',
          label: 'Sub Total',
          minWidth: 110
        },
        {
          prop: 'itbis',
          label: 'ITBIS',
          minWidth: 80
        },
        {
          prop: 'abono',
          label: 'Abono',
          minWidth: 80
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        }
      ],
      reportesFacturas:[
        {
          sucursales:{nombre:''},
          total:0,
          abono:0,
          descuento:0,
        }],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
        
      }
    },
    mounted(){
        this.baseApiUrl=config.global.baseApiUrl
        this.fillCatalogs(['sucursales','clientes','TipoFactura','EstadoFactura'])
    },
    methods:{
      create(){
        axios.post(this.baseApiUrl+'Reportes/Facturas', this.reportes).then((response)=>{
              console.log(response.data.result)
              this.tableData= response.data.result
              this.reportesFacturas= response.data.result
              console.log(response.data.result)
       })
       
       
      },
      fillCatalogs(catalogs) {
      catalogs.forEach((catalog) => {
        axios
          .get(this.baseApiUrl + 'catalogo/' + catalog)
          .then((response) => {
            this.selects[catalog] = response.data
            this.selects[catalog].push({id:null,nombre:'Seleccionar Todos'})
            this.selects[catalog]= this.selects[catalog].sort(function(a, b){return a.id - b.id})
          })
          .catch((error) => {
            this.globalSweetMessage('Error al cargar la pagina', 'error')
          })
      })
    }
    }
}
</script>

<style scoped>
.textprint{
  color: black;
}

</style>