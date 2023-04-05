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
      <div class="container">
        <form class="row align-items-center">
          <label class="col-form-label">Cantidad</label>
          <base-input
            class="mb-0"
            size="4"
            placeholder="0"
            required
            v-model="currentCode.quanty"
          >
          </base-input>
          <label class="col-form-label">Producto</label>
          <base-input
            class="mb-0"
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
    </card>
    <div class="col-12">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">
          {{ $t('products.products') }}
        </h4>
        <div>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <el-select
              class="select-primary mb-3 pagination-select"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-primary"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>

            <base-input>
              <el-input
                type="search"
                class="mb-3 search-input"
                clearable
                prefix-icon="el-icon-search"
                placeholder="Buscar"
                v-model="searchQuery"
                aria-controls="datatables"
              >
              </el-input>
            </base-input>
          </div>
          <el-table :data="queriedData">
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            >
            </el-table-column>
          </el-table>
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </base-pagination>
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
      let result = this.tableData
      if (this.searchedData.length > 0) {
        result = this.searchedData
      }
      return result.slice(this.from, this.to)
    },
    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length
    }
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      office: '',
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
  methods: {
    handleDelete(index, row) {
      swal
        .fire({
          title: 'Estas seguro?',
          text: `Esta accion no se puede reversar!`,
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
            this.deleteRow(row)
          }
        })
    },
    deleteRow(row) {
      this.isLoading = true
      axios
        .delete(this.baseApiUrl + 'productossucursales/' + row.id)
        .then(() => {
          this.globalSweetMessage()
          let indexToDelete = this.tableData.findIndex(
            (tableRow) => tableRow.id === row.id
          )
          if (indexToDelete >= 0) {
            this.tableData.splice(indexToDelete, 1)
          }
        })
        .catch((error) => {
          this.globalSweetMessage(error.response.data.message, 'error')
        })
        .finally(() => (this.isLoading = false))
    },
    fillTable(resource, clearFilters) {
      this.tableData = []
      if (clearFilters) this.office = ''
      axios
        .get(this.baseApiUrl + resource)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.tableData.push(response.data[i])
            this.tableData[i]['sucursalesId'] =
              response.data[i].sucursales.nombre
            this.tableData[i]['suplidorId'] = response.data[i].suplidores.nombre
            //this.tableData[i]['estadoEntrada'] = 'Estado'
          }
        })
        .catch((error) => {
          this.errored = true
        })
        .finally(() => (this.isLoading = false))
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
    },
    filterByOffice() {
      this.tableData = []
      this.fillTable('Entradas/bysuculsal/' + this.office)
    }
  },
  mounted() {
    this.isLoading = true
    this.baseApiUrl = config.global.baseApiUrl
    this.fillCatalogs(['sucursales', 'vendedores', 'clientes', 'estadoFactura'])
    this.fillTable('Entradas', true)
  },
  watch: {}
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
