<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-12">
      <h2 class="text-center">{{ $t('products.index') }}</h2>
      <card>
        <template slot="header">
          <h4 class="card-title">
            {{ $t('products.details') }}
            <router-link to="/products/index">
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
                  <h5 class="title text-capitalize" :class="product.status">
                    {{ product.status }}
                  </h5>
                  <p class="description text-capitalize">
                    {{ product.nombre }}
                  </p>
                  <p class="description text-capitalize">
                    {{ product.descripcion }}
                  </p>
                </div>
                <p></p>

                <!-- <div slot="footer" class="button-container">
                  <a
                    :href="
                      'https://api.whatsapp.com/send?phone=' + product.cellPhone
                    "
                  >
                    <base-button class="btn-whatsapp" icon round>
                      <i class="fab fa-whatsapp"></i>
                    </base-button>
                  </a>
                </div> -->
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
                    <b>Codigo:</b> {{ product.codigo }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Marca:</b> {{ product.marcaId }}
                  </p>
                  <p class="description text-capitalize">
                    <b>TIpo:</b> {{ product.tipoProductoId }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Estado:</b> {{ product.estado }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Precio de Compra:</b> {{ product.estado }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Precio de Venta:</b> {{ product.estado }}
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
      product: [
        {
          codigo: '',
          nombre: '',
          descripcion: '',
          marcaId: '',
          Imagen: '',
          tipoProductoId: '',
          MarcaId: '',
          estado: ''
        }
      ]
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.baseApiUrl = config.global.baseApiUrl
    this.globalFind('productos', this.id, this.client).then((response) => {
      Object.keys(this.product).forEach((e) => {
        this.product[e] = response[e]
        this.product.estado = this.product.estado ? 'active' : 'inactive'
      })
    })
  },
  methods: {}
}
</script>
<style>
.floatr {
  float: right;
}
.active {
  color: forestgreen !important;
}
.inactive {
  color: red !important;
}
.btn-whatsapp {
  background: #25d366;
  background-image: -webkit-gradient(
    linear,
    right top,
    left bottom,
    from(#25d366),
    color-stop(#075e54),
    to(#25d366)
  );
  background-image: linear-gradient(to bottom left, #25d366, #075e54, #25d366);
  background-size: 210% 210%;
  background-position: top right;
  color: #ffffff;
  background-size: 210% 210%;
  background-position: top right;
  background-repeat: space;
}
.btn-whatsapp:hover {
  background: #25d366;
  background-image: -webkit-gradient(
    linear,
    right top,
    left bottom,
    from(#25d366),
    color-stop(#075e54),
    to(#25d366)
  );
  background-image: linear-gradient(to bottom left, #25d366, #075e54, #25d366);
}
</style>
