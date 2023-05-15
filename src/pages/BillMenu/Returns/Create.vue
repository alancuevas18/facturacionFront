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
          {{ title }}
          <router-link to="/billDashboard/bill/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
    <div class="row">
      <div class="col-md-6 col-ms-12 border-right">
        <h2>Factura</h2>
        <table class="table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Produto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Itbis</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in facturas.detalleFactura" :key="item.id" :index="index">
                <td>{{item.codigo }}</td>
                <td>{{item.productoServicio}}</td>
                <td>{{item.cantidad }}</td>
                <td>{{item.precio }}</td>
                <td>{{item.itbis }}</td>
                <td>{{item.total }}</td>
                <td><a @click="devolver(item,index)"><i class="fa-solid fa-arrow-right"></i></a></td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="col-md-6 col-ms-12 border-left">
        <h2>Devolucion</h2>
              <div class="row">
                <label class="col-sm-2 col-form-label">Motivo</label>
                <div class="col-sm-10">   
                  <el-select
                    required
                    filterable
                    class="select-primary w-100"
                    size="large"
                    placeholder="Motivo"  
                    v-model="devoluciones.motivoDevolucion"
                  >
                    <el-option
                      v-for="option in selects.motivoDevolucion"
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
                <label class="col-sm-2 col-form-label">Fecha</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="fecha"
                    v-slot="{ passed, failed, errors }"
                  >
                    <base-input>
                      <el-date-picker
                        type="date"
                        placeholder="Fecha"
                        v-model="devoluciones.fecha"
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
                <label class="col-sm-2 col-form-label">Nota</label>
                <div class="col-sm-10">
                   <base-input
                    required
                    v-model="devoluciones.Nota"
                    type="text"
                    placeholder="Nota"
                  >
                  </base-input>
                </div>
              </div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Codigo</th>
              <th>Produto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Itbis</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in devoluciones.detalleDevoluciones" :key="index" :index="index">
              <td><a @click="Cancelar(item)"><i class="fa-solid fa-arrow-left"></i></a></td>
              <td>{{item.codigo }}</td>
              <td>{{item.nombre }}</td>
              <td>{{item.cantidad }}</td>
              <td>{{item.precio }}</td>
              <td>{{item.itbis }}</td>
              <td>{{item.total }}</td>
            </tr>
          </tbody>
        </table>
        <div class="row" v-if="devoluciones.detalleDevoluciones.length>0">
          <div class="col-md-6 col-ms-12">
          <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover w-100"
                @click.native="create()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >
            </div>
            <div class="col-md-6 col-ms-12">
              <router-link to="/billDashboard/bill/index">
                <base-button type="danger" class="animation-on-hover w-100"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio } from 'src/components/index'
import { DatePicker, Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

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
    [Option.name]: Option
  },
  data() {
    return {
      readOnly: false,
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      selects: {
        simple: '',
        shiftStatus: [],
        motivoDevolucion: [],
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      facturas:{
      },
      devoluciones:{
        fecha:new Date(),
        nota:'',
        facturaId:'',
        sucursalId:9,
        motivoDevolucion:'',
        detalleDevoluciones:[]
      },
      shift: {
        codigo: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = 'Crear'
    this.fillCatalogs(['motivoDevolucion'])
    if (this.id) this.checkId()
  },
  methods: {
    checkId() {
      axios.get(this.baseApiUrl + 'Facturas/' + this.id).then((response) => {
        this.facturas = response.data
        this.devoluciones.facturaId = this.facturas.id
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
    devolver(item, index) {
      let detalleDevoluciones = {
        id: 0,
        detalleFacturaId: item.id,
        productoId: item.productoId,
        servicioId: item.servicioId,
        nombre: item.productoServicio,
        cantidad: item.cantidad,
        precio: item.precio,
        itbis: item.itbis,
        total: item.total,
        codigo: item.codigo,
        devolucionId: 0,
        estadoDetalleDevoluciones: 1
      }
      this.facturas.detalleFactura.splice(index, 1)
      this.devoluciones.detalleDevoluciones.push(detalleDevoluciones)
    },
    Cancelar(item, index) {
      let detalleFactura = {
        id: item.detalleFacturaId,
        productoId: item.productoId,
        servicioId: item.servicioId,
        productoServicio: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        itbis: item.itbis,
        total: item.total,
        codigo: item.codigo
      }
      this.devoluciones.detalleDevoluciones.splice(index, 1)
      this.facturas.detalleFactura.push(detalleFactura)
    },
    validateFields() {
      return (
        !this.devoluciones.fecha || !this.devoluciones.motivoDevolucion 
      )
    },
    fillForm(obj) {
      this.shift = {
        estadoVendedores: obj.estadoVendedores,
        personaId: obj.personaId,
        codigo: obj.codigo,
        nombre: obj.nombre,
        apellido: obj.apellido,
        identificacion: this.shift.identificacion
          ? this.shift.identificacion
          : obj.identificacion,
        correo: obj.correo,
        direccion: obj.direccion,
        celular: obj.celular,
        telefono: obj.telefono,
        estadoPersona: true,
        id: obj.id
      }
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.shift.codigo = ''
      this.shift.nombre = ''
      this.shift.apellido = ''
      this.shift.identificacion = ''
      this.shift.correo = ''
      this.shift.direccion = ''
      this.shift.celular = ''
      this.shift.telefono = ''
      this.shift.estadoVendedores = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'Vendedores/' + this.shift.id, this.shift)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/shift/index' })
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
          .post(this.baseApiUrl + 'Devoluciones', this.devoluciones)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/returns/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
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
