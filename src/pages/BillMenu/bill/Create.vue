<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />

    <div class="col-12" >
       <!-- modal productos or servisico -->
      <div class="col-md-4 col-ms-12 modalsearch container" v-if="ver_popup_search" >

         <div class="row m-1">
           <div class="col-11 text-center"> {{ titleModal }} </div>
           <div class="col-1"> <i class="fa-solid fa-xmark" @click="ver_popup_search=false"></i></div>
         </div>
         <div class="col-12">

          <label class="col-form-label">Buscar</label>
          <base-input
            class="mb-0 text-dark"
            placeholder="Producto"
            required
            v-model="search"
            v-on:keyup="filterProduct()"
          >
          </base-input>
          </div>
         <div class="tableFixHead scroll mt-2">

         <table class="mytable">
           <thead>
             <tr>
               <th>{{ titleModal }}</th>
               <th>Codigo</th>
               <th>Precio</th>
               <th>Eligir</th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="item in tableDataProducFilter" :key="item.id">
              <td>{{item.nombre}}</td>
              <td>{{item.codigo}}</td>
              <td>{{item.precio}}</td>
              <td><i class="fa-solid fa-check" @click="ver_popup_search=false,currentCode.codigo=item.codigo"></i></td>
            </tr>
           </tbody>
         </table>
         </div>

       </div>
       <!-- end modal productos or servisico -->
      <card>
        <div class="row">

          <!--add Product and service -->
          <div class="col-md-4 col-ms-12" v-if="!pagodo">
              <base-button
                  type="info"
                  :class="formToAddProducts?'btn animation-on-hover btn-info':'btn btn-link'"
                  size="sm"
                  @click.native="changeShowForm('Producto')"
                >
                  Agregar Productos</base-button
                >
              <base-button
                  type="info"
                  :class="!formToAddProducts?'btn animation-on-hover btn-info':'btn btn-link'"
                  size="sm"
                  @click.native="changeShowForm('Servicio')"
                >
                  Agregar Servicios</base-button
                >
              <form class="row align-items-center" v-if="formToAddProducts">
                  <div class="col-12">

                    <label class="col-form-label">Producto</label>           
                    <div class="input-group mb-3">
                  <input type="text" 
                    class="form-control" 
                    placeholder="Escriba el codigo y presione 'Enter'" 
                    autofocus
                    v-model="currentCode.codigo"
                    v-on:keyup.enter="pickProduct()">
                  <div class="input-group-append">
                    <button 
                    class="btn btn-outline-secondary m-0" 
                    type="button" 
                    @click="pickProduct()"><i class="fa-solid fa-check"></i></button>
                  </div>
                </div>
                  </div>
                  <div class="row col-12">
                   <label class="col-form-label col-12">Precio</label>

                    <div class="col-6">
                      <base-radio v-model="typePrice" name="precio" :value="'precio'">Detalle</base-radio>
                    </div>
                    <div class="col-6">
                      <base-radio v-model="typePrice" name="precioMinimo" :value="'precioMinimo'">Por mayor</base-radio>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="col-form-label">Cantidad</label>
                    <base-input
                      class="mb-0"
                      size="4"
                      placeholder="0"
                      required
                      type="number"
                      id="ProductoCantidad"
                      v-model="currentCode.quanty"
                      v-on:keyup.enter="pickProduct()"
                    >
                    </base-input>
                  </div>
            
     
                  <div class="col-12">
                    <label class="col-form-label">Descuento</label>
                    <base-input
                      class="mb-0"
                      placeholder="Descuento"
                      required
                      v-model="currentCode.descuento"
                      type="number"
                      v-on:keyup.enter="pickProduct()"
                    >
                    </base-input>
                  </div>
                  <div class="row col-12 mt-2">
                    <div class="col-6">
                    <base-button
                      type="success"
                      class="animation-on-hover w-100"
                      size="md"
                      @click.native="pickProduct()"
                      ><i class="fa-solid fa-plus"></i></base-button
                    >
                    </div>
                    <div class="col-6">
                    <base-button
                      type="primary"
                      class="animation-on-hover w-100"
                      size="md"
                      @click.native="subgetModal('Productos')"
                      ><i class="fa-solid fa-magnifying-glass"></i
                    ></base-button>
                    </div>
                    </div>
              </form>
              <form class="row align-items-center" v-if="!formToAddProducts">
         
                  <div class="col-12">
                    <label class="col-form-label">Servicio</label>           
                    <div class="input-group mb-3">
                    <input type="text" 
                    class="form-control" 
                    placeholder="Escriba el codigo y presione 'Enter'" 
                    id="sercivioCodigo"
                    autofocus
                    v-model="currentCode.codigo"
                    v-on:keyup.enter="verificarPrecio()">
                    <div class="input-group-append">
                    <button 
                    class="btn btn-outline-secondary m-0" 
                    type="button" 
                    @click="verificarPrecio()"><i class="fa-solid fa-check"></i></button>
                    </div>
                    </div>
                  </div>
                  
                  <div class="col-12">
                      <label class="col-form-label">Precio</label>
                      <base-input
                        class="mb-0"
                        size="4"
                        placeholder="0"
                        required
                        type="number"
                        id="ServicioCantidad"
                        v-model="currentCode.price"
                        v-on:keyup.enter="pickService()"
                      >
                      </base-input>
                  </div>
                  <div class="col-12">
                      <label class="col-form-label">Cantidad</label>
                      <base-input
                        class="mb-0"
                        size="4"
                        placeholder="0"
                        required
                        type="number"
                        v-model="currentCode.quanty"
                        v-on:keyup.enter="pickService()"
                      >
                      </base-input>
                  </div>
                  <div class="col-12">
                      <label class="col-form-label">Descuento</label>
                      <base-input
                        class="mb-0"
                        placeholder="Descuento"
                        required
                        v-model="currentCode.descuento"
                        type="number"
                        v-on:keyup.enter="pickService()"
                      >
                      </base-input>
                  </div>
                  <div class="row col-12 mt-2">
                    <div class="col-6">
                      <base-button
                      type="success"
                      class="animation-on-hover w-100"
                      size="md"
                      @click.native="pickService()"
                      ><i class="fa-solid fa-plus"></i></base-button>
                    </div>
                    <div class="col-6">
                      <base-button
                      type="primary"
                      class="animation-on-hover w-100"
                      size="md"
                      @click.native="subgetModal('Servicios')"
                      ><i class="fa-solid fa-magnifying-glass"></i
                  ></base-button>
                    </div>
                  </div>

              </form>
          </div>
          <!-- end add Product and service -->

          <!--Select client, seller, typeBill and typeTax-->
          <div :class="pagodo?'col-md-12':'col-md-8 col-ms-12 '">
    
            <div class="row">
              
              <div class="h3 col-12" style="margin-bottom: -10px;">
              <a @click="menuOption=!menuOption"> <i class="fa-solid fa-sliders text-white"></i></a>
             <div class="ml-2 h3 position-absolute rounded-lg row"  style="z-index: 15; background-color: #202840; margin:-34px 33px !important;"  v-if="menuOption">
              <div class="col-12">
                <base-checkbox v-model="Vendedor">
                Vendedor
              </base-checkbox>
              </div>
              <div class="col-12">
                <base-checkbox  v-model="Comprobante">
                  Comprobante
                </base-checkbox>
              </div>
             </div>
            </div>

              <div class="col-md-3 col-ms-12">
              <label class="col-form-label">Cliente</label>
              <el-select
                required
                filterable
                :disabled="readOnly"
                :key="readOnly"
                class="select-primary w-100"
                size="large"
                placeholder="Cliente"
                v-model="bill.clienteId"
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
              <div class="col-md-3 col-ms-12" v-show="Vendedor">
                <label class="col-form-label">Vendedor</label>
                <el-select
                  required
                  filterable
                  :disabled="readOnly"
                  :key="readOnly"
                  class="select-primary w-100"
                  size="large"
                  placeholder="Vendedor"
                  v-model="bill.vendedorId"
                >
                  <el-option
                    v-for="option in selects.vendedores"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-md-3 col-ms-12">
              <label class="col-form-label">Tipo Factura</label>
              <el-select
                required
                filterable
                :disabled="readOnly"
                :key="readOnly"
                class="select-primary w-100"
                size="large"
                placeholder="Cliente"
                v-model="bill.tipoFactura"
              >
                <el-option
                  v-for="option in selects.tipoFactura"
                  class="select-primary"
                  :value="option.id"
                  :label="option.nombre"
                  :key="option.id"
                >
                </el-option>
              </el-select>
              </div>
             <div class="col-md-3 col-ms-12"  v-show="Comprobante">
              <label class="col-form-label">Comprobante</label>
              <el-select
                required
                filterable
                :disabled="readOnly"
                :key="readOnly"
                class="select-primary w-100"
                size="large"
                placeholder="Vendedor"
                v-model="bill.tipoComprobante"
              >
                <el-option
                  v-for="option in selects.tipoComprobante"
                  class="select-primary"
                  :value="option.id"
                  :label="option.nombre"
                  :key="option.id"
                >
                </el-option>
              </el-select>
            </div>

          </div> 

            <card card-body-classes="table-full-width">
            <div>
              <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
              ></div>
            <div class="tableFixHead scroll scroll-white mt-2 tableFixHead2" id="tableProducto">
                  <el-table :data="queriedData">
                    <el-table-column
                      v-for="column in tableColumns"
                      :key="column.label"
                      :min-width="column.minWidth"
                      :prop="column.prop"
                      :label="column.label"
                    >
                    </el-table-column>
                    <el-table-column :min-width="50" align="left" label="" v-if="!pagodo">
                      <div slot-scope="props">
                        <base-button
                          @click.native="handleDelete(props.$index, props.row)"
                          class="remove btn-link"
                          type="danger"
                          size="sm"
                          icon
                          v-if="!readOnly"
                        >
                          <i class="tim-icons icon-simple-remove"></i>
                        </base-button>
                      </div>
                    </el-table-column>
                  </el-table>
            </div>
            </div>
            <div
              slot="footer"
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >

              <div class="col-4">
                <p class="h4">Sub total: {{ subtotal.toFixed(2) }}</p>
              </div>
              <div class="col-4">
                <p class="h4">Itbis: {{itbis.toFixed(2) }}</p>
              </div>
              <div class="col-4">
                <p class="h4">Descuento: {{ descuento.toFixed(2) }}</p>
              </div>
              <div class="col-4">
                <p class="h4">Total: {{ total.toFixed(2) }}</p>
              </div>
              <div class="col-4">
                <p class="h4">Abono: {{bill.abono.toFixed(2) }}</p>
              </div>
              <div class="col-4">
                <p class="h4">Pendiente: {{ pendiente.toFixed(2) }}</p>
              </div>
              <div class="col-12 justify-content-center  align-items-centerm d-flex" v-if="!pagodo">
            <div class="col-12">
              <base-button
                  type="google"
                  class="w-100"
                  size="lg"
                  @click.native="checkIn()"
                  v-if="tableData.length>0"
                ><i class="fa-solid fa-money-check-dollar display-4"></i> Facturar</base-button
                >
            </div>
          </div>
            </div>

          </card>
          </div>

        </div>
        <div class="row">

          <!-- methods pay -->
          <div class="col-12 row" v-if="pagodo && (pendiente>0 && bill.tipoFactura==1)">
            <div class="col-md-3">
              <base-button
                  type="youtube"
                  class="w-100"
                  size="lg"
                  @click.native="changeShowFormPay('Efectivo',1)"
                ><i class="fa-solid fa-money-bill display-4"></i> Efectivo</base-button
                >
            </div>
            <div class="col-md-3">
              <base-button
                  type="green"
                  class="w-100"
                  size="lg"
                  @click.native="changeShowFormPay('Tranferencia',2)"
                >
                <i class="fa-solid fa-money-bill-transfer display-4"></i> Tranferencia</base-button
                >
            </div>
            <div class="col-md-3">
              <base-button
                  type="behance"
                  class="w-100"
                  id="buttonpago"
                  size="lg"
                  @click.native="changeShowFormPay('Tarjeta',3)"
                >
                <i class="fa-solid fa-credit-card display-4"></i> Tarjeta</base-button
                >
            </div>
            <div class="col-md-3">
              <base-button
                  type="yellow"
                  class="w-100"
                  @click.native="changeShowFormPay('Credito',4)"
                >
                <i class="fa-solid fa-comments-dollar display-4"></i>Nota Credito</base-button
                >
            </div>
          </div>
          <!-- print  -->
          <div class="col-12 row" v-if="pagodo &&( pendiente<=0 || bill.tipoFactura==2)">
            <div class="col-md-6 col-ms-12 ">
       
                <div class="input-group"> 
                <el-select
                      class="select-primary impresora" 
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
                  type="twitter m-0 btn-lg"
                  v-print="'#Print'">
                  <i class="fa-solid fa-print display-4"></i> Imprimir</base-button>
                </div>
          </div>
            </div>
            <div class="col-md-6 col-ms-12">
              <router-link to="/billDashboard/bill/create"   @click.native="$router.go()">
              <button class="btn  btn-lg btn-youtube w-100">
                <i class="fa-solid fa-file-invoice display-4"></i> General nuevaa Factura
              </button>
            </router-link>
            </div>
          </div>
        </div>
      </card>

    </div>
       <!-- modal pay -->
       <div class="col-md-4 col-ms-12 modalpay container" :class="'modal-'+titleModalPay" v-if="ver_popup_pay &&pendiente>0" >

         <div class="row mt-3">
           <div class="col-10 display-4 text-center">Realizar pago {{titleModalPay}}</div>
           <div class="col-2 h2 text-white">
            <base-button
                  type="link"
                  @click.native="ver_popup_pay=false"
                > <i class="fa-solid fa-xmark display-4 text-white"></i></base-button
                >

           </div>
         </div>

         <div class="col-12 row">
            <div class="col-3">Pendiente:</div>
            <div class="col-9">{{pendiente.toLocaleString("en-US")}}</div>
         </div>

         <div class="col-12 row mt-3">
            <label class="col-form-label col-2">Total</label>
            <base-input
              class="mb-0 col-10"
              placeholder="Total"
              required
              id="inputpago"
              v-model="pay.total"
              v-on:keyup.enter="paying()"
              >
           </base-input>
         </div>
         <div class="col-12 row mt-1">
            <label class="col-form-label col-2">Nota</label>
           <div class="col-10">
            <textarea class="form-control" id="inputpago" v-model="pay.nota"></textarea>
          </div>
         </div>
         <div class="col-md-12 mt-2">

                <base-button
                  type="light"
                  class="w-100"
                  size="lg"
                  @click.native="paying()"
                ><i class="fa-solid fa-credit-card display-4"></i> Pagar</base-button
                >
            </div>
       </div>
       <!-- end modal pay -->
       <!-- Report -->
       <div class="container d-none">
    <div id="Print" class="bg-white h-100">
      <img src="/logo.png"  class="img-fluid w-25" style="height: 150px; margin-left:5%;" alt="Responsive image"/>

       <div :class="'row textprint '+ impresora">
        <div class="col-2">
        </div>
        <div class="col-12 display-3">
          {{ facturas.sucursales.nombre }}
        </div>
        <div class="col-12"> Ubicación: {{facturas.sucursales.ubicacion }}</div>
        <div class="col-12"> Telefono: {{facturas.sucursales.telefono }}</div>
        <div class="col-12"> Fecha: {{facturas.fecha}}</div>
        <div class="col-12">Factura</div>        
        <div class="col-12"> Codigo: {{facturas.id}}</div>
        <div class="col-12"> NCF: {{facturas.comprobante}}</div>
        <div class="col-12"> Cliente: {{facturas.nombre}}</div>
        <div class="col-12"> Rnc: {{facturas.identificacion}}</div>
        <div class="col-12"> vendedor: {{facturas.codigoVendedor}}</div>
      <div class="col-12">
          <table class="mytable w-100">
            <thead class="">
              <tr class="border-bottom">
        
                <th>Descripcion</th>
                <th>Itbis</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody v-for="item in facturas.detalleFactura" :key="item.id">        
              <tr>
                <td colspan="2">        
                    {{item.productos?.nombre}}{{ item.servicios?.nombre }}
            
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr >
                <td>
                    {{item.cantidad}}X{{item.precio.toFixed(2)}}                
                </td>
                <td>{{item.itbis.toFixed(2)}}</td>
                <td>{{item.total.toFixed(2)}}</td>
              </tr>

            </tbody>

          </table>
          <hr> <div class="col-12 text-right">Descuento: {{facturas.descuento.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Sub Total: {{facturas.subTotal.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Itbis: {{facturas.itbis.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Total:{{facturas.total.toFixed(2)}}</div>
          <hr> <div class="col-12 text-right">Monto Pagado:{{facturas.abono.toFixed(2)}}</div>


        </div>
       </div>
    </div>
         </div>
       <!-- End Report -->
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui'
import { BasePagination,BaseCheckbox,BaseRadio } from 'src/components'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import swal from 'sweetalert2'
import axios from 'axios'
import config from '@/config'
export default {
  components: {
    Loading,
    BasePagination,
    BaseCheckbox,
    BaseRadio,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  computed: {
    queriedData() {
      return this.tableData
    },
    descuento(){
      this.bill.descuento=this.tableData.map(c=>c.descuento).reduce((a, b) => a + b, 0)
      return this.bill.descuento
    },
    itbis(){
      this.bill.itbis=this.tableData.map(c=>c.itbis).reduce((a, b) => a + b, 0)
      return  this.bill.itbis
    },
    subtotal(){
      this.bill.subTotal=this.tableData.map(c=>c.precio*c.cantidad).reduce((a, b) => a + b, 0)
      return this.bill.subTotal
    },
    total(){
      this.bill.total=this.tableData.map(c=>c.total).reduce((a, b) => a + b, 0)
      return  this.bill.total
    },
    pendiente(){
      return  this.tableData.map(c=>c.total).reduce((a, b) => a + b, 0)- this.bill.abono
    }
  },
  data() {
    return {
      impresora:'w-30',
      ver_popup_search:false,
      pagodo:false,
      ver_popup_pay:false,
      titleModal:'',
      titleModalPay:'',
      readOnly:false,
      menuOption:false,
      Vendedor:false,
      Comprobante:false,
      typePrice:'precio',
      search:'',
      tableDataProducFilter:[],
      tableDataProduc:[],
      formToAddProducts: true,
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      office: '',
      selects: {
        sucursales: [],
        clientes: [],
        codigoVendedor:'',
        tipoFactura: [
          { id: 1, nombre: 'Al Contado' },
          { id: 2, nombre: 'Credito' }
        ],
        tipoComprobante: [
          { id: 0, nombre: 'ninguno' },
          { id: 1, nombre: 'Credito Fiscal (01)' },
          { id: 2, nombre: 'Consumidor Final (02)' }
        ],
        impresoras: [
          { id: 'w-30', nombre: '58mm' },
          { id: 'w-100', nombre: 'A4' }
        ]
      },
      currentCode: {
        codigo: '',
        quanty: 1,
        tax: 0,
        descuento: 0,
        price:0,
        servicioSucursal:null,
      },
      bill: {
        clienteId:null,
        Nombre:'',
        identificacion:'',
        nota:'',
        fecha:new Date(),
        sucursalId:9,
        vendedorId:null,
        estadoFactura:1,
        turnoId:13,
        tipoFactura:1,
        comprobante:'',
        abono:0,
        descuento:0,
        itbis:0,
        total:0,
        tipoComprobante:0,
        detalleFactura:[],
      },
      pay:{
        facturaId:0,
        tipoPago:1,
        total:0,
        nota:''
      },
      facturas:{
        sucursales:{
          nombre:'',
          ubicacion:'',
          telefono:''
        },
        vendedores:{codigo:''},
        total:0,
        subTotal:0,
        descuento:0,
        abono:0,
        itbis:0,
        detalleFactura:[]
      },
      searchQuery: '',
      propsToSearch: ['codigo'],
      tableColumns: [
        {
          prop: 'codigo',
          label: 'Codigo',
          minWidth: 85
        },
        {
          prop: 'nombre',
          label: 'Nombre',
          minWidth: 130
        },

        {
          prop: 'precio',
          label: 'Precio',
          minWidth: 100
        },
        {
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
        },
        {
          prop: 'descuento',
          label: 'Descuento',
          minWidth: 110
        },
        {
          prop: 'subTotal',
          label: 'Sub Total',
          minWidth: 120
        },
        {
          prop: 'itbis',
          label: 'ITBIS',
          minWidth: 100
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        }
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    }
  },
  mounted() {
    // this.isLoading = true
    this.baseApiUrl = config.global.baseApiUrl
    this.fillCatalogs(['sucursales', 'vendedores', 'clientes'])
    axios.get(this.baseApiUrl+'Turnos/TurnoByUserOpen/'+this.$store.state.officeId)
    .then((response)=> {
      if(response.data.id!=0){
        this.bill.turnoId=response.data.id
        this.bill.sucursalId=response.data.sucursalId
      }
      else{
        this.globalSweetMessage("No tiene turno abierto", 'error')
        this.$router.push({ path: '/billDashboard/shift/create' })
      }
    })
  },
  methods: {
    changeShowForm(item) {
      this.currentCode.codigo=''
      if(item=='Producto')
      this.formToAddProducts = true
      else
      this.formToAddProducts=false
    },
    checkIn(){
      this.readOnly=true
      this.pagodo=true
      this.bill.detalleFactura=this.tableData
      this.isLoading = true
      axios
          .post(this.baseApiUrl + 'Facturas', this.bill)
          .then((response) => {
            this.pagodo=true
           this.pay.facturaId=response.data.result.id
           this.bill.facturaId=response.data.result.id
           if (this.bill.tipoFactura==2){
             this.loadBill()
           }
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))

    },
    loadBill(){
      axios
          .get(this.baseApiUrl + 'Facturas/'+this.bill.facturaId)
          .then((response) => {
           this.facturas= response.data
          })
    },
    paying(){
      this.isLoading = true
      axios
          .post(this.baseApiUrl + 'PagosFacturas', this.pay)
          .then((response) => {
            this.bill.abono=response.data.result.facturas.abono
            if(this.bill.total<=this.bill.abono)
            this.loadBill()
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
    },
    changeShowFormPay(item,tipopago) {
    this.pay.tipoPago=tipopago
     this.titleModalPay=item
     this.ver_popup_pay=true
    },
    validateQuanty(currentQuanty, storageQuanty) {
      if (currentQuanty > storageQuanty)
        return this.globalSweetMessage(
          'Cantidad exede limite en almacen',
          'error'
        )

      return true
    },
    globalValidations(obj, validQuanty = true) {
      if (this.currentCode.codigo == '')
        return this.globalSweetMessage('Favor digitar el codigo', 'error')
      if (!obj) return this.globalSweetMessage('Codigo invalido', 'warning')
      if (this.currentCode.quanty == 0 || this.currentCode.quanty == undefined)
        return this.globalSweetMessage(
          'Agregar un numero diferente a "0"',
          'error'
        )
      if (validQuanty)
        if (!this.validateQuanty(this.currentCode.quanty, obj.stock))
          return false

      // if (
      //   parseInt(obj.precio) - parseInt(this.currentCode.descuento) <
      //   parseInt(obj.precioMinimo)
      // )
      //   return this.globalSweetMessage(
      //     'Precio por debajo del valor minimo permitido',
      //     'error'
      //   )
      return true
    },
    verificarPrecio(){
      axios
        .get(
          this.baseApiUrl +
            'ServiciosSucursales/ByCodigo/'+this.currentCode.codigo
        )
        .then((response) => {
          if (!this.globalValidations(response.data)) return false
          this.currentCode.price=response.data.precio
          document.getElementById("ServicioCantidad").focus()

        })
    },
    pickProduct() {
      document.getElementById("tableProducto").scrollTo(100,100);
      axios
        .get(
          this.baseApiUrl +
            'ProductosSucursales/ByCodigo/'+this.currentCode.codigo
        )
        .then((response) => {
          if (!this.globalValidations(response.data)) return false
          this.currentCode.tax = response.data.productos.exento
            ? 0
            : response.data.productos.itbis
          let AddedProduct = this.tableData
                                 .findIndex((p)=>p.codigo == this.currentCode.codigo)
          let total = 0
          let itbis = 0
          let subTotal = 0
          let descuento=0
          let precio=response.data[this.typePrice]
          descuento=toFixedNumber(this.currentCode.descuento,2)
          itbis =
          toFixedNumber((precio *
            this.currentCode.quanty- descuento) *
            this.currentCode.tax,2)
          total =
          toFixedNumber(precio * this.currentCode.quanty +
            itbis -descuento,2)
          subTotal= toFixedNumber(precio * this.currentCode.quanty-descuento,2)
          if (AddedProduct >= 0) {
            let quanty =
            parseInt(this.tableData[AddedProduct].cantidad) +
           parseInt(this.currentCode.quanty)

            if (!this.validateQuanty(quanty, response.data.stock))
              return false

            if (quanty <= 0) {
              this.handleDelete(AddedProduct)
              return false
            }
            this.tableData[AddedProduct].precio = precio
            subTotal = toFixedNumber(this.tableData[AddedProduct].precio*quanty,2)
            itbis = toFixedNumber((subTotal-descuento)* this.currentCode.tax,2)
            this.tableData[AddedProduct].cantidad = quanty
            this.tableData[AddedProduct].itbis = itbis
            this.tableData[AddedProduct].total =
            toFixedNumber(subTotal + itbis -descuento,2)
            this.tableData[AddedProduct].descuento = descuento
            this.tableData[AddedProduct].subTotal = subTotal-descuento

          } else {
            if (this.currentCode.quanty < 0)
              return this.globalSweetMessage(
                'No puede agregar valores negativos',
                'error'
              )

            let product = {
              facturaId:0,
              codigo: response.data.codigo,
              productoId: response.data.productoId,
              servicioId:null,
              nombre: response.data.nombre,
              cantidad: this.currentCode.quanty,
              precio: precio,
              itbis: itbis,
              subTotal:subTotal-descuento,
              descuento:descuento,
              total:total,
              estadoDetalleFactura:1
            }
            this.tableData.push(product)
            AddedProduct = -1
          }

        })
        .catch((error) => {
          return this.globalSweetMessage('Error al agregar Producto', 'error')
        })
        .finally(() => {})
    },
    pickService(){
      axios
        .get(
          this.baseApiUrl +
            'ServiciosSucursales/ByCodigo/'+this.currentCode.codigo
        )
        .then((response) => {
          if (!this.globalValidations(response.data)) return false
          let AddedProduct = this.tableData
                                 .findIndex((p)=>p.codigo == this.currentCode.codigo)
          this.currentCode.tax=response.data.itbis
          let total = 0
          let itbis = 0
          let subTotal = 0
          let descuento=0
          let precio=this.currentCode.price
          descuento=this.currentCode.descuento
          itbis =
          toFixedNumber((precio *
            this.currentCode.quanty-descuento) *
            this.currentCode.tax,2)
          total =
          toFixedNumber(precio * this.currentCode.quanty +
            itbis -descuento,2)
          subTotal= toFixedNumber(precio * this.currentCode.quanty-descuento,2)
          document.getElementById("sercivioCodigo").focus()
          if (AddedProduct >= 0) {
            let quanty =
              parseInt(this.tableData[AddedProduct].cantidad) +
              parseInt(this.currentCode.quanty)
            if (quanty <= 0) {
              this.handleDelete(AddedProduct)
              return false
            }
            subTotal =toFixedNumber(this.tableData[AddedProduct].precio * quanty,2)

            itbis = subTotal * this.currentCode.tax
            this.tableData[AddedProduct].cantidad = quanty
            this.tableData[AddedProduct].itbis = itbis
            this.tableData[AddedProduct].total =
              subTotal + itbis - descuento
            this.tableData[AddedProduct].subTotal = subTotal-descuento


          } else {
            if (this.currentCode.quanty < 0)
              return this.globalSweetMessage(
                'No puede agregar valores negativos',
                'error'
              )
            let product = {
              facturaId:0,
              codigo: response.data.codigo,
              nombre: response.data.nombre,
              productoId:null,
              servicioId: response.data.servicioId,
              cantidad: this.currentCode.quanty,
              precio: precio,
              itbis: itbis,
              descuento:descuento,
              subTotal:subTotal-descuento,
              total: total,
              estadoDetalleFactura:1
            }
            this.tableData.push(product)
            AddedProduct = -1
          }
        })

    },
    handleDelete(index, row) {
      swal
        .fire({
          title: 'Desa quitar de la lista?',
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
             this.tableData.splice(index, 1)
          }
        })
    },
    fillCatalogs(catalogs) {
      catalogs.forEach((catalog) => {
        axios
          .get(this.baseApiUrl + 'catalogo/' + catalog)
          .then((response) => {
            this.selects[catalog] = response.data
          })
          .catch((error) => {
            this.globalSweetMessage('Error al cargar la pagina', 'error')
          })
      })
    },
    subgetModal(item){
      axios
          .get(this.baseApiUrl + item+'Sucursales')
          .then((response) => {
            this.tableDataProducFilter= response.data
            this.tableDataProduc=response.data
          })
      this.ver_popup_search=true
      this.titleModal=item
    }
    ,filterProduct(){
      this.tableDataProducFilter=this.tableDataProduc.filter(c => c.nombre.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
function toFixedNumber(num, digits, base){
  var pow = Math.pow(base||10, digits);
  return Math.round(num*pow) / pow;
}
</script>
<style>

.mytable{
  border-collapse: collapse;
 color: #000;
 width: 100%;
}



body{
  background: white;
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
.btn-link{
  color: white !important;
}
.table, .el-table table{
  margin-bottom: 0;
}
.table > thead > tr > th, .el-table table > tbody > tr > td{
  /* color: #fff !important; */
  font-size: 11pt !important;
}
.table > thead > tr > th, .el-table table > thead > tr > th{
  /* color: #fff !important; */
  font-size: 11pt !important;
}
.modalpay{
  position: fixed;
    float: right;
    z-index: 1;
    color: white;
    height: 325px;
    right: 0;
    border-radius: 15px;
    top:80px
}
.modalsearch{
  position: fixed;
    float: right;
    z-index: 3;
    background: white;
    height: 300px;
    right: 0;
    border-radius: 15px;
    top:80px
}
@media (min-width:768px)  {
  .modalsearch{
    left: 41px;
}
.modalpay{
    right: 15px;
}
}
.tableFixHead2{
  height: 250px !important;
  width: 100%;
}
.tableFixHead {
  overflow: auto;
  height: 185px;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;

}
.scroll::-webkit-scrollbar {
  width: 10px;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #27293d;
  outline: 1px solid rgb(15, 15, 15);
}
.scroll-white::-webkit-scrollbar-thumb {
  background-color: #565656;
  outline: 1px solid rgb(255, 255, 255) !important;
}

.text-dark input {
  color: black !important;
}
.btn-yellow{
  background: #ff8d00 !important;
}
.btn-yellow:hover{
  background: #ff8d00 !important;
}
.btn-yellow:active{
  background: #ff8d00 !important;
}
.btn-yellow:active:focus{
  background: #ff8d00 !important;
}
.btn-yellow:focus{
  background: #ff8d00 !important;
}
.btn-green{
  background: #00ab4f;
}
.btn-green:hover{
  background: #00ab4f !important;
}
.btn-green:active{
  background: #00ab4f !important;
}
.btn-green:active:focus{
  background: #00ab4f !important;
}
.btn-green:focus{
  background: #00ab4f !important;
}

.modal-Efectivo{
  background: #e52d27 !important;
}
.modal-Tarjeta{
  background: #003eb0  !important;
}
.modal-Tranferencia{
  background: #00ab4f !important;
}
.modal-Credito{
  background: #ff8d00 !important;
}
.card label{
  color: #fff;
  font-size: 1rem;
}
#inputpago{
  background: #27293d;
  color:#fff !important;
}
.btn-link{
  color:#929191 !important
}
.textprint{
  font-size: 12pt;
  color: black;
}
.w-30{
  width: 38%;
  margin-left: 0.01px;
}
.impresora>.el-input>.el-input__inner{
  height: 60px;
}
</style>
