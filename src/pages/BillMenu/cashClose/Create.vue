<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('cashClose.cashClose') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/billDashboard/cashClose/index">
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
              <label class="col-sm-2 col-form-label">Total Efectivo*</label>
              <div class="col-sm-10">
                <!-- <ValidationProvider
                  name="totalEfectivo"
                  :rules="{required:true,valorMin:cashClose.totalVendidoEfectivo}"
                 :custom-messages="{required: 'El valor debe ser mayor a '+cashClose.totalVendidoEfectivo}"
                  v-slot="{ passed, failed, errors }"
                > -->
                <ValidationProvider
                  name="totalEfectivo"
                  :rules="{required:true,valorMin:cashClose.totalVendidoEfectivo}"
                  v-slot="{ passed, failed, errors }"
                > 
                  <base-input
                    required
                    v-model="cashClose.totalEfectivo"
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
              <label class="col-sm-2 col-form-label"
                >Total Transferencia*</label
              >
              <div class="col-sm-10">
                <ValidationProvider
                  name="totalTransferencia"
                  :rules="{required:true,valorMin:cashClose.totalVendidoTransferencia}"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="cashClose.totalTransferencia"
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
              <label class="col-sm-2 col-form-label">Total Tarjeta*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="totalTarjeta"
                  :rules="{required:true,valorMin:cashClose.totalVendidoTarjeta}"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="cashClose.totalTarjeta"
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
              <label class="col-sm-2 col-form-label">Total  Nota Credito*</label>
              <div class="col-sm-10">
                <ValidationProvider
                  name="totalNotaCredito"
                  :rules="{required:true,valorMin:cashClose.totalVendidoNotaCredito}"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    v-model="cashClose.totalNotaCredito"
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

              <router-link to="/billDashboard/cashClose/index">
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
extend('valorMin', {
  validate(value, args) {
    return value >= args[0] 
  },
  message: 'El valor no coincide con lo facturado'
});

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
        
      },
      cashClose: {
        id: 0,
        totalVendidoEfectivo: 0,
        totalVendidoTarjeta: 0,
        totalVendidoTransferencia: 0,
        totalVendidoNotaCredito: 0,
        totalEfectivo: 0,
        totalTarjeta: 0,
        totalTransferencia: 0,
        totalNotaCredito: 0,
        sucursalId: '',
        fecha: new Date(),
        turnoId: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Crear' : 'Editar'
    if (this.id) this.checkId()
    else this.load()
    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.cashClose.nationalID
  },
  methods: {
    checkId() {
      axios
        .get(this.baseApiUrl + 'turnos/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    load() {
      axios
        .get(this.baseApiUrl + 'CuadreSucursal/BySucursalAndUser/'+this.$store.state.officeId)
        .then((response) => {
          this.isLoading = true

          if(response.data.turnoId==null){
            this.globalSweetMessage("No tiene turno abierto", 'error')
            this.$router.push({ path: '/billDashboard/cashClose/index' })
           }
          this.fillForm(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    validateFields() {
      return (
        !(this.cashClose.totalEfectivo>=this.cashClose.totalVendidoEfectivo)||
        !(this.cashClose.totalTarjeta>=this.cashClose.totalVendidoTarjeta)||
        !(this.cashClose.totalTransferencia>=this.cashClose.totalVendidoTransferencia)||
        !(this.cashClose.totalNotaCredito>=this.cashClose.totalVendidoNotaCredito)
      )
    },
    fillForm(obj) {
      this.cashClose = {
        id: obj.id,
        totalVendidoEfectivo: obj.totalVendidoEfectivo,
        totalVendidoTarjeta: obj.totalVendidoTarjeta,
        totalVendidoTransferencia: obj.totalVendidoTransferencia,
        totalVendidoNotaCredito: obj.totalVendidoNotaCredito,
        totalEfectivo: obj.totalEfectivo,
        totalTarjeta: obj.totalTarjeta,
        totalTransferencia: obj.totalTransferencia,
        totalNotaCredito: obj.totalNotaCredito,
        sucursalId: obj.sucursalId,
        fecha: new Date(),
        turnoId: obj.turnoId
      }
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    clear() {
      this.cashClose.totalVendidoEfectivo = ''
      this.cashClose.totalVendidoTarjeta = ''
      this.cashClose.totalVendidoTransferencia = ''
      this.cashClose.sucursalId = ''
      this.cashClose.turnoId = ''
    },
    edit() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .put(
            this.baseApiUrl + 'cuadresucursal/' + this.cashClose.id,
            this.cashClose
          )
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/cashClose/index' })
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
          .post(this.baseApiUrl + 'cuadresucursal', this.cashClose)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/billDashboard/cashClose/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },

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
