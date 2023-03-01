<template>
    <div class="col-md-12">
        <h2 class="text-center">{{$t('clients.index')}}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
            {{$t('clients.create')}}
            <router-link to="/clients/index">
                <button class="btn floatr btn-icon btn-youtube">
                    <i class="tim-icons icon-double-left"></i>
                </button>
            </router-link>
        </h4>
      </template>
      <div>
        <form method="get" action="/" class="form-horizontal">
        <div class="row">
            <label class="col-sm-2 col-form-label">Code</label>
            <div class="col-sm-10">
                <base-input placeholder="Code" v-model="client.code"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <base-input placeholder="Name" v-model="client.name"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">LastName</label>
            <div class="col-sm-10">
                <base-input placeholder="LastName" v-model="client.lastName"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">NationalID</label>
            <div class="col-sm-10">
                <base-input placeholder="NationalID" v-model="client.nationalID"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <base-input placeholder="Email" v-model="client.email"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Address</label>
            <div class="col-sm-10">
                <base-input placeholder="Address" v-model="client.address"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">CellPhone</label>
            <div class="col-sm-10">
                <base-input placeholder="CellPhone" v-model="client.cellPhone"> </base-input>
            </div>
        </div>
        <div class="row">
            <label class="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-10">
                <base-input placeholder="Phone" v-model="client.phone"> </base-input>
            </div>
        </div>
        <div class="row">
        <label class="col-sm-2 col-form-label">Status</label>
            <div class="col-sm-10">
                <el-select
                    class="select-primary"
                    size="large"
                    placeholder="Single Select"
                    v-model="client.status"
                    >
                    <el-option
                        v-for="option in selects.countries"
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
            <base-button type="success" class="animation-on-hover" @click.native="create()"
            ><i class="tim-icons icon-check-2 mr-2"></i>Create</base-button>

            <router-link to="/clients/index">
                <base-button type="danger" class="animation-on-hover"
                ><i class="tim-icons icon-simple-remove"></i>Cancel</base-button>
                </router-link>  
        </div>
        </form>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { BaseCheckbox, BaseRadio } from 'src/components/index';
import {  DatePicker, Select, Option } from 'element-ui';
import { create } from 'domain';
import axios from "axios";
import config from '@/config';

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
        baseApiUrl : '',
        selects: {
        simple: '',
        countries: [
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
  },
  methods: {
    create(){
        let client = {
            code : this.client.code,
            name : this.client.name,
            lastName : this.client.lastName,
            nationalID : this.client.nationalID,
            email : this.client.email,
            address : this.client.address,
            cellPhone : this.client.cellPhone,
            phone : this.client.phone,
            status : this.client.status,
        };
    axios.post(this.baseApiUrl+"clientes", client).then((result) => {
    console.log(result);
     });
    }
  }
};
</script>
<style>
  .floatr{
    float:right;
  }
</style>
