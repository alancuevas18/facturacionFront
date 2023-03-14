<template>
  <div class="col-md-12">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <h2 class="text-center">
      {{ $t('global.add') }} {{ $t('products.byOffice') }}
    </h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
          {{ title }} {{ currentCode }}
          <router-link to="/ProductsOffice/index">
            <button class="btn floatr btn-icon btn-youtube">
              <i class="tim-icons icon-double-left"></i>
            </button>
          </router-link>
        </h4>
      </template>
      <div>
        <ValidationObserver>
          <form class="form-horizontal">
            <div class="row">
              <label class="col-sm-2 col-form-label">Codigo*</label>
              <div class="col-sm-9">
                <ValidationProvider
                  name="codigo"
                  rules="required|min:1"
                  v-slot="{ passed, failed, errors }"
                >
                  <base-input
                    required
                    autofocus
                    v-model="productByOffice.codigo"
                    v-on:keyup.enter="checkProductCode()"
                    :error="errors[0]"
                    :class="[
                      { 'has-success': passed },
                      { 'has-danger': failed }
                    ]"
                  >
                  </base-input>
                </ValidationProvider>
              </div>
              <div class="col-sm-1">
                <base-button
                  type="info"
                  class="animation-on-hover"
                  size="md"
                  @click.native="showSearchProductModal = true"
                  ><i class="tim-icons icon-zoom-split"></i
                ></base-button>
              </div>
            </div>

            <div class="row d-flex justify-content-center">
              <base-button
                type="success"
                native-type="submit"
                class="animation-on-hover"
                :disabled="checkedID"
                @click.native="!id ? create() : edit()"
                ><i class="tim-icons icon-check-2 mr-2"></i
                >{{ title }}</base-button
              >

              <router-link to="/productsoffice/index">
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
    <modal
      :show.sync="showSearchProductModal"
      class="modal-search"
      id="searchModal"
      :centered="false"
      :show-close="true"
    >
      <input
        slot="header"
        v-model="searchQuery"
        type="text"
        class="form-control"
        id="inlineFormInputGroup"
        placeholder="SEARCH"
      />
      <el-table :data="queriedData">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.label"
          :min-width="column.minWidth"
          :prop="column.prop"
          :label="column.label"
        >
        </el-table-column>
        <el-table-column :min-width="135" align="right" label="Actions">
          <div slot-scope="props">
            <base-button
              @click.native="selectProduct(props.$index, props.row)"
              class="remove btn-link"
              type="danger"
              size="sm"
              icon
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </div>
        </el-table-column>
      </el-table>
    </modal>
  </div>
</template>
<script>
import { Modal } from '@/components'
import { Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required, min, numeric } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'

extend('required', required)
extend('min', min)
extend('numeric', numeric)

export default {
  components: {
    Modal,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      searchQuery: '',
      showSearchProductModal: false,
      readOnly: false,
      checkedID: false,
      isLoading: false,
      fullPage: true,
      id: '',
      currentCode: '',
      baseApiUrl: '',
      title: '',
      selects: {
        simple: ''
      },
      productByOffice: {
        id: 0,
        codigo: '',
        productoId: 0,
        stock: 0,
        stockMinimo: 0,
        precio: 0,
        precioMinimo: 0,
        sucursalesId: 0,
        estadoProductos: 1,
        total: 0
      },
      tableColumns: [
        {
          prop: 'codigo',
          label: 'Codigo',
          minWidth: 70
        },
        {
          prop: 'nombre',
          label: 'Nombre',
          minWidth: 100
        },
        {
          prop: 'descripcion',
          label: 'Descripcion',
          minWidth: 200
        },
        {
          prop: 'marcaProducto',
          label: 'Marca',
          minWidth: 120
        },
        {
          prop: 'tipoProducto',
          label: 'Tipo Producto',
          minWidth: 200
        }
      ]
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
    this.title = !this.id ? 'Cear' : 'Editar'
    if (this.id) this.checkId()
    this.checkedID = true
  },
  methods: {
    checkProductCode() {
      axios
        .get(this.baseApiUrl + 'productos/' + this.productByOffice.codigo)
        .then((response) => {
          this.isLoading = true
          console.log(response.data)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    searchProduct() {
      console.log('search code')
    },
    checkId() {
      axios
        .get(this.baseApiUrl + 'productos/' + this.id)
        .then((response) => {
          console.log(response.data)
          this.isLoading = true
          this.fillForm(response.data.result)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    },
    create() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor llenar todos los campos!', 'error')
      } else {
        this.isLoading = true
        axios
          .post(this.baseApiUrl + 'productos', this.product)
          .then((response) => {
            this.globalSweetMessage(response.data.message)
            this.clear()
            this.$router.push({ path: '/products/index' })
          })
          .catch((error) => {
            this.globalSweetMessage(error.response.data.message, 'error')
          })
          .finally(() => (this.isLoading = false))
      }
    },
    showModalInsertBrand() {
      this.showInsertModalBrand = !this.showInsertModalBrand
    }
  }
}
</script>
<style>
.floatr {
  float: right;
}

.inline {
  display: inline-block;
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
input:read-only {
  color: white;
}
</style>
