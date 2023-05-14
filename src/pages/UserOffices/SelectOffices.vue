<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">{{ $t('userOffices.SelectOffice') }}</h2>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="row justify-content-center d-flex">
          <div
            class="col-md-4"
            v-for="item in Offices"
            :key="item.id"
            @click="selectOffice(item.id)"
          >
            <div class="card tarjeta">
              <div class="card-header">
                {{ item.nombre }}
              </div>
              <div class="card-body">
                <h5 class="card-title">Ubicación: {{ item.ubicacion }}</h5>
                <p class="card-text">
                  {{ item.telefono }} / {{ item.telefono2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'element-ui'
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
    [Option.name]: Option
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      searchQuery: '',
      Offices: []
    }
  },
  methods: {
    selectOffice(id) {
      axios
        .put(
          this.baseApiUrl + 'UsuarioSucursal/SelectSucursal?SucursalId=' + id
        )
        .then(() => {
          this.$router.push(
            this.$store.state.routerHistory[
              this.$store.state.routerHistory.length - 1
            ]
          )
        })
    }
  },

  mounted() {
    this.isLoading = true
    this.baseApiUrl = config.global.baseApiUrl
    axios
      .get(this.baseApiUrl + 'UsuarioSucursal/GetSucursalesByUser')
      .then((response) => {
        this.Offices = response.data
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
.tarjeta:hover {
  box-shadow: 0 0px 9px 6px rgb(241 241 241);
}
</style>
