<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot="links">
        <!-- <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        >
        
        </sidebar-item> -->
        <sidebar-item
          :link="{
            name: $t('billing.index'),
            icon: 'fa-solid fa-file-invoice-dollar',
            path: '/billDashboard/index'
          }"
        >
        </sidebar-item>
        <!-- Clients Menu -->
        <sidebar-item
          :link="{
            name: $t('clients.clients'),
            icon: 'fas fa-users'
          }"
        >
          <sidebar-item
            v-if="AbleToSee('*')"
            :link="{ name: $t('clients.create'), path: '/clients/create' }"
          ></sidebar-item>
          <sidebar-item
            v-if="AbleToSee('Admin,Root')"
            :link="{ name: $t('clients.index'), path: '/clients/index' }"
          ></sidebar-item>
  
        </sidebar-item>

        <!-- spends Menu -->
        <sidebar-item
          :link="{
            name: $t('spends.spends'),
            icon: 'fas fa-dollar-sign'
          }"
        >
         <sidebar-item
            :link="{ name: $t('spends.create'), path: '/spends/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('spends.index'), path: '/spends/index' }"
          ></sidebar-item>
    
        </sidebar-item>
        <!-- invetory Menu -->
        <sidebar-item
          :link="{
            name: $t('invetory.invetory'),
            icon: 'fa-solid fa-box-open'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('products.byOffice'),
              path: '/productsoffice/index'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('services.byOffice'),
              path: '/servicesoffice/index'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('inventoryadjustment.index'),
              path: '/inventoryadjustment/index'
            }"
          ></sidebar-item>
          <!-- <sidebar-item
            :link="{ name: $t('invetory.index'), path: '/invetory/index' }"
          ></sidebar-item> -->
        </sidebar-item>
        <!-- shopping Menu -->
        <sidebar-item
          :link="{
            name: $t('shopping.shopping'),
            icon: 'fa-solid fa-bag-shopping'
          }"
        >
        <sidebar-item
            :link="{ name: $t('shopping.create'), path: '/shopping/create' }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: $t('shopping.index'),
              path: '/shopping/index'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: $t('shopping.pending'),
              path: '/shopping/ShoppingPending'
            }"
          ></sidebar-item>
        </sidebar-item>
        <!-- departures Menu -->
        <sidebar-item
          :link="{
            name: $t('departures.departures'),
            icon: 'fa-solid fa-dolly'
          }"
        >
                
        <sidebar-item
            :link="{ name: $t('departures.create'), path: '/Departures/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('departures.index'), path: '/Departures/index' }"
          ></sidebar-item>
        </sidebar-item>
        <!-- Products Menu -->
        <sidebar-item
          :link="{
            name: $t('products.products'),
            icon: 'tim-icons icon-cart'
          }"
        >
                
        <sidebar-item
            :link="{ name: $t('products.create'), path: '/products/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('products.index'), path: '/products/index' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('brands.brands'), path: '/brands/index' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('products.type'), path: '/productstype/index' }"
          ></sidebar-item>
        </sidebar-item>
        <!-- serivices Menu -->
        <sidebar-item
          :link="{
            name: $t('services.services'),
            icon: 'fa-solid fa-people-carry-box'
          }"
        >
        <sidebar-item
            :link="{ name: $t('services.create'), path: '/services/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('services.index'), path: '/services/index' }"
          ></sidebar-item>
        </sidebar-item>
        <!-- office Menu -->
        <sidebar-item
          :link="{
            name: $t('offices.offices'),
            icon: 'far fa-building'
          }"
        >
          <sidebar-item
            :link="{ name: $t('offices.create'), path: '/offices/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('offices.index'), path: '/offices/index' }"
          ></sidebar-item>
        </sidebar-item>
                <!-- Suppliers Menu -->
                <sidebar-item
          :link="{
            name: $t('suppliers.suppliers'),
            icon: 'tim-icons icon-delivery-fast'
          }"
        >
         <sidebar-item
            v-if="AbleToSee('*')"
            :link="{ name: $t('suppliers.create'), path: '/suppliers/create' }"
          ></sidebar-item>
          <sidebar-item
            v-if="AbleToSee('*')"
            :link="{ name: $t('suppliers.index'), path: '/suppliers/index' }"
          ></sidebar-item>
    
        </sidebar-item>
        <!-- Sellers Menu -->
        <sidebar-item
          :link="{
            name: $t('sellers.sellers'),
            icon: 'fa-solid fa-handshake'
          }"
        >
        <sidebar-item
            :link="{ name: $t('sellers.create'), path: '/sellers/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sellers.index'), path: '/sellers/index' }"
          ></sidebar-item>
        </sidebar-item>
        <!-- delivery Menu -->
        <sidebar-item
          :link="{
            name: $t('deliveries.deliveries'),
            icon: 'tim-icons icon-email-85'
          }"
        >
        <sidebar-item
            :link="{ name: $t('deliveries.create'), path: '/deliveries/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('deliveries.index'), path: '/deliveries/index' }"
          ></sidebar-item>
        </sidebar-item>
        <!-- Configuration -->
        <sidebar-item
          :link="{
            name: $t('Configuration.Configuration'),
            icon: 'fa fa-cog fa-2x'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('deductions.index'),
              path: '/Deductions/index'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('spendsType.index'),
              path: '/spendsType/index'
            }"
          ></sidebar-item>
        </sidebar-item>

        <!-- Configuration -->
        <sidebar-item
          :link="{
            name: $t('users.users'),
            icon: 'fa-solid fa-users-gear'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('users.index'),
              path: '/users/index'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: $t('userOffices.index'),
              path: '/userOffices/index'
            }"
          ></sidebar-item>

        </sidebar-item>
        <!-- structureComprobantes Menu -->
        <sidebar-item
          :link="{
            name: $t('structureComprobantes.structureComprobantes'),
            icon: 'far fa-list-alt'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('structureComprobantes.index'),
              path: '/structureComprobantes/index'
            }"
          ></sidebar-item>
        </sidebar-item>

        <hr />
      </template>
    </side-bar>
    <!--Presentacion de Configuracion-->
    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>
      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import SidebarShare from './SidebarSharePlugin'
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import SidebarFixedToggleButton from './SidebarFixedToggleButton.vue'
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    ZoomCenterTransition,
    SidebarShare
  },
  data() {
    return {
      sidebarBackground: 'vue'
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    AbleToSee(rols) {
      var userRol = this.$store.state.rol
      if (rols == '*') return true
      else {
        let arrayRols = rols.split(',')
        if (arrayRols.find((e) => e == userRol)) return true
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList
      let isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar')
        initScrollbar('main-panel')
        initScrollbar('sidebar-wrapper')

        docClasses.add('perfect-scrollbar-on')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    }
  },
  mounted() {
    this.initScrollbar()
  },
  computed: {}
}
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
