<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="'FT'"
      :title="'Facturación'"
      :link="'/billDashboard/index'"
    >
      <template slot="links">
        <!-- <sidebar-item
          :link="{
            name: $t('Inicio'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/billDashboard/index'
          }"
        >
        </sidebar-item> -->

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'tim-icons icon-chart-pie-36',
            path: '/'
          }"
        >
        </sidebar-item>
        <!-- billing Menu -->
        <sidebar-item
          :link="{
            name: $t('billing.billing'),
            icon: 'fa-solid fa-file-invoice-dollar'
          }"
        >
        <sidebar-item
            :link="{
              name: $t('billing.create'),
              path: '/billDashboard/bill/create'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: $t('billing.billingindex'),
              path: '/billDashboard/bill/index'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('billing.pending'),
              path: '/billDashboard/bill/BillPending'
            }"
          ></sidebar-item>
        </sidebar-item>
               <!-- Clients Menu -->
               <sidebar-item
          :link="{
            name: $t('clients.clients'),
            icon: 'fas fa-users'
          }"
        >
          <sidebar-item
          :link="{ name: $t('clients.create'), path: '/clients/create' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('clients.index'), path: '/clients/index' }"
          ></sidebar-item>
  
        </sidebar-item>
  
        <!-- shift Menu -->
        <sidebar-item
          :link="{
            name: $t('shift.shift'),
            icon: 'tim-icons icon-laptop'
          }"
        >
        <sidebar-item
            :link="{
              name: $t('shift.create'),
              path: '/billDashboard/shift/create'
            }"
          ></sidebar-item>

          <sidebar-item
            :link="{
              name: $t('shift.index'),
              path: '/billDashboard/shift/index'
            }"
          ></sidebar-item>    
        </sidebar-item>
        <!-- quotation Menu -->
        <sidebar-item
          :link="{
            name: $t('quotation.quotation'),
            icon: 'tim-icons icon-notes'
          }"
        >
          <sidebar-item
            :link="{ name: $t('quotation.create'), path: '/billDashboard/quotation/create' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: $t('quotation.index'), path: '/billDashboard/quotation' }"
          ></sidebar-item>

        </sidebar-item>
        
       <!-- Cashclose Menu -->
        <sidebar-item
          :link="{
            name: $t('cashClose.cashClose'),
            icon: 'tim-icons icon-money-coins'
          }"
        >
        <sidebar-item
            :link="{ name: $t('cashClose.create'), path: '/billDashboard/cashClose/create' }"
          ></sidebar-item>

          <sidebar-item
            :link="{ name: $t('cashClose.index'), path: '/billDashboard/cashClose' }"
          ></sidebar-item>
    
        </sidebar-item>

        <!-- returns Menu -->
        <sidebar-item
          :link="{
            name: $t('returns.returns'),
            icon: 'fa-solid fa-rotate-left'
          }"
        >
          <sidebar-item
            :link="{ name: $t('returns.index'), path: '/billDashboard/returns' }"
          ></sidebar-item>
        </sidebar-item>
 
          <!-- returns Menu -->
        <sidebar-item :link="{ name: $t('sends.sends'),icon: 'fa-solid fa-paper-plane'}">
          <sidebar-item
            :link="{ name: $t('sends.index'), path: '/billDashboard/sends' }"
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

import DashboardNavbar from 'src/pages/Layout/DashboardNavbar.vue'
import ContentFooter from 'src/pages/Layout/ContentFooter.vue'
import SidebarFixedToggleButton from 'src/pages/Layout/SidebarFixedToggleButton.vue'
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
      sidebarBackground: 'blue'
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
