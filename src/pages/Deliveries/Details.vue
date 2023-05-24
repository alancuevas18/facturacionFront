<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-12">
      <h2 class="text-center">{{ $t('deliveries.index') }}</h2>
      <card>
        <template slot="header">
          <h4 class="card-title">
            {{ $t('deliveries.details') }}
            <router-link to="/deliveries/index">
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
                    :class="delivery.estadoMensajero"
                  >
                    {{ delivery.estadoMensajero }}
                  </h5>
                  <p class="description text-capitalize">
                    {{ delivery.nombre }} {{ delivery.apellido }}
                  </p>
                </div>
                <p></p>

                <div slot="footer" class="button-container">
                  <a
                    :href="
                      'https://api.whatsapp.com/send?phone=' + delivery.celular
                    "
                  >
                    <base-button class="btn-whatsapp" icon round>
                      <i class="fab fa-whatsapp"></i>
                    </base-button>
                  </a>
                </div>
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
                    <b>identificacion:</b> {{ delivery.identificacion }}
                  </p>
                  <p class="description text-capitalize">
                    <b>correo:</b> {{ delivery.correo }}
                  </p>
                  <p class="description text-capitalize">
                    <b>direccion:</b> {{ delivery.direccion }}
                  </p>
                  <p class="description text-capitalize">
                    <b>celular:</b> {{ delivery.celular }}
                  </p>
                  <p class="description text-capitalize">
                    <b>Telefono:</b> {{ delivery.telefono }}
                  </p>
                </div>
                <p></p>

                <div slot="footer" class="button-container">
                  <a :href="'tel:' + delivery.celular">
                    <base-button icon round>
                      <i class="fas fa-phone"></i>
                    </base-button>
                  </a>
                  <a :href="'tel:' + delivery.telefono">
                    <base-button icon round>
                      <i class="fas fa-mobile"></i>
                    </base-button>
                  </a>
                  <a :href="'mailto:' + delivery.correo">
                    <base-button icon round>
                      <i class="fas fa-envelope-open"></i>
                    </base-button>
                  </a>
                  <a
                    :href="'http://maps.google.com/?q=' + delivery.direccion"
                    target="_blank"
                  >
                    <base-button icon round>
                      <i class="fas fa-map-marker-alt"></i>
                    </base-button>
                  </a>
                </div>
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Loading },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      id: '',
      delivery: {
        codigo: '',
        nombre: '',
        apellido: '',
        identificacion: '',
        correo: '',
        direccion: '',
        celular: '',
        telefono: '',
        estadoMensajero: ''
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.globalFind('mensajeros', this.id, this.delivery).then((response) => {
      Object.keys(this.delivery).forEach((e) => {
        this.delivery[e] = response[e]
        this.delivery.estadoMensajero = this.delivery.estadoMensajero
          ? 'active'
          : 'inactive'
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
