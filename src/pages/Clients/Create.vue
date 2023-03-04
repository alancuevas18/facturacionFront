<template>
    <div class="col-md-12">
        <h2 class="text-center">{{$t('clients.index')}}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
            {{ title }}
            <router-link to="/clients/index">
                <button class="btn floatr btn-icon btn-youtube">
                    <i class="tim-icons icon-double-left"></i>
                </button>
            </router-link>
        </h4>
      </template>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form-horizontal"  @submit.prevent="handleSubmit()">
        <div class="row">
            <label class="col-sm-2 col-form-label">Codigo*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="codigo"
                    rules="required"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.code"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Nombre*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Nombre"
                    rules="required|min:3"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.name"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Apellido*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Apellido"
                    rules="required|min:3"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.lastName"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Identificacion*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Identificacion"
                    rules="required|min:3"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.nationalID"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Correo*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Correo"
                    rules="required|email"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.email"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Direccion*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Direccion"
                    rules="required"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.address"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Celular*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Celular"
                    rules="required|numeric"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.cellPhone"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Telefono*</label>
            <div class="col-sm-10">
                <ValidationProvider
                    name="Telefono"
                    rules="required|numeric"
                    v-slot="{ passed, failed, errors }"
                >
                <base-input
                    required
                    v-model="client.phone"
                    :error="errors[0]"
                    :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
                </base-input>
            </ValidationProvider>
            </div>
        </div>
        <div class="row">
        <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-10">
                <el-select
                    required
                    class="select-primary"
                    size="large"
                    placeholder="Status"
                    v-model="client.status"
                    >
                    <el-option
                        v-for="option in selects.options"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <base-button type="success" native-type="submit" class="animation-on-hover" @click.native="!id ? create() : edit()"
            ><i class="tim-icons icon-check-2 mr-2"></i>{{title}}</base-button>

            <router-link to="/clients/index">
                <base-button type="danger" class="animation-on-hover"
                ><i class="tim-icons icon-simple-remove"></i>Cancel</base-button>
                </router-link>  
        </div>
        </form>
    </ValidationObserver>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio } from 'src/components/index';
import {  DatePicker, Select, Option } from 'element-ui';
import { extend } from "vee-validate";
import { required, email, min, numeric} from "vee-validate/dist/rules";
import axios from "axios";
import config from '@/config';
import swal from 'sweetalert2';

extend("email", email);
extend("required", required);
extend("min", min);
extend("numeric", numeric);

export default {
  components: {
    BaseCheckbox,
    BaseRadio,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
        id: '',
        baseApiUrl : '',
        title : '',
        selects: {
        simple: '',
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]
      },
      client : [
        {
            code : '',
            name : '',
            lastName : '',
            nationalID : '',
            email : '',
            address : '',
            cellPhone : '',
            phone : '',
            status : '',
        }
      ]
    };
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl;
    this.id = this.$route.params.id = '' ? '' : this.$route.params.id;
    this.title = !this.id ? 'Cear' : 'Editar';
    if(this.id){
        this.fillForm()
    }
  },
  methods: {
    fillForm(){
        axios
      .get(this.baseApiUrl+'clientes/'+ this.id)
      .then(response => {
        this.client = {
            code : response.data.personas.codigo,
            name : response.data.personas.nombre,
            lastName : response.data.personas.apellido,
            nationalID : response.data.personas.identificacion,
            email : response.data.personas.correo,
            address : response.data.personas.direccion,
            cellPhone : response.data.personas.celular,
            phone : response.data.personas.telefono,
            status : response.data.estadoClientes ? 'active' : 'inactive',
        };
      })
      .catch(error => {
        this.error = error
      })
      .finally(() => this.loading = false);
    },
    clear(){
      this.client.code = ''; 
      this.client.name = ''; 
      this.client.lastName = ''; 
      this.client.nationalID = ''; 
      this.client.email = ''; 
      this.client.address = ''; 
      this.client.cellPhone = ''; 
      this.client.phone = ''; 
      this.client.statu = ''; 
    },
    edit(){
        if(!this.client.code
        || !this.client.name
        || !this.client.lastName
        || !this.client.nationalID
        || !this.client.email
        || !this.client.address
        || !this.client.cellPhone
        || !this.client.phone
        || !this.client.status
        ){
            swal.fire({
          title: `Favor llenar todos los campos!`,
          icon : 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
        }else{
    axios.put(this.baseApiUrl+"clientes/"+this.id, this.client).then((response) => {
        swal.fire({
          title: response.data.message,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
         this.clear();
        console.log(this.client)
        this.$router.push({ path: '/clients/index' })
     }).catch(error => {
        console.log(error)
        swal.fire({
          title: 'Error al ejecutar accion',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
      });
        }
    },
    create(){
        let client = {
            estadoClientes: true,
            id: 0,
            personaId: 0,
            personas:{
            codigo : this.client.code,
            nombre : this.client.name,
            apellido : this.client.lastName,
            identificacion : this.client.nationalID,
            correo : this.client.email,
            direccion : this.client.address,
            celular : this.client.cellPhone,
            telefono : this.client.phone,
            estadoPersona : this.client.status == 'Active' ? true : false,
            id:0
        }
        };
        if(!this.client.code
        || !this.client.name
        || !this.client.lastName
        || !this.client.nationalID
        || !this.client.email
        || !this.client.address
        || !this.client.cellPhone
        || !this.client.phone
        || !this.client.status
        ){
            swal.fire({
          title: `Favor llenar todos los campos!`,
          icon : 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
        }else{
    axios.post(this.baseApiUrl+"clientes", client).then((response) => {
        this.clear();
        swal.fire({
          title: response.data.message,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
        this.$router.push({ path: '/clients/index' })
     }).catch(error => {
        console.log(error)
        swal.fire({
          title: 'Error al ejecutar accion',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
      });
        }
    }
  }
};
</script>
<style>
  .floatr{
    float:right;
  }
</style>
