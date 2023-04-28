<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
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
            <label class="col-form-label">Tipo Facturacion</label>
            <el-select
              required
              filterable
              class="select-primary"
              size="large"
              placeholder="Tipo Facturacion"
              v-model="bill.status"
            >
              <el-option
                v-for="option in selects.tipoFactura"
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
      <!-- Product -->
      <div class="container">
        <form class="row align-items-center" v-if="formToAddProducts">
          <label class="col-form-label">Cantidad</label>
          <base-input
            class="mb-0"
            size="4"
            placeholder="0"
            required
            type="number"
            v-model="currentCode.quanty"
            v-on:keyup.enter="pickProduct()"
          >
          </base-input>
          <label class="col-form-label">Producto</label>
          <base-input
            class="mb-0"
            placeholder="Producto"
            required
            v-model="currentCode.codigo"
            v-on:keyup.enter="pickProduct()"
          >
          </base-input>
          <label class="col-form-label">Descuento</label>
          <base-input
            class="mb-0"
            placeholder="Descuento"
            required
            v-model="currentCode.descuento"
            type="number"
            v-on:keyup.enter="pickProduct()"
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
          <base-button
            type="info"
            class="animation-on-hover"
            size="sm"
            @click.native="changeShowForm()"
          >
            Agregar Servicios</base-button
          >
        </form>
        <form class="row align-items-center" v-if="!formToAddProducts">
          <label class="col-form-label">Cantidad</label>
          <base-input
            class="mb-0"
            size="4"
            placeholder="0"
            required
            type="number"
            v-model="currentCode.quanty"
            v-on:keyup.enter="pickService()"
          >
          </base-input>
          <label class="col-form-label">Servicio</label>
          <base-input
            class="mb-0"
            placeholder="Servicio"
            required
            v-model="currentCode.codigo"
            v-on:keyup.enter="pickService()"
          >
          </base-input>
          <label class="col-form-label">Descuento</label>
          <base-input
            class="mb-0"
            placeholder="Descuento"
            required
            v-model="currentCode.descuento"
            type="number"
            v-on:keyup.enter="pickService()"
          >
          </base-input>
          <base-button
            type="success"
            class="animation-on-hover"
            size="sm"
            @click.native="pickService()"
            >+</base-button
          >
          <base-button
            type="primary"
            class="animation-on-hover"
            size="sm"
            @click.native="subgetModal()"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></base-button>
          <base-button
            type="info"
            class="animation-on-hover"
            size="sm"
            @click.native="changeShowForm()"
          >
            Agregar Productos</base-button
          >
        </form>
      </div>
    </card>
    <!-- Table -->
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">
          {{ $t('products.products') }}
        </h4>
        <div>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          ></div>
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
                  @click.native="handleDelete(props.$index, props.row)"
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
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">Total: {{ this.bill.total.toFixed(2) }}</p>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui'
import { BasePagination } from 'src/components'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import swal from 'sweetalert2'
import axios from 'axios'
import config from '@/config'

export default {
  components: {
    Loading,
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  computed: {
    queriedData() {
      return this.tableData
    }
  },
  data() {
    return {
      formToAddProducts: true,
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      office: '',
      selects: {
        sucursales: [],
        clientes: [],
        vendedores: [],
        tipoFactura: [
          { id: 1, nombre: 'Contado' },
          { id: 2, nombre: 'Credito' }
        ]
      },
      currentCode: {
        codigo: '',
        quanty: 1,
        tax: 0,
        descuento: 0
      },
      bill: {
        codigo: '',
        total: 0
      },
      billtatus: {},
      searchQuery: '',
      propsToSearch: ['codigo'],
      tableColumns: [
        {
          prop: 'codigo',
          label: 'Codigo',
          minWidth: 110
        },
        {
          prop: 'nombre',
          label: 'Nombre',
          minWidth: 100
        },
        {
          prop: 'cantidad',
          label: 'Cantidad',
          minWidth: 100
        },
        {
          prop: 'precio',
          label: 'Precio',
          minWidth: 100
        },
        {
          prop: 'itbis',
          label: 'ITBIS',
          minWidth: 70
        },
        {
          prop: 'descuento',
          label: 'Descuento',
          minWidth: 70
        },
        {
          prop: 'total',
          label: 'Total',
          minWidth: 100
        }
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    }
  },
  mounted() {
    // this.isLoading = true
    this.baseApiUrl = config.global.baseApiUrl
    this.fillCatalogs(['sucursales', 'vendedores', 'clientes'])
  },
  methods: {
    changeShowForm() {
      this.formToAddProducts = !this.formToAddProducts
    },
    validateQuanty(currentQuanty, storageQuanty) {
      if (currentQuanty > storageQuanty)
        return this.globalSweetMessage(
          'Cantidad exede limite en almacen',
          'error'
        )

      return true
    },
    globalValidations(obj, validQuanty = true) {
      if (this.currentCode.codigo == '')
        return this.globalSweetMessage('Favor digitar el codigo', 'error')
      if (!obj) return this.globalSweetMessage('Codigo invalido', 'warning')
      if (this.currentCode.quanty == 0 || this.currentCode.quanty == undefined)
        return this.globalSweetMessage(
          'Agregar un numero diferente a "0"',
          'error'
        )
      if (validQuanty)
        if (!this.validateQuanty(this.currentCode.quanty, obj.stock))
          return false

      if (
        parseInt(obj.precio) - parseInt(this.currentCode.descuento) <
        parseInt(obj.precioMinimo)
      )
        return this.globalSweetMessage(
          'Precio por debajo del valor minimo permitido',
          'error'
        )
      return true
    },
    pickProduct() {
      axios
        .get(
          this.baseApiUrl +
            'ProductosSucursales/bycodigoornombre?Nombre=' +
            this.currentCode.codigo +
            '&Codigo=' +
            this.currentCode.codigo
        )
        .then((response) => {
          console.log(response.data)
          if (!this.globalValidations(response.data[0])) return false
          this.currentCode.tax = response.data[0].productos.exento
            ? 0
            : response.data[0].productos.itbis
          let AddedProduct = this.tableData.findIndex(
            (p) => p.codigo == this.currentCode.codigo
          )
          let total = 0
          let itbis = 0
          let subTotal = 0
          itbis =
            response.data[0].precio *
            this.currentCode.quanty *
            this.currentCode.tax

          total =
            response.data[0].precio * this.currentCode.quanty +
            itbis -
            this.currentCode.descuento

          if (AddedProduct >= 0) {
            let quanty =
              parseInt(this.tableData[AddedProduct].cantidad) +
              parseInt(this.currentCode.quanty)

            if (!this.validateQuanty(quanty, response.data[0].stock))
              return false

            if (quanty <= 0) {
              this.handleDelete(AddedProduct)
              return false
            }
            subTotal = parseInt(this.tableData[AddedProduct].precio) * quanty

            itbis = subTotal * this.currentCode.tax
            this.tableData[AddedProduct].cantidad = quanty
            this.tableData[AddedProduct].itbis = itbis
            this.tableData[AddedProduct].total =
              subTotal + itbis - this.currentCode.descuento
          } else {
            if (this.currentCode.quanty < 0)
              return this.globalSweetMessage(
                'No puede agregar valores negativos',
                'error'
              )
            let product = {
              codigo: response.data[0].productos.codigo,
              nombre: response.data[0].productos.nombre,
              cantidad: this.currentCode.quanty,
              precio: response.data[0].precio,
              itbis: itbis,
              descuento: this.currentCode.descuento,
              total: total
            }
            this.tableData.push(product)
            AddedProduct = -1
          }
          //totals
          this.bill.total += total
        })
        .catch((error) => {
          return this.globalSweetMessage('Error al agregar Producto', 'error')
        })
        .finally(() => {})
    },
    handleDelete(index, row) {
      swal
        .fire({
          title: 'Desa quitar de la lista?',
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
            cancelButton: 'btn btn-danger btn-fill'
          },
          confirmButtonText: 'Confimar!',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false
        })
        .then((result) => {
          if (result.value) {
            if (this.bill.total > 0)
              this.bill.total -= this.tableData[index].total
            this.tableData.splice(index, 1)
            if (this.tableData.length == 0) this.bill.total = 0
          }
        })
    },
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
    }
  }
}
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
.swal2-icon-content {
  font-size: inherit !important;
}
.el-table th.el-table__cell {
  background-color: transparent;
}
</style>
