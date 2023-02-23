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
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <base-input placeholder="Name"> </base-input>
            </div>
          </div>
          <div class="row">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <base-input placeholder="Email"> </base-input>
            </div>
          </div>
          <div class="row">
            <label class="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-10">
              <base-input placeholder="Phone"> </base-input>
            </div>
          </div>
          <div class="row">
            <label class="col-sm-2 col-form-label">BirthDay</label>
            <div class="col-sm-10">
                <base-input>
                    <el-date-picker
                    type="date"
                    placeholder="BirthDay"
                    v-model="dateTimePicker"
                    >
                    </el-date-picker>
                </base-input>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
              <base-button type="success" class="animation-on-hover"
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
import {  DatePicker } from 'element-ui';
export default {
  components: {
    BaseCheckbox,
    BaseRadio,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      radios: {
        radio1: '1',
        radio2: '2',
        radio3: '2',
        radioOn: '2',
        radioOff: '2'
      },
      checkboxes: {
        first: false,
        second: false,
        a: false,
        b: false,
        c: false,
        unchecked: false,
        checked: true,
        disabledUnchecked: false,
        disabledChecked: true
      }
    };
  }
};
</script>
<style>
  .floatr{
    float:right;
  }
</style>
