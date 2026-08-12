<template>
  <aside class="sidebar" :class="{ show: sidebarOpen }">
    <div class="sidebar-brand">
      <span class="logo-badge"><i class="bi bi-calendar2-week"></i></span>
      <div>
        <h5>SIPMA HMJ</h5>
        <p>Admin Panel</p>
      </div>
    </div>
    <ul class="sidebar-menu">
      <li class="sidebar-section-title">Menu Utama</li>
      <li>
        <router-link to="/admin/dashboard" active-class="active" @click="closeSidebar">
          <i class="bi bi-grid-1x2"></i> Dashboard
        </router-link>
      </li>

      <li class="sidebar-section-title">Manajemen</li>
      <li>
        <router-link to="/admin/divisions" active-class="active" @click="closeSidebar">
          <i class="bi bi-diagram-3"></i> Kelola Divisi
        </router-link>
      </li>
      <li>
        <router-link to="/admin/calendar" active-class="active" @click="closeSidebar">
          <i class="bi bi-calendar3"></i> Kalender Agenda
        </router-link>
      </li>

      <li class="sidebar-section-title">Akun</li>
      <li>
        <router-link to="/user/profile" active-class="active" @click="closeSidebar">
          <i class="bi bi-person"></i> Profil
        </router-link>
      </li>
      <li>
        <a href="#" @click.prevent="handleLogout">
          <i class="bi bi-box-arrow-right"></i> Keluar
        </a>
      </li>
    </ul>
  </aside>
  <div class="sidebar-overlay" :class="{ show: sidebarOpen }" @click="closeSidebar"></div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

defineProps({
  sidebarOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])
const auth = useAuthStore()
const router = useRouter()

function closeSidebar() {
  emit('close')
}

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>
