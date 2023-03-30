<template>
  <div class="content">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    />
    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Bienvenido a Facturaction</h2>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {
    queriedData() {}
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style></style>
