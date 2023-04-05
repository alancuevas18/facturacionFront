<template>
  <div class="col-md-12">
    <!-- <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    /> -->
    <card>
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-3">
            <label class="col-form-label">Sucursal</label>
            <el-select
              required
              filterable
              class="select-primary"
              size="large"
              placeholder="Sucursal"
              v-model="bill.sucursalId"
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
          <div class="col-sm-3">
            <label class="col-form-label">Cliente</label>
            <el-select
              required
              filterable
              class="select-primary"
              size="large"
              placeholder="Cliente"
              v-model="bill.clienteId"
            >
              <el-option
                v-for="option in selects.clientes"
                class="select-primary"
                :value="option.id"
                :label="option.nombre"
                :key="option.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-3">
            <label class="col-form-label">Vendedor</label>
            <el-select
              required
              filterable
              class="select-primary"
              size="large"
              placeholder="Vendedor"
              v-model="bill.vendedorId"
            >
              <el-option
                v-for="option in selects.vendedores"
                class="select-primary"
                :value="option.id"
                :label="option.nombre"
                :key="option.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-3">
            <label class="col-form-label">Estado</label>
            <el-select
              required
              filterable
              class="select-primary"
              size="large"
              placeholder="Estado"
              v-model="bill.status"
            >
              <el-option
                v-for="option in selects.estadoFactura"
                class="select-primary"
                :value="option.id"
                :label="option.nombre"
                :key="option.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </card>

    <card>
      <div>
        <div class="container">
          <form class="row align-items-center">
            <label class="col-form-label">Producto</label>
            <base-input
              class="mb-0"
              size="md"
              placeholder="Producto"
              required
              v-model="currentCode.codigo"
            >
            </base-input>
            <base-button
              type="success"
              class="animation-on-hover"
              size="sm"
              @click.native="pickProduct()"
              >+</base-button
            >
            <base-button
              type="primary"
              class="animation-on-hover"
              size="sm"
              @click.native="subgetModal()"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></base-button>
          </form>
        </div>
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
      readOnly: false,
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      selects: {
        sucursales: [],
        clientes: [],
        vendedores: [],
        estadoFactura: []
      },
      currentCode: {
        codigo: ''
      },
      bill: {
        codigo: ''
      }
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.fillCatalogs(['sucursales', 'vendedores', 'clientes', 'estadoFactura'])
    if (this.id) this.checkId()
    this.currentCode = !this.id ? '' : this.currentCode
    this.checkedID = !this.id && !this.bill.nationalID
  },
  methods: {
    fillCatalogs(catalogs) {
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
    },
    validateFields() {
      return (
        !this.bill.nombre || !this.bill.apellido || !this.bill.identificacion
      )
    },
    fillForm(obj) {
      this.bill = {
        estadoVendedores: obj.estadoVendedores,
        personaId: obj.personaId,
        codigo: obj.codigo,
        nombre: obj.nombre,
        apellido: obj.apellido,
        identificacion: this.bill.identificacion
          ? this.bill.identificacion
          : obj.identificacion,
        correo: obj.correo,
        direccion: obj.direccion,
        celular: obj.celular,
        telefono: obj.telefono,
        estadoPersona: true,
        id: obj.id
      }
      if (obj.id != 0)
        this.currentCode = obj.codigo ? ' / Codigo: ' + obj.codigo : ''
    },
    // clear() {
    //   this.bill.codigo = ''
    //   this.bill.nombre = ''
    //   this.bill.apellido = ''
    //   this.bill.identificacion = ''
    //   this.bill.correo = ''
    //   this.bill.direccion = ''
    //   this.bill.celular = ''
    //   this.bill.telefono = ''
    //   this.bill.estadoVendedores = ''
    // },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'facturas', this.bill)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/bill/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
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
