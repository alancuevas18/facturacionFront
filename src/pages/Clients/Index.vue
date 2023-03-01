<template>
    <div class="content">
      <div class="col-md-8 ml-auto mr-auto">
        <h2 class="text-center">{{$t('clients.index')}}</h2>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <card card-body-classes="table-full-width">
            <h4 slot="header" class="card-title">{{$t('clients.clients')}}  
                <router-link to="/clients/create">
                    <button class="btn floatr btn-icon btn-twitter">
                        <i class="tim-icons icon-simple-add"></i>
                    </button>
                </router-link>
            </h4>
            <div>
              <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
              >
                <base-input>
                  <el-input
                    type="search"
                    class="mb-3 search-input"
                    clearable
                    prefix-icon="el-icon-search"
                    placeholder="Search records"
                    v-model="searchQuery"
                    aria-controls="datatables"
                  >
                  </el-input>
                </base-input>
              </div>
              <table class="table tablesorter tableClass el-table__body" >
                <thead class="has-gutter">
                    <tr>
                        <th class ="el-table__cell" v-for="(item) in tableHeader">
                            <div class="cell">{{ item }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody >
              <tr class="el-table__row">
                <td class ="el-table__cell" v-for="(item, index) in tableData" :key="index">
                    <slot :row="item" :index="index">
                        <div class="cell" v-if="tableData['estadoPersona']">{{ tableData[index] }}</div>
                    </slot>
                </td>
                <td>
                    <router-link :to="'/clients/details/' + tableData['id']" >
                        <base-button
                      class="like btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-notes"></i>
                    </base-button>
                    </router-link>
                    <base-button
                      @click.native="handleEdit(tableData['id'])"
                      class="edit btn-link"
                      type="warning"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
                    </base-button>
                    <base-button
                      @click.native="handleDelete(tableData['id'])"
                      class="remove btn-link"
                      type="danger"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-simple-remove"></i>
                    </base-button>
                </td>
                </tr>
              </tbody>
                </table>
            </div>
          </card>
        </div>
      </div></div
  ></template>
  <script>
  import { Table, TableColumn, Select, Option } from 'element-ui';
  import { BasePagination } from 'src/components';
  import swal from 'sweetalert2';
  import axios from "axios";
  import config from '@/config';
  
  export default {
    components: {
   
    },
    computed: {
      to() {
        let highBound = this.from + this.pagination.perPage;
        if (this.total < highBound) {
          highBound = this.total;
        }
        return highBound;
      },
      from() {
        return this.pagination.perPage * (this.pagination.currentPage - 1);
      },
      total() {
        return this.searchedData.length > 0
          ? this.searchedData.length
          : this.tableData.length;
      }
    },
    data() {
      return {
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0,
          columns : ['A', 'B']
        },
        searchQuery: '',
        tableHeader: [],
        tableData: [],
        searchedData : [],
        baseApiUrl : '',
      };
    },
    methods: {
      handleView(index) {
        swal.fire({
          title: `Viendo ${index}`,
          buttonsStyling: false,
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success btn-fill'
          }
        });
      },
      handleEdit(index, row) {
        swal.fire({
          title: `Editando ${index}`,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-info btn-fill'
          }
        });
      },
      handleDelete(index) {
        swal.fire({
          title: 'Are you sure?',
          text: `Esta accion no se puede reversar`,
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
            cancelButton: 'btn btn-danger btn-fill'
          },
          confirmButtonText: 'Yes, delete it!',
          buttonsStyling: false
        }).then(result => {
          if (result.value) {
            this.deleteRow(index);
            swal.fire({
              title: 'Deleted!',
              text: `You deleted ${index}`,
              icon: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            });
          }
        });
      },
      deleteRow(index) {
        swal.fire({
          title: `Eliminando ${index}`,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-info btn-fill'
          }
        });
      }
    },
    mounted() {
    this.baseApiUrl = config.global.baseApiUrl;
    axios
      .get(this.baseApiUrl+'clientes')
      .then(response => {
        this.tableData = response.data[0].personas;
        //Table Header Handle
        this.tableHeader = Object.keys(this.tableData);
        this.tableHeader.push("Actions");
      })
      .catch(error => {
        this.errored = true
      })
      .finally(() => this.loading = false);

    },
    watch: {
    }
  };
  </script>
  <style>
  .pagination-select,
  .search-input {
    width: 200px;
  }
  .swal2-icon-content{
    font-size: inherit !important;
  }
  .el-table th.el-table__cell{
    background-color: transparent;
  }
  .floatr{
    float:right;
  }
  </style>
  