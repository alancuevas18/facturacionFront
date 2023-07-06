<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <form  class="formSend">
      <div class="col-12">
        <div class="row">
              <label class="col-sm-2 col-form-label">Codigo Factura</label>
              <div class="col-sm-10">

                <label class="col-form-label"> {{ facturaId}}</label>              
              
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Cliente</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="cliente"
                  rules=""
                  v-slot="{errors }"
                >
                <input
                 type="text" 
                 v-model="send.cliente"
                 required
                 class="form-control"/>
                 <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 
                </ValidationProvider>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Numero Contacto</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Numero Contacto"
                  rules=""
                  v-slot="{ errors }"
                >
                <input
                 type="text" 
                 v-model="send.numeroContacto"
                 required
                 class="form-control"/>
                 <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Direccion</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="Direccion"
                  rules=""
                  v-slot="{errors }"
                >
                <input
                 type="text" 
                 v-model="send.direccion"
                 required
                 class="form-control"/>
                 <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
                <label class="col-sm-2 col-form-label">Fecha</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="fechaEnvio"
                    v-slot="{ errors }"
                  >
           
                  <input
                 type="date" 
                 v-model="send.fechaEnvio"
                 placeholder="Fecha"
                 required
                 class="form-control"/>
                 <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 
                  
                  </ValidationProvider>
                </div>
              </div>
 
              <div class="row">
              <label class="col-sm-2 col-form-label mt-2">Sucursal</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Sucursal"
                  v-model="send.sucursalId"
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

            <div class="row">
              <label class="col-sm-2 col-form-label mt-2">Mensajero</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Mensajero"
                  v-model="send.mensajeroId"
                >
                  <el-option
                    v-for="option in selects.mensajeros"
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
              <label class="col-sm-2 col-form-label mt-2">Estado Envio</label>
              <div class="col-sm-10">
                <el-select
                  required
                  filterable
                  class="select-primary w-100"
                  size="large"
                  placeholder="Estado Envio"
                  v-model="send.estadoEnvios"
                >
                  <el-option
                    v-for="option in selects.estadoEnvios"
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
              <label class="col-sm-2 col-form-label mt-2">Nota</label>
              <div class="col-sm-10">
                <textarea class="form-control" v-model="send.nota"></textarea>
              </div>
            </div>
            <div class="row ">
              <div class="col-md-6">
                  <base-button type="danger" class="animation-on-hover w-100"
                  @click="$emit('close')">
                  <i class="tim-icons icon-simple-remove"></i
                    >{{ $t('global.cancel') }}</base-button
                    >                
              </div>    
                <div class="col-md-6">
                  <base-button
                    type="success"
                    native-type="submit"
                    class="animation-on-hover w-100"
                    @click.native="create()"
                    ><i class="tim-icons icon-check-2 mr-2"></i
                    >Crear</base-button
                  >

                </div>    
                
            </div>
      </div>
    </form>
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio } from 'src/components/index'
import {  DatePicker,Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, email, min, numeric } from 'vee-validate/dist/rules'
import axios from 'axios'
import config from '@/config'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
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
  props: {
    facturaId:null
  },
  emits:['close','reload'],
  data() {
    return {
      validInvoice: false,
      readOnly: false,
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      title: '',
      fixedCode: '',
      selects: {
        sucursales: [],
        mensajeros:[],
        estadoEnvios:[]
      },
      send: {
        id: 0,
        cliente: null,
        numeroContacto: null,
        direccion: null,
        fechaEnvio: new Date().toDateString(),
        fechaEntrega: null,
        nota: '',
        sucursalId: null,
        sucursales: null,
        facturaId: null,
        facturas: null,
        mensajeroId: null,
        mensajeros: null,
        estadoEnvios: 2
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    console.log(this.facturaId)
    var todayDate = new Date().toISOString().slice(0, 10);
    this.send.fechaEnvio=todayDate
    console.log(todayDate)
    this.fillCatalogs([
      'mensajeros',
      'sucursales',
      'estadoEnvios'
    ])
},
methods: {
   async checkId() {
  await axios
        .get(this.baseApiUrl + 'envios/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      return (
        !this.send.sucursalId ||
        !this.send.mensajeroId ||
        !this.send.estadoEnvios ||
        !this.send.fechaEnvio ||
        !this.send.direccion ||
        !this.send.cliente ||
        !this.send.numeroContacto
      )
    },
    fillForm(obj) {
      this.send = {
        id: obj.id,
        cliente: obj.cliente,
        numeroContacto: obj.numeroContacto,
        direccion: obj.direccion,
        fechaEnvio: obj.fechaEnvio,
        fechaEntrega: obj.fechaEntrega,
        nota: obj.nota,
        sucursalId: obj.sucursalId,
        facturaId: obj.facturaId,
        mensajeroId: obj.mensajeroId,
        estadoEnvios: obj.estadoEnvios
      }
    },
    clear() {
      this.send.sucursalId = ''
      this.send.mensajeroId = ''
      this.send.estadoEnvios = ''
      this.send.fechaEnvio = ''
      this.send.direccion = ''
      this.send.cliente = ''
      this.send.numeroContacto = ''
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } 
      // else if (!this.validInvoice) {
      //   this.globalSweetMessage('Favor insertar factura valida!', 'error')
      // } 
      else {
        this.isLoading = true
        this.send.facturaId=this.facturaId
        axios
          .post(this.baseApiUrl + 'Envios', this.send)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.$emit('close')
            this.clear()
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    fillCatalogs(catalogs) {
    this.isLoading=true;
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
      axios
        .get(this.baseApiUrl + 'facturas/' + this.facturaId)
        .then((response) => {
          this.send.cliente=response.data.nombre
          this.send.direccion=response.data.direccion
          this.send.numeroContacto=response.data.numero     
        })
        .finally(() => (this.isLoading = false))


    },

  }
}
</script>
<style scoped>
input{
    color: black !important;
}
.formSend{
    color: black !important;

}
.formSend>input{
    color: black !important;
}
.form-control, .el-date-picker .el-input .el-input__inner, .form-group .el-input__inner{
color: black !important;

}
.form-control[readonly]{
  background-color:#d1d1d1;
}
.row{
  padding: 0;
  margin: 0;
}
</style>