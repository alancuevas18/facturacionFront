<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-12">
      <h2 class="text-center">{{ $t('products.byOffice') }}</h2>
      <card>
        <template slot="header">
          <h4 class="card-title">
            {{ $t('products.details') }}
            <router-link to="/productsoffice/index">
              <button class="btn floatr btn-icon btn-youtube">
                <i class="tim-icons icon-double-left"></i>
              </button>
            </router-link>
          </h4>
        </template>
        <div class="row">
          <div class="col-md-6">
            <template>
              <card class="card-user">
                <p class="card-text"></p>
                <div class="author">
                  <div class="block block-one"></div>
                  <div class="block block-two"></div>
                  <div class="block block-three"></div>
                  <div class="block block-four"></div>
                  <img class="avatar" src="img/default-avatar.png" alt="..." />
                  <h5
                    class="title text-capitalize"
                    :class="
                      productStatus[serviceByOffice.estadoservicios - 1].nombre
                    "
                  >
                    {{
                      productStatus[serviceByOffice.estadoservicios - 1].nombre
                    }}
                  </h5>
                  <p class="description text-capitalize">
                    {{ serviceByOffice.servicios.nombre }}
                  </p>
                  <p class="description text-capitalize">
                    {{ serviceByOffice.servicios.descripcion }}
                  </p>
                </div>
                <p></p>
              </card>
            </template>
          </div>
          <div class="col-md-6">
            <template>
              <card class="card-user">
                <p class="card-text"></p>
                <div class="author">
                  <div class="block block-one"></div>
                  <div class="block block-two"></div>
                  <div class="block block-three"></div>
                  <div class="block block-four"></div>
                  <p class="description text-capitalize">
                    <b>Sucursal:</b> {{ serviceByOffice.sucursales.nombre }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Precio:</b> {{ serviceByOffice.precio }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Precio Minimo:</b> {{ serviceByOffice.precioMinimo }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Stock:</b> {{ serviceByOffice.stock }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Stock:</b> {{ serviceByOffice.stockMinimo }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Total:</b> {{ serviceByOffice.total }}
                  </p>
                </div>
                <p></p>
              </card>
            </template>
          </div>
        </div>
      </card>
      <!-- end card -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import config from '@/config'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      id: '',
      baseApiUrl: '',
      productCode: '',
      productStatus: {},
      serviceByOffice: {
        id: '',
        productoId: '',
        stock: '',
        stockMinimo: '',
        precio: '',
        servicios: null,
        sucursales: null,
        precioMinimo: '',
        sucursalesId: '',
        estadoservicios: '',
        total: '',
        servicios: [],
        sucursales: []
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.baseApiUrl = config.global.baseApiUrl
    this.find()
    this.fillCatalog()
  },
  methods: {
    fillCatalog() {
      axios
        .get(this.baseApiUrl + 'catalogo/estadoproducto')
        .then((response) => {
          this.productStatus = response.data
        })
        .catch((error) => {
          this.errored = true
        })
    },
    find() {
      axios
        .get(this.baseApiUrl + 'serviciossucursales/' + this.id)
        .then((response) => {
          this.isLoading = true
          this.serviceByOffice = {
            id: response.data.id,
            productoId: response.data.servicios.id,
            stock: response.data.stock,
            stockMinimo: response.data.stockMinimo,
            precio: response.data.precio,
            servicios: null,
            sucursales: null,
            precioMinimo: response.data.precioMinimo,
            sucursalesId: response.data.sucursalesId,
            estadoservicios: response.data.estadoservicios,
            total: response.data.total,
            servicios: response.data.servicios,
            sucursales: response.data.sucursales
          }
        })
        .catch((error) => {
          this.error = error
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
<style>
.floatr {
  float: right;
}
.Activo {
  color: forestgreen !important;
}
.Inactivo {
  color: red !important;
}
.Agotado {
  color: orange !important;
}
</style>
