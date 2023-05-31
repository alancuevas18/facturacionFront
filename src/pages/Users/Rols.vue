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
                  v-model="user.role"
                >
                  <el-option
                    v-for="option in rols"
                    class="select-primary"
                    :value="option.nombre"
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
              <div class="col-12">
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
         
            </div>
          </form>
        </ValidationObserver>
      </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import {Table,TableColumn, Select, Option } from 'element-ui'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import config from '@/config'
import swal from 'sweetalert2'

extend('required', required)

export default {
  components: {
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
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
        role: '',
        userId: ''
      },
      selects: {
        simple: '',
        options: [
          { value: true, label: 'Activo' },
          { value: false, label: 'Inactivo' }
        ]
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: '',
      propsToSearch: ['role'],
      tableColumns: [
        {
          prop: 'role',
          label: 'Roles',
          minWidth: 70
        }
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    }
  },
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.user.userId = this.$route.params.id
    this.getRols()
  },
  methods: {
    validateFields() {
      return !this.user.role
    },
    assing() {
      if (this.validateFields()) {
        this.globalSweetMessage('Favor seleccionar un rol!', 'error')
      } else {
        this.isLoading = true
        console.log(this.user)
        axios
          .post(this.baseApiUrl + 'Usuario/Roles', this.user)
          .then((response) => {
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
            this.rols=response.data
        })
        .catch((error) => {
          //   this.globalSweetMessage('Error al cargar la pagina!', 'error')
        })
        .finally(() => (this.isLoading = false))

        axios
        .get(this.baseApiUrl + 'Usuario/GetRolesbyUser/'+this.user.userId)
        .then((response) => {
            this.tableData=response.data
        })
        .catch((error) => {
          //   this.globalSweetMessage('Error al cargar la pagina!', 'error')
        })
        .finally(() => (this.isLoading = false))
        
    },
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
        .delete(this.baseApiUrl + 'Usuario/DeleteUserRoles/' + row.role+'/'+row.userId)
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
