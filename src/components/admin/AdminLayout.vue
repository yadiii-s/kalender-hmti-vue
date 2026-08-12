<template>
  <div class="dashboard-body">
    <div class="dashboard-wrapper">
      <AdminSidebar :sidebarOpen="sidebarOpen" @close="sidebarOpen = false" />
      <div class="dashboard-main">
        <AdminNavbar :title="title" @toggleSidebar="sidebarOpen = !sidebarOpen" />
        <div class="dashboard-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminNavbar from './AdminNavbar.vue'

defineProps({
  title: { type: String, default: 'Admin Dashboard' }
})

const sidebarOpen = ref(false)
</script>
