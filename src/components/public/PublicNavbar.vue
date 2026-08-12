<template>
  <nav class="navbar navbar-expand-lg navbar-custom fixed-top" :class="{ scrolled: isScrolled }">
    <div class="container">
      <router-link class="navbar-brand-custom" to="/">
        <span class="logo-badge"><i class="bi bi-calendar2-week"></i></span>
        <span>SIPMA HMJ</span>
      </router-link>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <i class="bi bi-list fs-2"></i>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/" exact>Beranda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/divisi">Divisi</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/agenda">Agenda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/proker">Program Kerja</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/organisasi">Organisasi</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/#tentang">Tentang</router-link>
          </li>
          <li class="nav-item" v-if="!auth.isAuthenticated">
            <router-link class="btn btn-primary btn-sm btn-login" to="/login">
              <i class="bi bi-box-arrow-in-right"></i> Masuk
            </router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link class="btn btn-primary btn-sm btn-login" to="/admin/dashboard">
              <i class="bi bi-grid-1x2"></i> Dashboard
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
