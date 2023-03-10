<!-- SideBar Config -->
<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">{{ $t('ConfigSide.title') }}</li>
        <li class="adjustments-line">
          <a class="switch-trigger background-color">
            <div class="badge-colors text-center">
              <span
                v-for="item in sidebarColors"
                :key="item.color"
                class="badge filter"
                :class="[`badge-${item.color}`, { active: item.active }]"
                :data-color="item.color"
                @click="changeSidebarBackground(item)"
              ></span>
            </div>
            <div class="clearfix"></div>
          </a>
        </li>

        <li class="adjustments-line">
          <div class="togglebutton switch-sidebar-mini">
            <span class="label-switch">Menu Completo</span>
            <base-switch
              v-model="sidebarMini"
              @input="minimizeSidebar"
            ></base-switch>
            <span class="label-switch label-right">Menu Mini</span>
          </div>

          <div class="togglebutton switch-change-color mt-3">
            <span class="label-switch">Modo Claro</span>
            <base-switch v-model="darkMode" @input="toggleMode"></base-switch>
            <span class="label-switch label-right">Modo Oscuro</span>
          </div>

          <div class="togglebutton switch-change-color mt-3">
            <span class="label-switch">ES</span>
            <base-switch v-model="lang" @input="changelag"></base-switch>
            <span class="label-switch label-right">EN</span>
          </div>
          <div></div>
        </li>
        <li class="button-container mt-4"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { BaseSwitch } from 'src/components'

export default {
  name: 'sidebar-share',
  components: {
    BaseSwitch
  },
  props: {
    backgroundColor: String
  },
  data() {
    return {
      sidebarMini: true,
      darkMode: true,
      isOpen: false,
      lang: false,
      title: 'title',
      sidebarColors: [
        { color: 'primary', active: false, value: 'primary' },
        { color: 'vue', active: true, value: 'vue' },
        { color: 'info', active: false, value: 'blue' },
        { color: 'success', active: false, value: 'green' },
        { color: 'warning', active: false, value: 'orange' },
        { color: 'danger', active: false, value: 'red' }
      ]
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    },
    toggleList(list, itemToActivate) {
      list.forEach((listItem) => {
        listItem.active = false
      })
      itemToActivate.active = true
    },
    changeSidebarBackground(item) {
      this.$emit('update:backgroundColor', item.value)
      this.toggleList(this.sidebarColors, item)
    },
    toggleMode(type) {
      let docClasses = document.body.classList
      if (type) {
        docClasses.remove('white-content')
      } else {
        docClasses.add('white-content')
      }
    },
    changelag() {
      this.i18n = this.$i18n
      this.i18n.locale = this.i18n.locale == 'en' ? 'es' : 'en'
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize()
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/sass/dashboard/custom/variables';

.settings-icon {
  cursor: pointer;
}

.badge-vue {
  background-color: $vue;
}
</style>
