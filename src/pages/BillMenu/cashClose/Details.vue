<template>
      <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('cashClose.details') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} 
          <router-link to="/billDashboard/cashClose/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
              
            </button>
          </router-link>
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
        </h4>
      </template>
      <div class="col-ms-12 col-md-12">
            <h4 slot="header" class="card-title">
                    Datos del Cuadre
                </h4>
        <div class="row ">
          <div class="col-ms-12 col-md-6"><label class="col-form-label">Sucursal: {{ cuadreSucursal.sucursales }}</label></div>
          <div class="col-ms-12 col-md-6"><label class="col-form-label">Usuario: {{ cuadreSucursal.usuarios }}</label></div>
          <div class="col-ms-12 col-md-6"><label class="col-form-label">Fecha: {{ cuadreSucursal.fecha }}</label></div>
          <div class="col-ms-12 col-md-6"><label class="col-form-label">Turno: {{ cuadreSucursal.turnoId }}</label></div>
        <table class="table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Vendido</th>
              <th>Cuadre</th>
            </tr>
          </thead>
          <tbody>
        <tr> 
          <td>Efectivo</td>
          <td> {{ cuadreSucursal.totalVendidoEfectivo}}</td>
          <td> {{ cuadreSucursal.totalEfectivo}}</td>
        </tr>
        <tr> 
          <td>Transferencia</td>
          <td> {{ cuadreSucursal.totalVendidoTransferencia}}</td>
          <td> {{ cuadreSucursal.totalTransferencia}}</td>
        </tr>
        <tr> 
          <td>Tarjeta</td>
          <td> {{ cuadreSucursal.totalVendidoTarjeta}}</td>
          <td> {{ cuadreSucursal.totalTarjeta}}</td>
        </tr>
        <tr> 
          <td>Nota Credito</td>
          <td> {{ cuadreSucursal.totalVendidoNotaCredito}}</td>
          <td> {{ cuadreSucursal.totalNotaCredito}}</td>
        </tr>
         <tr>
            <td>
              <b>Total</b>
            </td>
            <td>{{ cuadreSucursal.totalGenaralVendido}} </td>
            <td> {{ cuadreSucursal.totalGenaral}}</td>
          </tr>
          </tbody>

        </table>

        </div>     
     </div>
    </card>
          <!-- Report -->
          <div class="container d-none">
          <div id="Print" class="bg-white h-100">
            <img src="/logo.png"  class="img-fluid w-25" style="height: 150px; margin-left:5%;" alt="Responsive image"/>

            <div :class="'row textprint '+ impresora">
              <div class="col-12 h3 text-center">Cuadre de caja</div>
              <div class="col-12"> Sucursal: {{cuadreSucursal.sucursales}}</div>
              <div class="col-12"> Fecha: {{cuadreSucursal.fecha}}</div>
              <div class="col-12"> Usuario: {{cuadreSucursal.usuarios}}</div>
              <div class="col-12"> Turno: {{cuadreSucursal.turnoId}}</div>
              <div class="col-12">
                <table class="mytable  w-100">
            <thead>
              <tr class="border-bottom">
                <th>Tipo</th>
                <th>Vendido</th>
                <th>Cuadre</th>
              </tr>
            </thead>
            <tbody>
          <tr> 
            <td>Efectivo</td>
            <td> {{ cuadreSucursal.totalVendidoEfectivo}}</td>
            <td> {{ cuadreSucursal.totalEfectivo}}</td>
          </tr>
          <tr> 
            <td>Transferencia</td>
            <td> {{ cuadreSucursal.totalVendidoTransferencia}}</td>
            <td> {{ cuadreSucursal.totalTransferencia}}</td>
          </tr>
          <tr> 
            <td>Tarjeta</td>
            <td> {{ cuadreSucursal.totalVendidoTarjeta}}</td>
            <td> {{ cuadreSucursal.totalTarjeta}}</td>
          </tr>
          <tr> 
            <td>Nota Credito</td>
            <td> {{ cuadreSucursal.totalVendidoNotaCredito}}</td>
            <td> {{ cuadreSucursal.totalNotaCredito}}</td>
          </tr>
          <tr>
            <td>
              <b>Total</b>
            </td>
            <td>{{ cuadreSucursal.totalGenaralVendido}} </td>
            <td> {{ cuadreSucursal.totalGenaral}}</td>
          </tr>

            </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
       <!-- End Report -->

  </div>
    
</template>

<script>
import {Select, Option } from 'element-ui'
import axios from 'axios'
import config from '@/config'
import Loading from 'vue-loading-overlay'

export default {
    components:{
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
},
  data(){
    return{
      impresora:'w-30',
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      selects: {
        simple: '',
        impresoras: [
          { id: 'w-30', nombre: '58mm' },
          { id: 'w-100', nombre: 'A4' }
        ]
      },
      cuadreSucursal:{
        sucursales:{nombre:''},
      },
      id:0,
      title: '',
    }
  },
    mounted()
    {
        this.baseApiUrl=config.global.baseApiUrl
        this.id = this.$route.params.id == '' ? '' : this.$route.params.id
        axios.get(this.baseApiUrl+'CuadreSucursal/'+this.id)
       .then((response)=>{
        console.log(response) 
        this.cuadreSucursal=response.data
        })
    }
  
}
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