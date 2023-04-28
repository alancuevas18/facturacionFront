<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">{{ $t('users.rols') }}</h2>
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
              <label class="col-sm-2 col-form-label">Rol</label>
              <div class="col-sm-10">
                <el-select
                  :disabled="checkedID"
                  :readonly="readOnly"
                  :key="readOnly"
                  required
                  class="select-primary"
                  size="large"
                  placeholder="Rol"
                  v-model="user.roleId"
                >
                  <el-option
                    v-for="option in rols"
                    class="select-primary"
                    :value="option.id"
                    :label="option.nombre"
                    :key="option.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                @click.native="assing()"
                :disabled="checkedID"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ $t('global.assing') }}</base-button
              >

              <router-link to="/users/index">
                <base-button type="danger" class="animation-on-hover"
                  ><i class="tim-icons icon-simple-remove"></i
                  >{{ $t('global.cancel') }}</base-button
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
import { Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('required', required)

export default {
  components: {
    Loading,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      readOnly: false,
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      rols: [],
      user: {
        roleId: '',
        userId: ''
      },
      selects: {
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.user.userId = this.$route.params.id
    this.getRols()
  },
  methods: {
    validateFields() {
      return !this.user.roleId
    },
    assing() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor seleccionar un rol!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'Usuario/Roles', this.user)
          .then((response) => {
            console.log(response)
            this.globalSweetMessage(response.data.message)
            // this.$router.push({ path: '/users/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    getRols() {
      axios
        .get(this.baseApiUrl + 'Usuario/GetRoles')
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.rols.push(response.data[i])
          }
        })
        .catch((error) => {
          //   this.globalSweetMessage('Error al cargar la pagina!', 'error')
        })
        .finally(() => (this.isLoading = false))
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
