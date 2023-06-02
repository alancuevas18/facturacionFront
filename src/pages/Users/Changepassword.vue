<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('users.changepassword') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          <router-link to="/users/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form-horizontal" @submit.prevent="handleSubmit()">
            <div class="row">
              <label class="col-sm-2 col-form-label">Nueva Contraseña*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="nuevaclave"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    type="password"
                    required
                    autofocus
                    v-model="user.nuevaclave"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Confirmar Contraseña*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="password"
                  rules="required|min:3|password:@nuevaclave"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    type="password"
                    required
                    autofocus
                    v-model="passwordconfirm"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <router-link to="/users/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>

              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="assing()"
                :disabled="checkedID"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ $t('global.assing') }}</base-button
              >
         
         
            </div>
          </form>
        </ValidationObserver>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import { extend } from 'vee-validate'
import { required,min } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('required', required)
extend('min', min)
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});


export default {
  components: {
    Loading,
  },
  data() {
    return {
      readOnly: false,
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      passwordconfirm:'',
      user: {
        nuevaclave: '',
        userId: ''
      },
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.user.userId = this.$route.params.id
  },
  methods: {
    validateFields() {
      return this.user.nuevaclave!=this.passwordconfirm
    },
    assing() {
      if (this.validateFields()) {
        this.globalSweetMessage('La contraseñas no coinciden!', 'error')
      } else {
        this.isLoading = true
        console.log(this.user)
        axios
          .post(this.baseApiUrl + 'Usuario/ResetPassword', this.user)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.$router.push({ path: '/users/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
  },
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
