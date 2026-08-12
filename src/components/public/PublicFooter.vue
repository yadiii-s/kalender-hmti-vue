<template>
  <footer class="footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="footer-brand">
            <span class="logo-badge"><i class="bi bi-calendar2-week"></i></span>
            <h4>SIPMA HMJ</h4>
          </div>
          <p>Sistem Informasi Penjadwalan dan Manajemen Kegiatan Himpunan Mahasiswa — Platform modern untuk organisasi yang lebih produktif.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <h5>Tautan</h5>
          <ul>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/divisi">Divisi</router-link></li>
            <li><router-link to="/agenda">Agenda</router-link></li>
            <li><router-link to="/organisasi">Organisasi</router-link></li>
            <li><router-link to="/login">Masuk</router-link></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <h5>Divisi</h5>
          <ul>
            <li><router-link to="/divisi">KWSB</router-link></li>
            <li><router-link to="/divisi">Internal</router-link></li>
            <li><router-link to="/divisi">Eksternal</router-link></li>
            <li><router-link to="/divisi">Minbak</router-link></li>
            <li><router-link to="/divisi">Infokom</router-link></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6">
          <h5>Kontak</h5>
          <ul class="footer-contact">
            <li><i class="bi bi-geo-alt"></i> Gedung Kemahasiswaan, Kampus Pusat, Indonesia</li>
            <li><i class="bi bi-envelope"></i> sipma.hmj@kampus.ac.id</li>
            <li><i class="bi bi-telephone"></i> +62 812 3456 7890</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        &copy; {{ currentYear }} SIPMA HMJ — Sistem Informasi Penjadwalan dan Manajemen Kegiatan Himpunan Mahasiswa. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
