<template>
    <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
       {{ $t('bill.details') }}
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
        <div class="row">  
        <div class="col-ms-12 col-md-4">
            <h4 slot="header" class="card-title">
                    Datos del envio
                </h4>

            <div class="row">
                <label class="col-sm-4 col-form-label">Codigo Factura</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.cliente}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Cliente</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.cliente}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Telefono</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.numeroContacto}}</label>              
                </div>           
            </div>
      
            <div class="row">
                <label class="col-sm-4 col-form-label">Sucursal</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.sucursales.nombre}}</label>              
                </div>           
            </div>
            
            <div class="row">
                <label class="col-sm-4 col-form-label">Fecha</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.fechaEnvio}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Mensajero</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.mensajeros}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Nota</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ send.nota}}</label>              
                </div>           
            </div>
     
        </div>
        
        <div class="row col-ms-12 col-md-8" style="border-left:solid; ">
          <div class="col-ms-12">
            <h4 slot="header" class="card-title">
                    Datos de la factura
                </h4>

            <div class="row">
                <label class="col-sm-4 col-form-label">Cliente</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.nombre}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Identificación</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.identificacion}}</label>              
                </div>           
            </div>
            <div class="row">
                <label class="col-sm-4 col-form-label">Sucursal</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.sucursales.nombre}}</label>              
                </div>           
            </div>            
            <div class="row">
                <label class="col-sm-4 col-form-label">Fecha</label>
                <div class="col-sm-8">
                  <label class="col-form-label"> {{ facturas.fecha}}</label>              
                </div>           
            </div>


     
        </div>
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
              <tr v-for="item in facturas.detalleFactura" :key="item.id">
                <td>{{item.precio.toFixed(2)}}</td>
                <td>{{item.productos?.nombre}}{{ item.servicios?.nombre }}</td>
                <td>{{item.cantidad}}</td>
                <td>{{item.total.toFixed(2)}}</td>
              </tr>

            </tbody>

          </table>

          <hr> <div class="col-12 text-right"> <label> Descuento: {{facturas.descuento.toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"><label> Sub Total: {{facturas.subTotal.toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"><label> Itbis: {{facturas.itbis.toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"><label> Total:{{facturas.total.toFixed(2)}}</label></div>
          <hr> <div class="col-12 text-right"><label> Monto Pagado:{{facturas.abono.toFixed(2)}}</label></div>
             </div>
            </div>
        </div>
    </div>

        </card>

      <!-- Report -->
      <div class="container d-none">
    <div id="Print" class="bg-white h-100">
      
      <div :class="'row textprint '+ impresora">
        <img src="/logo.png"  class="img-fluid w-50" style="height: 200px; margin-left:5%;" alt="Responsive image"/>
        <div class="col-2">
        </div>
        <div class="col-12 display-3">
          {{ send.sucursales.nombre }}
        </div>            
        <div class="col-12"><b> Codigo Factura: </b>{{send.facturaId }}</div>
        <div class="col-12"><b> Quien Recibe: </b>{{send.cliente }}</div>
        <div class="col-12"><b> Contacto: </b>{{send.numeroContacto}}</div>    
        <div class="col-12"><b> Dirección: </b>{{send.direccion}}</div>    
        <div class="col-12"><b> Codigo envio: </b>{{send.id}}</div>
        <div class="col-12"><b> Fecha:</b> {{send.fechaEnvio}}</div>
        <div class="col-12"><b> Mensajero:</b> {{send.mensajeros}}</div>
        <div class="col-12"><b> Nota:</b> {{send.nota}}</div>
      <div class="col-12">
        <div class="text-center font-weight-bold">Lista de Producto</div> 
        <hr/>
          <table class="mytable w-100">
            <thead class="">
              <tr class="border-bottom">
        
                <th>Descripcion</th>
                <th>Cantidad</th>

              </tr>
            </thead>
            <tbody v-for="item in facturas.detalleFactura" :key="item.id">        
              <tr>
                <td>        
                    {{item.productos?.nombre}}{{ item.servicios?.nombre }}
            
                </td>
                <td> {{item.cantidad}} </td>
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
import Loading from 'vue-loading-overlay'
import axios from 'axios'
import config from '@/config'
import { computed } from 'vue'
import { select } from 'd3'
export default ({
components:{
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
}
,
  data(){
    return{
      impresora:'w-57',
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      selects: {
        simple: '',
        impresoras: [
          { id: 'w-57', nombre: '4 in X 10 in' }  ,    
          { id: 'w-30', nombre: '58mm' },
          { id: 'w-100', nombre: 'A4' },
        ]
      },
      send:{
        sucursales:{nombre:''},
      },
      facturas:{
        sucursales:{nombre:''},
        detallefacturas:[],
        descuento:0,
        subTotal:0,
        itbis:0,
        total:0,
        abono:0,
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
     axios.get(this.baseApiUrl+'Envios/'+this.id)
        .then((response)=>{
            this.send=response.data
            this.facturas=response.data.facturas
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
  font-size: 16pt;
  color: black;
}
.w-30{
  width: 38%;
  margin-left: 0.01px;
}
.w-57{
  width: 57%;
  margin-left: 20px;
  margin-top: 30px;
}
</style>
