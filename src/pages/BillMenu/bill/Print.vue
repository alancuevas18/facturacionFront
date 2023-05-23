<template>
  <div class="col-md-12 bg-white">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <button v-print="'#Print'" class="btn">
      <i class="fa-solid fa-print"></i>
    </button>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import axios from 'axios'
import config from '@/config'
import { computed } from 'vue'
import { select } from 'd3'
export default {
  components: {
    Loading
  },
  computed: {},
  data() {
    return {
      isLoading: false,
      fullPage: true,
      baseApiUrl: '',
      facturas: {
        detalleFactura: []
      },
      id: 0,
      title: ''
    }
  },
  methods: {},
  mounted() {
    this.baseApiUrl = config.global.baseApiUrl
    this.id = this.$route.params.id == '' ? '' : this.$route.params.id
     axios.get(this.baseApiUrl+'Facturas/'+this.id)
    .then((response)=>{
       this.facturas=response.data
     })

  }
}
</script>
<style>
.mytable {
  border-collapse: collapse;
}



body {
  background: white;
}
</style>
