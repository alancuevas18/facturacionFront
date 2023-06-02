<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('products.type') }}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }}
          <router-link to="/productstype/index">
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
                    autofocus
                    v-model="producttype.descripcion"
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
             <router-link to="/productstype/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
                >
              </router-link>

              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="!id ? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
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
import { required, min } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

extend('required', required)
extend('min', min)

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      id: '',
      title: '',
      producttype: {
        id: 0,
        descripcion: ''
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id = '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id)
      this.globalFind('tipoproductos', this.id, this.producttype).then(
        (response) => {
          Object.keys(this.producttype).forEach((e) => {
            this.producttype[e] = response[e]
          })
        }
      )
  },
  methods: {
    validateFields() {
      return !this.producttype.descripcion
    },
    edit() {
      if (this.validateFields())
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      else {
        this.globalEdit(
          'tipoproductos',
          this.id,
          this.producttype,
          '/productstype/index'
        )
        this.producttype = this.globalClear(this.producttype)
      }
    },
    create() {
      if (this.validateFields())
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      else {
        this.globalPost(
          'tipoproductos',
          this.producttype,
          '/productstype/index'
        )
        this.producttype = this.globalClear(this.producttype)
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
