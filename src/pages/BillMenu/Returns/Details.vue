<template>
    <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('returns.details') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} 
          <router-link to="/Inventoryadjustment/index">
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
        <div class="col-ms-12 col-md-4">
            <h4 slot="header" class="card-title">
                    Datos de la devolución
                </h4>

            <div class="row">
                <label class="col-sm-4 col-form-label">Codigo</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ devoluciones.id}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Codigo factura</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ devoluciones.facturaId}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Sucursal</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ devoluciones.sucursales}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Movito</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ devoluciones.motivoDevolucionName}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Fecha</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ devoluciones.fecha}}</label>              
                </div>           
            </div>


     
        </div>
            
            <div class="row col-ms-12 col-md-8" style="border-left:solid; ">
                <div class="col-12">
                    <h4 slot="header" class="card-title text-center">
                        Detalle
                    </h4>
                <div class="col-12">
                <table class="table">
                <thead class="">
                <tr class="border-bottom">
                    <th>Precio</th>
                    <th>Producto/Servicio</th>
                    <th>Cantidad</th>
                    <th>Total</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="item in devoluciones.detalleDevoluciones" :key="item.id">
                    <td>{{item.precio.toFixed(2)}}</td>
                    <td>{{item.productos?.nombre}}</td>
                    <td>{{item.cantidad}}</td>
                    <td>{{item.total.toFixed(2)}}</td>
                </tr>

                </tbody>

            </table>
            <hr> <div class="col-12 text-right"><label> Sub total: {{devoluciones.subTotal.toFixed(2)}}</label></div>
            <hr> <div class="col-12 text-right"><label> Itbis: {{devoluciones.itbis.toFixed(2)}}</label></div>
            <hr> <div class="col-12 text-right"><label> Total:{{devoluciones.total.toFixed(2)}}</label></div>
                </div>
                </div>
            </div>
    </div>
        </card>

      <!-- Report -->
        <div class="container d-none">
            <div id="Print" class="bg-white h-100">
            <div class="row">
                <div class="col-2">
                <img />
                </div>
                <div class="col-12 display-4">
                {{ devoluciones.sucursales }}
                </div>
                <div class="col-12"> Fecha: {{devoluciones.fecha}}</div>
                <div class="col-12 text-center">Devolución</div>        
                <div class="col-12"> Codigo: {{devoluciones.id}}</div>
                <div class="col-12"> codigo Factura: {{devoluciones.facturaId}}</div>
                <div class="col-12"> NCF: {{devoluciones.motivoDevolucionName}}</div>
                <div class="col-12"> Nota: {{devoluciones.nota}}</div>
            <div class="col-12">
                <table class="mytable w-100">
                    <thead class="">
                    <tr class="border-bottom">
                        <th>Precio</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in devoluciones.detalleDevoluciones" :key="item.id">
                        <td>{{item.precio.toFixed(2)}}</td>
                        <td>{{item.productos?.nombre}}</td>
                        <td>{{item.cantidad}}</td>
                        <td>{{item.total.toFixed(2)}}</td>
                    </tr>

                    </tbody>

                </table>
                <hr> <div class="col-12 text-right">Sub total: {{devoluciones.subTotal.toFixed(2)}}</div>
                <hr> <div class="col-12 text-right">Itbis: {{devoluciones.itbis.toFixed(2)}}</div>
                <hr> <div class="col-12 text-right">Total:{{devoluciones.total.toFixed(2)}}</div>


                </div>
            </div>
            </div>
        </div>
       <!-- End Report -->


      </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import axios from 'axios'
import config from '@/config'
import { computed } from 'vue'
import { select } from 'd3'
export default ({
components:{
    Loading,
}
,
  data(){
    return{
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      devoluciones:{
        detalleDevoluciones:[]
      },
      id:0,
      title: '',
    }
  }
  ,methods:{
  },
  mounted(){
    this.baseApiUrl=config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
     axios.get(this.baseApiUrl+'Devoluciones/'+this.id)
        .then((reponse)=>{
            this.devoluciones=reponse.data
            this.tableData=reponse.data.detalleFactura
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
</style>
