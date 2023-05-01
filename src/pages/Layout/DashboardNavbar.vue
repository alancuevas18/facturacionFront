<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <!-- <a class="navbar-brand" href="#">{{ routeName }}</a> -->
    </div>

    <ul class="navbar-nav ml-auto">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <input type="text" class="form-control" placeholder="Search..." />
        <!--<div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div>
        -->
        <button
          class="btn btn-link"
          id="search-button"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button>
      </div>
      <modal
        :show.sync="searchModalVisible"
        class="modal-search"
        id="searchModal"
        :centered="false"
        :show-close="true"
      >
        <input
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="SEARCH"
        />
      </modal>
      <!-- <base-dropdown
        tag="li"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template
          slot="title"
        >
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Mike John responded to your email</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Your friend Michael is in town</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another notification</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another one</a>
        </li>
      </base-dropdown> -->
      <base-dropdown
        tag="li"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template slot="title">
          <div class="photo"></div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">Log out</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">{{ userName }}</a>
          <router-link to="/UserOffices/SelectOffices" class="nav-item dropdown-item">{{ office }}</router-link>
          <!--   store.state.usuario -->
        </li>
        <!-- <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Configuracion</a>
        </li> -->
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a href="#" @click="logOut()" class="nav-item dropdown-item"
            >Log out</a
          >
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav, Modal } from '@/components'
import SidebarToggleButton from './SidebarToggleButton'
import swal from 'sweetalert2'

export default {
  components: {
    SidebarToggleButton,
    BaseNav,
    Modal
  },
  computed: {
    routeName() {
      return 'DashBoard'
    },
    isRTL() {
      return false
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
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
  computed: {
    userName() {
      return this.$store.state.usuario
    },
    office() {
      return this.$store.state.office
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
