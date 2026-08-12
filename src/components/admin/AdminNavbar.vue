<template>
  <div class="dashboard-topbar">
    <div class="d-flex align-items-center gap-3">
      <button class="sidebar-toggle" @click="$emit('toggleSidebar')">
        <i class="bi bi-list"></i>
      </button>
      <h4>{{ title }}</h4>
    </div>
    <div class="topbar-actions">
      <div class="topbar-search d-none d-lg-block">
        <i class="bi bi-search"></i>
        <input type="text" class="form-control" placeholder="Cari...">
      </div>
      <div class="topbar-icon"><i class="bi bi-bell"></i><span class="notif-dot"></span></div>
      <div class="topbar-avatar">{{ auth.userInitials }}</div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

defineProps({
  title: { type: String, default: 'Admin Dashboard' }
})

defineEmits(['toggleSidebar'])

const auth = useAuthStore()
</script>

<style scoped>
.sidebar-toggle {
  display: none;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--secondary);
  cursor: pointer;
}
@media (max-width: 991.98px) {
  .sidebar-toggle { display: flex; }
}
</style>
