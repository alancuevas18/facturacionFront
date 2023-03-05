<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('brands.index') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }}
          <router-link to="/brands/index">
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
              <label class="col-sm-2 col-form-label">Descripcion*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="descripcion"
                  rules="required|min:3"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="brand.description"
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
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="!id ? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/brands/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >Cancel</base-button
                >
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
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      title: '',
      selects: {
        simple: '',
        options: [
          { value: 'active', label: 'Activar' },
          { value: 'inactive', label: 'Inactivar' }
        ]
      },
      brand: [
        {
          description: ''
        }
      ]
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id = '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    if (this.id) {
      this.fillForm()
    }
  },
  methods: {
    validateFields() {
      return !this.brand.description
    },
    fillForm() {
      this.isLoading = true
      axios
        .get(this.baseApiUrl + 'marcas/' + this.id)
        .then((response) => {
          this.brand = {
            description: response.data.descripcion
          }
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    clear() {
      this.brand.description = ''
    },
    edit() {
      let brand = {
        description: response.data.descripcion
      }
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(this.baseApiUrl + 'marcas/' + this.id, brand)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/brands/index' })
          })
          .catch((error) => {
            this.globalSweetMessage('Error al ejecutar accion', 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    create() {
      let brand = {
        description: this.brand.description
      }
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'marcas', brand)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/brands/index' })
          })
          .catch((error) => {
            this.globalSweetMessage('Error al ejecutar accion', 'error')
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
</style>
