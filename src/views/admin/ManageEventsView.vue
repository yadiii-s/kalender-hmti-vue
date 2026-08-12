<template>
  <AdminLayout title="Kelola Events">
    <DataTable title="Daftar Events" :columns="columns" :items="events" @edit="openEdit" @delete="openDelete">
      <template #header-action>
        <button class="btn btn-primary btn-sm" @click="openCreate"><i class="bi bi-plus-lg me-1"></i> Tambah Event</button>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-division="{ value }">
        <DivisionBadge :division="value" />
      </template>
      <template #cell-date_range="{ item }">
        <span class="small fw-semibold text-secondary">
          <i class="bi bi-calendar3 me-1"></i>
          {{ item.start_time ? formatTanggal(item.start_time) : (item.date ? formatTanggal(item.date) : '-') }}
          <span v-if="item.end_time && item.end_time !== item.start_time">
            s.d. {{ formatTanggal(item.end_time) }}
          </span>
        </span>
      </template>
    </DataTable>

    <FormModal :show="showForm" :title="editingEvent ? 'Edit Event' : 'Tambah Event'" @close="showForm = false" @submit="saveEvent">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama Kegiatan / Agenda</label>
        <input type="text" class="form-control" v-model="form.name" required style="border-radius:12px">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Divisi Penyelenggara</label>
        <select class="form-select" v-model="form.division" style="border-radius:12px">
          <option v-for="d in divs" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Tanggal Mulai</label>
          <input type="date" class="form-control" v-model="form.start_time" required style="border-radius:12px">
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">Tanggal Berakhir</label>
          <input type="date" class="form-control" v-model="form.end_time" required style="border-radius:12px">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Status Kegiatan</label>
          <select class="form-select" v-model="form.status" style="border-radius:12px">
            <option value="Mendatang">Mendatang</option>
            <option value="Berlangsung">Berlangsung</option>
            <option value="Selesai">Selesai</option>
            <option value="Persiapan">Persiapan</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">Lokasi</label>
          <input type="text" class="form-control" v-model="form.location" style="border-radius:12px">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">PIC (Penanggung Jawab)</label>
        <input type="text" class="form-control" v-model="form.pic" placeholder="Nama PIC..." style="border-radius:12px">
      </div>
    </FormModal>

    <ConfirmDialog :show="showDelete" @confirm="confirmDelete" @cancel="showDelete = false" />
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import FormModal from '@/components/admin/FormModal.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import DivisionBadge from '@/components/shared/DivisionBadge.vue'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/services/api'

const divs = ['KWSB', 'Internal', 'Eksternal', 'Minbak', 'Sosma', 'Infokom', 'KWU']

const columns = [
  { key: 'name', label: 'Nama Kegiatan' },
  { key: 'division', label: 'Divisi' },
  { key: 'date_range', label: 'Tanggal Kegiatan' },
  { key: 'status', label: 'Status' },
]

const initialEvents = [
  { id: 1, name: 'Rapat Pleno Evaluasi', division: 'Internal', start_time: '2026-07-12', end_time: '2026-07-12', status: 'Berlangsung', location: 'Ruang Rapat', pic: 'Ketua Divisi' },
  { id: 2, name: 'Workshop UI/UX', division: 'Infokom', start_time: '2026-07-15', end_time: '2026-07-16', status: 'Mendatang', location: 'Lab Komputer 2', pic: 'Tim Infokom' },
  { id: 3, name: 'Seminar Karier 2026', division: 'Eksternal', start_time: '2026-07-20', end_time: '2026-07-20', status: 'Mendatang', location: 'Auditorium', pic: 'Divisi Eksternal' },
  { id: 4, name: 'Bakti Sosial & Donor Darah', division: 'Sosma', start_time: '2026-07-28', end_time: '2026-07-29', status: 'Mendatang', location: 'Halaman Kampus', pic: 'Koor Sosma' },
  { id: 5, name: 'Bazaar Kewirausahaan', division: 'KWU', start_time: '2026-08-03', end_time: '2026-08-05', status: 'Mendatang', location: 'Plaza Kampus', pic: 'Pengurus KWU' },
]

const events = ref([...initialEvents])
const loading = ref(false)

function formatTanggal(raw) {
  if (!raw) return ''
  const str = String(raw).substring(0, 10)
  const d = new Date(str)
  if (isNaN(d.getTime())) return str
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function fetchEventsData() {
  loading.value = true
  try {
    const res = await getEvents()
    if (Array.isArray(res) && res.length > 0) {
      events.value = res.map(item => {
        const rawStart = item.start_time || item.start || item.date || item.tanggal || item.start_date
        const rawEnd = item.end_time || item.end || item.end_date || item.tanggal_selesai || rawStart
        const startStr = rawStart ? String(rawStart).substring(0, 10) : ''
        const endStr = rawEnd ? String(rawEnd).substring(0, 10) : startStr
        return {
          id: item.id,
          name: item.name || item.title || item.nama_kegiatan,
          title: item.title || item.name,
          division: item.division || item.divisi || 'Internal',
          start_time: startStr,
          end_time: endStr,
          date: startStr,
          status: item.status || 'Mendatang',
          location: item.location || item.lokasi || '-',
          pic: item.pic || 'Pengurus'
        }
      })
    }
  } catch (err) {
    console.warn('Backend API getEvents error, using initial dataset:', err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEventsData()
})

const showForm = ref(false)
const showDelete = ref(false)
const editingEvent = ref(null)
const deletingEvent = ref(null)

const todayStr = new Date().toISOString().substring(0, 10)
const form = reactive({ 
  name: '', 
  division: 'Internal', 
  start_time: todayStr, 
  end_time: todayStr, 
  status: 'Mendatang', 
  location: '', 
  pic: '' 
})

function openCreate() {
  editingEvent.value = null
  const today = new Date().toISOString().substring(0, 10)
  Object.assign(form, { 
    name: '', 
    division: 'Internal', 
    start_time: today, 
    end_time: today, 
    status: 'Mendatang', 
    location: '', 
    pic: '' 
  })
  showForm.value = true
}

function openEdit(evt) {
  editingEvent.value = evt
  const startVal = evt.start_time ? evt.start_time.substring(0, 10) : (evt.date ? evt.date.substring(0, 10) : '')
  const endVal = evt.end_time ? evt.end_time.substring(0, 10) : startVal
  Object.assign(form, { 
    name: evt.name || evt.title || '', 
    division: evt.division || 'Internal', 
    start_time: startVal, 
    end_time: endVal, 
    status: evt.status || 'Mendatang', 
    location: evt.location || '', 
    pic: evt.pic || '' 
  })
  showForm.value = true
}

function openDelete(evt) {
  deletingEvent.value = evt
  showDelete.value = true
}

async function saveEvent() {
  const payload = { 
    title: form.name,
    name: form.name,
    division: form.division,
    start_time: form.start_time,
    end_time: form.end_time || form.start_time,
    location: form.location,
    status: form.status,
    pic: form.pic || 'Pengurus'
  }

  if (editingEvent.value) {
    try {
      await updateEvent(editingEvent.value.id, payload)
    } catch (err) {
      console.warn('Backend API updateEvent error:', err.message)
    }
    const idx = events.value.findIndex(e => e.id === editingEvent.value.id)
    if (idx >= 0) Object.assign(events.value[idx], { ...form, ...payload })
  } else {
    try {
      const res = await createEvent(payload)
      if (res && res.id) payload.id = res.id
    } catch (err) {
      console.warn('Backend API createEvent error:', err.message)
    }
    if (!payload.id) payload.id = Date.now()
    events.value.push({ ...form, ...payload })
  }
  showForm.value = false
}

async function confirmDelete() {
  if (deletingEvent.value) {
    try {
      await deleteEvent(deletingEvent.value.id)
    } catch (err) {
      console.warn('Backend API deleteEvent error:', err.message)
    }
    events.value = events.value.filter(e => e.id !== deletingEvent.value.id)
  }
  showDelete.value = false
}
</script>
