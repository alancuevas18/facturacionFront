<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">{{ $t('users.index') }}</h2>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">
            {{ $t('users.users') }}
            <router-link to="/users/create">
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
                  <router-link :to="'/users/rols/' + props.row.id">
                    <base-button
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-lock-circle"></i>
                    </base-button>
                  </router-link>
                  <router-link :to="'/users/create/' + props.row.id">
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
      searchQuery: '',
      propsToSearch: ['nombre'],
      tableColumns: [
        {
          prop: 'nombre',
          label: 'Nombre',
          minWidth: 70
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
        .delete(this.baseApiUrl + 'Usuario/GetUsuario/' + row.id)
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
    }
  },
  mounted() {
    this.isLoading = true
    this.baseApiUrl = config.global.baseApiUrl
    axios
      .get(this.baseApiUrl + 'Usuario/GetUsuario')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.tableData.push(response.data[i])
        }
      })
      .catch((error) => {
        this.errored = true
      })
      .finally(() => (this.isLoading = false))
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData
      if (value !== '') {
        result = this.tableData.filter((c) =>
          this.propsToSearch.some((name) =>
            c[name].toString().includes(this.searchQuery)
          )
        )
      }
      this.searchedData = result
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
