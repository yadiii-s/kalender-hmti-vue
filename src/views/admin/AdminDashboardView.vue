<template>
  <AdminLayout title="Admin Dashboard">
    <!-- Welcome -->
    <div class="cta-card mb-4" style="padding:32px 36px">
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <h2 style="font-size:1.5rem;margin-bottom:6px">Panel Admin — SIPMA HMJ</h2>
          <p style="margin:0;font-size:0.95rem">Kelola divisi, anggota, agenda, dan program kerja himpunan mahasiswa.</p>
        </div>
        <router-link to="/admin/divisions" class="btn btn-light btn-lg mt-3 mt-md-0"><i class="bi bi-diagram-3 me-1"></i> Kelola Divisi</router-link>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-4 mb-4">
      <div class="col-6 col-xl-3" v-for="(stat, i) in statCards" :key="i">
        <div class="dash-stat-card">
          <div class="dash-stat-top">
            <div class="dash-stat-icon" :style="stat.iconStyle"><i :class="'bi ' + stat.icon"></i></div>
          </div>
          <div class="dash-stat-num">{{ stat.value }}</div>
          <div class="dash-stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="row g-4">
      <div class="col-md-12" v-for="link in quickLinks" :key="link.to">
        <router-link :to="link.to" class="text-decoration-none">
          <div class="dash-panel" style="cursor:pointer;transition:all 0.3s" @mouseenter="$event.currentTarget.style.transform='translateY(-4px)'" @mouseleave="$event.currentTarget.style.transform=''">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-3">
                <div class="dash-stat-icon" :style="link.iconStyle"><i :class="'bi ' + link.icon"></i></div>
                <div>
                  <h5 style="margin:0;font-size:1.1rem">{{ link.title }}</h5>
                  <p style="margin:0;font-size:0.85rem;color:var(--text-muted)">{{ link.desc }}</p>
                </div>
              </div>
              <i class="bi bi-arrow-right fs-4 text-primary"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { getDashboardStats, getEvents, getDivisions } from '@/services/api'

const statCards = ref([
  { icon: 'bi-diagram-3', iconStyle: { background: 'var(--warning-light)', color: '#D97706' }, value: '7', label: 'Total Divisi' },
  { icon: 'bi-people', iconStyle: { background: 'var(--primary-soft)', color: 'var(--primary)' }, value: '0', label: 'Total Anggota' },
  { icon: 'bi-calendar2-event', iconStyle: { background: 'var(--success-light)', color: 'var(--success)' }, value: '0', label: 'Total Agenda' },
  { icon: 'bi-kanban', iconStyle: { background: 'var(--danger-light)', color: 'var(--danger)' }, value: '0', label: 'Total Proker' },
])

onMounted(async () => {
  try {
    const stats = await getDashboardStats()
    if (stats) {
      if (stats.total_divisions !== undefined) statCards.value[0].value = String(stats.total_divisions)
    }
  } catch {
    // ignore
  }

  try {
    const divisions = await getDivisions()
    if (Array.isArray(divisions) && divisions.length > 0) {
      statCards.value[0].value = String(divisions.length)
      let totalMembers = 0
      let totalProkers = 0
      divisions.forEach(d => {
        if (d.members_count !== undefined) totalMembers += d.members_count
        else if (Array.isArray(d.members)) totalMembers += d.members.length
        if (Array.isArray(d.work_programs)) totalProkers += d.work_programs.length
      })
      statCards.value[1].value = String(totalMembers)
      statCards.value[3].value = String(totalProkers)
    }
  } catch (err) {
    console.warn('Error fetching division stats:', err)
  }

  try {
    const events = await getEvents()
    if (Array.isArray(events)) {
      statCards.value[2].value = String(events.length)
    }
  } catch (err) {
    console.warn('Error fetching events stats:', err)
  }
})

const quickLinks = [
  { to: '/admin/divisions', icon: 'bi-diagram-3', iconStyle: { background: 'var(--warning-light)', color: '#D97706' }, title: 'Kelola Divisi', desc: 'Manajemen divisi, kelola anggota, kelola agenda, dan mengelola proker' },
]
</script>
