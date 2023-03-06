<!-- Footer Content -->
<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="https://emacsoft.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Sistema de Facturacion EMACSoft
          </a>
        </li>
      </ul>
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
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style></style>
