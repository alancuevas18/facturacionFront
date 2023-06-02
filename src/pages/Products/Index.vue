<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />

    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">{{ $t('products.index') }}</h2>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">
            {{ $t('products.products') }}
            <router-link to="/products/create">
              <button class="btn floatr btn-icon btn-twitter">
                <i class="tim-icons icon-simple-add"></i>
              </button>
            </router-link>
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
              <a @click="crearExcel()"><i class="fa-solid fa-file-excel display-3" style="color:#0f850f;"></i></a>
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
              <el-table-column :min-width="135" align="right" label="Actions">
                <div slot-scope="props">
                  <!-- <router-link :to="'/products/details/' + props.row.id">
                    <base-button
                      class="like btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-notes"></i>
                    </base-button>
                  </router-link> -->
                  <router-link :to="'/products/create/' + props.row.id">
                    <base-button
                      class="edit btn-link"
                      type="warning"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
                    </base-button>
                  </router-link>
                  <base-button
                    @click.native="
                      handleDelete(props.$index, props.row, tableData)
                    "
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
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui'
import { BasePagination } from 'src/components'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
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
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      propsToSearch: [
        'codigo',
        'nombre',
        'descripcion',
        'marcaProducto',
        'tipoProducto'
      ],
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
          prop: 'marcas',
          label: 'Marca',
          minWidth: 120
        },
        {
          prop: 'tipoProductos',
          label: 'Tipo Producto',
          minWidth: 200
        }
      ],
      tableData: [],
      searchedData: []
    }
  },
  methods: {
    handleDelete(index, row, tableData, page) {
      this.tableData = this.globalHandleDelete(
        index,
        row,
        tableData,
        'productos'
      )
    },
    crearExcel(){   
      this.exportExcel(this.tableData,'Lista de productos')
    }
  },
  mounted() {
    this.globalFillTable('productos').then((response) => {
      this.tableData=response
    })
  },
  watch: {
    searchQuery(value) {
      if (value !== '') {
        this.searchedData = this.globalFilter(
          this.tableData,
          this.propsToSearch,
          value
        )
      }
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
