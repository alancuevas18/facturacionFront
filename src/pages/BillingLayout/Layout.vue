<template>
  <div>
    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <a class="navbar-brand" href="#" v-if="title">{{ title }}</a>
      </div>

      <ul class="navbar-nav">
        <router-link
          class="nav-item"
          tag="li"
          to="/dashboard"
          v-if="AbleToSee('Admin,Root')"
        >
          <a class="nav-link text-primary">
            <i class="tim-icons icon-minimal-left"></i>Dashboard
          </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          to="/billDashboard/index"
          v-if="AbleToSee('Admin,Root,Supervisor')"
          @click.native="showMenu=!showMenu"

        >
          <a class="nav-link">
            <i class="tim-icons icon-chart-pie-36"></i> Inicio
          </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          to="/billDashboard/shift"
          v-if="AbleToSee('Admin,Root,Supervisor')"
          @click.native="showMenu=!showMenu"

        >
          <a class="nav-link"> <i class="tim-icons icon-laptop"></i> Turnos </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          to="/billDashboard/quotation"
          @click.native="showMenu=!showMenu"
          v-if="AbleToSee('Admin,Root,Supervisor')"
        >
          <a class="nav-link">
            <i class="tim-icons icon-notes"></i> Cotizacion
          </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          to="/billDashboard/returns"
          @click.native="showMenu=!showMenu"

          v-if="AbleToSee('Admin,Root,Supervisor')"
        >
          <a class="nav-link">
            <i class="tim-icons icon-coins"></i> Devoluciones
          </a>
        </router-link>

        <router-link
          class="nav-item"
          tag="li"
          to="/billDashboard/cashClose"
          @click.native="showMenu=!showMenu"
          v-if="AbleToSee('Admin,Root,Supervisor')"
        >
          <a class="nav-link">
            <i class="tim-icons icon-money-coins"></i> Cuadre
          </a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/billDashboard/bill/create" @click.native="showMenu=!showMenu">
          <a class="nav-link">
            <i class="tim-icons icon-paper"></i> Facturacion
          </a>
        </router-link>

        <router-link class="nav-item" tag="li" to="#">
          <a class="nav-link" @click="logOut()">
            <i class="tim-icons icon-minimal-right"></i> Salir del Sistema
          </a>
        </router-link>
        
      </ul>
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <nav>
              <ul class="nav">
                <li class="nav-item"></li>
                <li class="nav-item"></li>
                <li class="nav-item"></li>
              </ul>
            </nav>
            <div class="copyright">
              &copy; {{ year }}, Creado
              <i class="tim-icons icon-cloud-download-93"></i> por
              <a href="https://emacsoft.com" target="_blank" rel="noopener"
                >EMACSoft</a
              >
              La solucion a tu negocio
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseNav } from 'src/components'
import { ZoomCenterTransition } from 'vue2-transitions'
import swal from 'sweetalert2'
import SidebarShare from 'src/pages/Layout/SidebarSharePlugin'
export default {
  components: {
    BaseNav,
    ZoomCenterTransition,
    SidebarShare
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
      sidebarBackground: 'vue'
    }
  },
  computed: {
    title() {
      const { name } = this.$route
      return name
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
      this.showMenu = !this.showMenu
    },
    AbleToSee(rols) {
      var userRol = this.$store.state.rol
      if (rols == '*') return true
      else {
        let arrayRols = rols.split(',')
        if (arrayRols.find((e) => e == userRol)) return true
      }
    },
    logOut() {
      swal
        .fire({
          title: 'Confirmacion',
          text: `Seguro que deseas salir del sistema?`,
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success btn-fill',
            cancelButton: 'btn btn-danger btn-fill'
          },
          confirmButtonText: 'Salir!',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false
        })
        .then((result) => {
          if (result.value) {
            this.$store.commit('logOut')
          }
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.showMenu) {
      this.closeMenu()
      setTimeout(() => {
        next()
      }, this.menuTransitionDuration)
    } else {
      next()
    }
  },
  mounted() {},
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
<style lang="scss">
.navbar.auth-navbar {
  top: 0;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
