<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <form  class="formclient">
          <div class="col-12">
            <div class="row">
              <label class="col-sm-2 col-form-label">Celular*</label>
              <div class="col-sm-10">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control "
                    placeholder="Escriba la celular y presione 'Enter'"
                    autofocus
                    v-model="client.celular"
                    @keydown.enter.prevent="checkCelular()"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary m-0"
                      type="button"
                      @click="checkCelular()"
                    >
                      Verificar
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="row">
            <div class="col-md-6 col-ms-12  row">
              <label class="col-sm-3 col-form-label">Nombre*</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="Nombre"
                  rules="required|min:3"
                  v-slot="{ errors }"
                >
                <input
                 type="text" 
                 v-model="client.nombre"
                 required
                :readonly="readOnly"
                :key="readOnly"
                :disabled="checkedID"
                 class="form-control"/>                
                <label v-if="errors" class="text-danger">{{ errors[0] }}</label>   
                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6 col-ms-12  row">
              <label class="col-sm-3 col-form-label">Apellido*</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="Apellido"
                  rules="required|min:3"
                  v-slot="{ errors }"
                >
                <input
                 type="text" 
                 v-model="client.apellido"
                 required
                :readonly="readOnly"
                :key="readOnly"
                :disabled="checkedID"
                 class="form-control"/>                
                <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 
                </ValidationProvider>
              </div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-form-label">Identificación</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="identificacion"
                  rules="min:3"
                  v-slot="{errors }"
                >
                <input
                 type="text" 
                 name="identificacion"
                 v-model="client.identificacion"
                 required
                :readonly="readOnly"
                :key="readOnly"
                :disabled="checkedID"
                 class="form-control"/>                
                <label class="text-danger"  v-if="errors">{{ errors[0] }}</label>                
                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-form-label">Correo*</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="Correo"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.correo"               
                    class="form-control"
                  >
                <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
            </div>
            </div>
          <div class="row">
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-form-label">Direccion*</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="Direccion"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.direccion"
                    class="form-control"
                  >
                  <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-form-label">Telefono</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="Telefono"
                  rules="numeric"
                  v-slot="{ errors }"
                >
                  <input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.telefono"
                    class="form-control"
                  >
                  <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
            </div>
          </div>
            <div class="row">
              <div class="col-md-6 col-ms-12 row">
                <label class="col-sm-3 col-md-12 col-form-label">Nombre Empresa</label>
                <div class="col-md-12 col-ms-9">
                  <ValidationProvider
                    name="empresa"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <input
                      required
                      :disabled="checkedID"
                      :readonly="readOnly"
                      :key="readOnly"
                      v-model="client.empresa"
                      class="form-control"
                    >
                    <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-6 col-ms-12 row">
                <label class="col-sm-3 col-form-label">Rnc</label>
                <div class="col-md-12 col-ms-9">
                  <ValidationProvider
                    name="empresaRnc"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <input
                      required
                      :disabled="checkedID"
                      :readonly="readOnly"
                      :key="readOnly"
                      v-model="client.empresaRnc"
                      class="form-control"
                    >
                    <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                  </ValidationProvider>
                </div>
              </div>
            </div>

            <div class="row">
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-md-12 col-form-label">Telefono empresa</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="empresaTelefono"
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresaTelefono"
                    class="form-control"
                  >
                  <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6 col-ms-12 row">
              <label class="col-sm-3 col-md-12 col-form-label">Direccion empresa</label>
              <div class="col-md-12 col-ms-9">
                <ValidationProvider
                  name="empresaDireccion"
                  rules=""
                  v-slot="{ errors }"
                >
                  <input
                    required
                    :disabled="checkedID"
                    :readonly="readOnly"
                    :key="readOnly"
                    v-model="client.empresaDireccion"
                    class="form-control"
                  >
                  <label v-if="errors" class="text-danger">{{ errors[0] }}</label> 

                </ValidationProvider>
              </div>
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
                    :disabled="checkedID"
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
import {  Select, Option } from 'element-ui'
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
    [Select.name]: Select,
    [Option.name]: Option
  },
  emits:['close','reload'],
  data() {
    return {
      readOnly: true,
      checkedID: false,
      isLoading: false,
      fullPage: false,
      baseApiUrl: '',
      selects: {
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      client: {
        codigo: '',
        nombre: '',
        apellido: '',
        identificacion: '',
        correo: 'theglamouronline@gmail.com',
        direccion: '',
        celular: '',
        telefono: '',
        estadoClientes: true,
        personaId: 0,
        id: 0,
        estadoPersona: true,
        empresa: '',
        empresaTelefono: '',
        empresaDireccion: '',
        empresaRnc: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
},
  methods: {
    checkCelular() {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'clientes/byCelular/' + this.client.celular)
        .then((response) => {
          if (response.data.id > 0) {
            this.globalSweetMessage('Cliente existe!', 'warning')
          } else {
            let celular = this.client.celular
            if(response.data.celular!=null)
            this.client = this.globalFillObject(response.data)
            this.client.celular = celular
          }
        })
        .catch((error) => {
          this.globalSweetMessage('Error al consultar celular', 'error')
        })
        .finally(() => (this.isLoading = false))
      this.checkedID = false
      this.readOnly = false
    },
    validateFields() {
      return (
        !this.client.nombre ||
        !this.client.apellido ||
        !this.client.direccion ||
        !this.client.celular
      )
    },

     async create() {
   
        if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true   
        console.log(await  this.globalPost('clientes', this.client))
        this.client = this.globalClear(this.client) 
        this.$emit('close')
        this.$emit('reload')        
      }
    }
  }
}
</script>
<style scoped>
input{
    color: black !important;
}
.formclient{
    color: black !important;

}
.formclient>input{
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