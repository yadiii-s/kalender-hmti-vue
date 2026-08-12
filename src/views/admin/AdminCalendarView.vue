<template>
  <AdminLayout title="Kalender Agenda & Proker Himpunan">
    <!-- Top Header / Bar -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold">Kalender Agenda & Proker Himpunan</h4>
        <p class="text-muted mb-0 small">Menampilkan seluruh agenda kegiatan dan program kerja (proker) dari semua divisi berbasis API.</p>
      </div>
      <div class="d-flex gap-2">
        <button 
          class="btn btn-sm rounded-pill px-3 fw-semibold"
          :class="showFreeHighlight ? 'btn-success text-white' : 'btn-outline-success'"
          @click="showFreeHighlight = !showFreeHighlight"
        >
          <i class="bi bi-magic me-1"></i> Highlight Tanggal Free (Bebas Agenda)
        </button>
        <router-link to="/admin/divisions" class="btn btn-primary btn-sm rounded-pill px-3 fw-semibold">
          <i class="bi bi-diagram-3 me-1"></i> Kelola Divisi & Agenda
        </router-link>
      </div>
    </div>

    <!-- Controls & Filter Bar -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-body p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <!-- Month Navigation -->
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-light btn-sm rounded-circle" style="width:36px;height:36px" @click="changeMonth(-1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <h5 class="mb-0 fw-bold px-2 text-primary" style="min-width: 180px; text-align: center;">
            {{ monthNames[currentMonth] }} {{ currentYear }}
          </h5>
          <button class="btn btn-light btn-sm rounded-circle" style="width:36px;height:36px" @click="changeMonth(1)">
            <i class="bi bi-chevron-right"></i>
          </button>
          <button class="btn btn-soft-primary btn-sm rounded-pill px-3 ms-2" @click="goToToday">
            Hari Ini
          </button>
        </div>

        <!-- Type Filter & Division Filter -->
        <div class="d-flex flex-wrap align-items-center gap-2">
          <!-- Type Filter -->
          <div class="btn-group btn-group-sm rounded-pill p-1 bg-light">
            <button 
              class="btn rounded-pill border-0 px-3 fw-semibold"
              :class="filterType === 'all' ? 'btn-white shadow-sm text-primary' : 'text-muted'"
              @click="filterType = 'all'"
            >
              Semua
            </button>
            <button 
              class="btn rounded-pill border-0 px-3 fw-semibold"
              :class="filterType === 'agenda' ? 'btn-white shadow-sm text-primary' : 'text-muted'"
              @click="filterType = 'agenda'"
            >
              <i class="bi bi-calendar-event me-1"></i>Agenda
            </button>
            <button 
              class="btn rounded-pill border-0 px-3 fw-semibold"
              :class="filterType === 'proker' ? 'btn-white shadow-sm text-warning text-dark' : 'text-muted'"
              @click="filterType = 'proker'"
            >
              <i class="bi bi-journal-check me-1"></i>Proker
            </button>
          </div>

          <!-- Division Select Filter -->
          <select class="form-select form-select-sm rounded-pill" v-model="filterDivision" style="width: 150px;">
            <option value="all">Semua Divisi</option>
            <option v-for="d in divisionsList" :key="d.name" :value="d.name">{{ d.name }}</option>
          </select>
        </div>

        <!-- Summary Stats -->
        <div class="d-flex gap-3 text-center">
          <div class="px-3 py-1 rounded-3 bg-light">
            <div class="fw-bold text-primary">{{ currentMonthAgendaCount }}</div>
            <div class="text-muted" style="font-size:0.72rem">Agenda Bulan Ini</div>
          </div>
          <div class="px-3 py-1 rounded-3 bg-light">
            <div class="fw-bold text-warning">{{ currentMonthProkerCount }}</div>
            <div class="text-muted" style="font-size:0.72rem">Proker Bulan Ini</div>
          </div>
          <div class="px-3 py-1 rounded-3 bg-light">
            <div class="fw-bold text-success">{{ freeDaysCount }}</div>
            <div class="text-muted" style="font-size:0.72rem">Hari Free</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Division Legend Bar -->
    <div class="d-flex flex-wrap gap-2 align-items-center mb-3 px-2">
      <span class="small text-muted me-1 fw-semibold"><i class="bi bi-palette me-1"></i>Warna Divisi:</span>
      <span 
        v-for="div in divisionsList" 
        :key="div.name"
        class="badge rounded-pill px-3 py-1"
        :style="{ background: div.bg || '#EFF6FF', color: div.color || '#2563EB', border: '1px solid ' + (div.color || '#2563EB') }"
      >
        {{ div.name }}
      </span>
      <span class="badge rounded-pill px-3 py-1 bg-success-subtle text-success border border-success">
        <i class="bi bi-check-circle-fill me-1"></i>FREE (Bebas Agenda & Proker)
      </span>
    </div>

    <!-- CALENDAR GRID -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted small">Memuat jadwal agenda dan proker dari API...</p>
    </div>

    <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <!-- Days of Week Header -->
      <div class="grid-header bg-light border-bottom text-center fw-bold py-2 text-secondary small">
        <div>Minggu</div>
        <div>Senin</div>
        <div>Selasa</div>
        <div>Rabu</div>
        <div>Kamis</div>
        <div>Jumat</div>
        <div>Sabtu</div>
      </div>

      <!-- Days Cells Grid -->
      <div class="calendar-grid">
        <div 
          v-for="(cell, i) in calendarCells" 
          :key="i" 
          class="calendar-cell p-2 d-flex flex-column justify-content-between"
          :class="{ 
            'other-month': !cell.inCurrentMonth, 
            'is-today': cell.isToday,
            'is-highlighted-free': cell.isFree && showFreeHighlight && cell.inCurrentMonth
          }"
          @click="onCellClick(cell)"
        >
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span 
              class="day-number fw-bold" 
              :class="{ 'text-primary': cell.isToday, 'text-muted': !cell.inCurrentMonth }"
            >
              {{ cell.day }}
            </span>

            <!-- Free Badge if day has no events & no prokers -->
            <span v-if="cell.inCurrentMonth && cell.items.length === 0" class="free-badge">
              <i class="bi bi-check-circle-fill me-1"></i>FREE
            </span>

            <!-- Conflict Badge if multiple divisions have events on same day -->
            <span v-else-if="cell.inCurrentMonth && cell.hasConflict" class="badge bg-danger rounded-pill px-2" style="font-size:0.65rem" title="Ada bentrok tanggal antar divisi!">
              ⚠️ Bentrok
            </span>
          </div>

          <!-- Items Badges List (Agenda & Proker) -->
          <div class="cell-events flex-grow-1 overflow-auto" style="max-height: 90px;">
            <div 
              v-for="item in cell.items" 
              :key="item.type + '-' + item.id" 
              class="event-badge mb-1 px-2 py-1 rounded-2 text-truncate"
              :style="{ 
                background: getDivStyle(item.division).bg, 
                color: getDivStyle(item.division).color, 
                borderLeft: '3px solid ' + (item.type === 'proker' ? '#D97706' : getDivStyle(item.division).color) 
              }"
              :title="`[${item.type.toUpperCase()}] ${item.division}: ${item.title}`"
            >
              <i :class="item.type === 'proker' ? 'bi bi-journal-check text-warning me-1' : 'bi bi-calendar-event me-1'"></i>
              <strong style="font-size:0.7rem">{{ item.division }}:</strong> 
              <span style="font-size:0.75rem"> {{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DAY OVERVIEW MODAL -->
    <div v-if="selectedCell" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius:20px">
          
          <!-- Modal Header -->
          <div class="modal-header border-0 px-4 pt-4 pb-2">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-calendar-event me-2 text-primary"></i>
              Jadwal Agenda & Proker — {{ formatTanggalFull(selectedCell.dateStr) }}
            </h5>
            <button type="button" class="btn-close" @click="selectedCell = null"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body p-4">
            
            <!-- Conflict Warning if multiple divisions scheduled -->
            <div v-if="selectedCell.hasConflict" class="alert alert-warning border-0 shadow-sm rounded-3 mb-3 p-3 d-flex align-items-start gap-2">
              <i class="bi bi-exclamation-triangle-fill fs-4 text-warning flex-shrink-0"></i>
              <div>
                <strong class="d-block text-dark">Peringatan Tanggal Bentrok / Tabrakan!</strong>
                <span class="small text-muted">Terdapat {{ selectedCell.items.length }} agenda/proker dari divisi berbeda pada tanggal yang sama. Harap koordinasi antar-divisi agar kegiatan berjalan lancar.</span>
              </div>
            </div>

            <!-- Free Date Indicator -->
            <div v-if="selectedCell.items.length === 0" class="text-center py-5 bg-light rounded-4 mb-3">
              <i class="bi bi-calendar-check text-success fs-1"></i>
              <h6 class="fw-bold mt-2 text-success">Tanggal Ini Bebas Agenda & Proker (FREE)!</h6>
              <p class="text-muted small mb-0">Tidak ada kegiatan atau program kerja divisi yang terjadwal di tanggal ini.</p>
            </div>

            <!-- Scheduled Items List -->
            <div v-else class="mb-3">
              <h6 class="fw-bold mb-3 text-muted small text-uppercase">AGENDA & PROKER TERJADWAL ({{ selectedCell.items.length }}):</h6>
              
              <div v-for="item in selectedCell.items" :key="item.type + '-' + item.id" class="p-3 mb-3 rounded-4 border shadow-sm" :style="{ background: getDivStyle(item.division).bg }">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="badge rounded-pill" :style="{ background: getDivStyle(item.division).color, color: '#fff' }">
                        {{ item.division }}
                      </span>
                      <span class="badge rounded-pill" :class="item.type === 'proker' ? 'bg-warning text-dark' : 'bg-primary'">
                        <i :class="item.type === 'proker' ? 'bi bi-journal-check me-1' : 'bi bi-calendar-event me-1'"></i>
                        {{ item.type === 'proker' ? 'Program Kerja' : 'Agenda Himpunan' }}
                      </span>
                      <span class="badge bg-light text-dark border">{{ item.status || 'Mendatang' }}</span>
                    </div>

                    <h5 class="fw-bold mb-1 text-dark">{{ item.title }}</h5>
                    
                    <div class="d-flex flex-wrap gap-3 small text-muted mt-2">
                      <span><i class="bi bi-person me-1"></i>PIC: <strong>{{ item.pic || '-' }}</strong></span>
                      <span v-if="item.location"><i class="bi bi-geo-alt me-1"></i>Lokasi: <strong>{{ item.location }}</strong></span>
                      <span v-if="item.progress !== undefined"><i class="bi bi-bar-chart me-1"></i>Progress: <strong>{{ item.progress }}%</strong></span>
                    </div>

                    <p v-if="item.description" class="small text-muted mb-0 mt-2 text-truncate" style="max-width:500px">
                      {{ item.description }}
                    </p>
                  </div>

                  <router-link to="/admin/divisions" class="btn btn-outline-primary btn-sm rounded-pill px-3 text-nowrap">
                    <i class="bi bi-gear me-1"></i> Kelola di Divisi
                  </router-link>
                </div>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer border-0 bg-light px-4">
            <router-link to="/admin/divisions" class="btn btn-primary rounded-pill px-4">
              <i class="bi bi-plus-lg me-1"></i> Kelola Agenda & Proker Divisi
            </router-link>
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="selectedCell = null">Tutup</button>
          </div>

        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { 
  getDivisions, 
  getEvents, 
  getWorkPrograms, 
  formatTanggalShort 
} from '@/services/api'

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())

const divisionsList = ref([
  { name: 'KWSB', color: '#2563EB', bg: '#EFF6FF' },
  { name: 'Internal', color: '#22C55E', bg: '#F0FDF4' },
  { name: 'Eksternal', color: '#F97316', bg: '#FFF7ED' },
  { name: 'Minbak', color: '#8B5CF6', bg: '#F5F3FF' },
  { name: 'Sosma', color: '#EF4444', bg: '#FEF2F2' },
  { name: 'Infokom', color: '#06B6D4', bg: '#ECFEFF' },
  { name: 'KWU', color: '#EAB308', bg: '#FEFCE8' }
])

const allCalendarItems = ref([])
const loading = ref(true)
const showFreeHighlight = ref(false)
const selectedCell = ref(null)

const filterType = ref('all') // 'all', 'agenda', 'proker'
const filterDivision = ref('all')

// Helper function to extract YYYY-MM-DD from any date string
function normalizeDateStr(rawDate) {
  if (!rawDate) return ''
  const str = String(rawDate).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.substring(0, 10)
  }
  const d = new Date(str)
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  return ''
}

async function loadData() {
  loading.value = true
  const items = []

  try {
    const [dRes, eRes, wRes] = await Promise.allSettled([getDivisions(), getEvents(), getWorkPrograms()])

    // Divisions metadata
    if (dRes.status === 'fulfilled' && Array.isArray(dRes.value) && dRes.value.length > 0) {
      divisionsList.value = dRes.value.map(d => ({
        name: d.name || d.nama,
        color: d.color || '#2563EB',
        bg: d.color_soft || d.colorSoft || '#EFF6FF'
      }))

      // Extract prokers embedded in division response
      dRes.value.forEach(d => {
        if (Array.isArray(d.work_programs)) {
          d.work_programs.forEach(wp => {
            const dateStr = normalizeDateStr(wp.date)
            items.push({
              type: 'proker',
              id: wp.id || Date.now(),
              title: wp.name,
              division: d.name || d.nama,
              dateStr: dateStr || '2026-08-15',
              pic: wp.pic || d.coordinator || 'Pengurus',
              progress: wp.progress || 0,
              status: wp.status || 'Perencanaan',
              description: `Program kerja divisi ${d.name}`
            })
          })
        }
      })
    }

    // Events / Agenda
    let hasApiAgenda = false
    if (eRes.status === 'fulfilled' && Array.isArray(eRes.value) && eRes.value.length > 0) {
      eRes.value.forEach(e => {
        const rawStart = e.start_time || e.start || e.date || e.tanggal || e.tanggal_mulai
        const rawEnd = e.end_time || e.end || e.tanggal_selesai || e.end_date || rawStart

        const startStr = normalizeDateStr(rawStart)
        const endStr = normalizeDateStr(rawEnd) || startStr

        if (startStr) {
          hasApiAgenda = true
          items.push({
            type: 'agenda',
            id: e.id || Date.now() + Math.random(),
            title: e.title || e.name || e.nama_kegiatan || 'Agenda Himpunan',
            division: e.division || e.divisi || 'Internal',
            dateStr: startStr,
            startDate: startStr,
            endDate: endStr,
            pic: e.pic || 'Pengurus',
            location: e.location || e.lokasi || 'Kampus Utama',
            status: e.status || 'Mendatang',
            description: e.description || ''
          })
        }
      })
    }

    if (!hasApiAgenda) {
      const m = String(currentMonth.value + 1).padStart(2, '0')
      const fallbacks = [
        { id: 'f-1', title: 'Workshop UI/UX & Figma', division: 'Infokom', start_time: `${currentYear.value}-${m}-05`, end_time: `${currentYear.value}-${m}-06`, pic: 'Divisi Infokom', location: 'Lab 2', status: 'Mendatang', description: 'Pelatihan UI/UX design.' },
        { id: 'f-2', title: 'Rapat Pleno Evaluasi Semester', division: 'Internal', start_time: `${currentYear.value}-${m}-10`, end_time: `${currentYear.value}-${m}-10`, pic: 'Sekretaris', location: 'Ruang Rapat Utama', status: 'Berlangsung', description: 'Evaluasi proker semester.' },
        { id: 'f-3', title: 'Seminar Karier & Magang Industri', division: 'Eksternal', start_time: `${currentYear.value}-${m}-15`, end_time: `${currentYear.value}-${m}-17`, pic: 'Divisi Eksternal', location: 'Auditorium Kampus', status: 'Mendatang', description: 'Seminar karier nasional.' },
        { id: 'f-4', title: 'Bakti Sosial & Donor Darah', division: 'Sosma', start_time: `${currentYear.value}-${m}-22`, end_time: `${currentYear.value}-${m}-23`, pic: 'Divisi Sosma', location: 'Halaman Kampus', status: 'Mendatang', description: 'Baksos & donor darah.' },
        { id: 'f-5', title: 'Bazaar Kewirausahaan Mahasiswa', division: 'KWU', start_time: `${currentYear.value}-${m}-25`, end_time: `${currentYear.value}-${m}-27`, pic: 'Divisi KWU', location: 'Plaza Kampus', status: 'Mendatang', description: 'Bazaar produk kreatif karya mahasiswa.' }
      ]
      fallbacks.forEach(e => {
        items.push({
          type: 'agenda',
          id: e.id,
          title: e.title,
          division: e.division,
          dateStr: e.start_time,
          startDate: e.start_time,
          endDate: e.end_time || e.start_time,
          pic: e.pic,
          location: e.location,
          status: e.status,
          description: e.description
        })
      })
    }

    // Standalone Work Programs
    if (wRes.status === 'fulfilled' && Array.isArray(wRes.value)) {
      wRes.value.forEach(wp => {
        const divName = wp.division_name || (typeof wp.division === 'string' ? wp.division : wp.division?.name) || 'Internal'
        const dateStr = normalizeDateStr(wp.date)
        if (!items.some(i => i.type === 'proker' && i.title === wp.name && i.division === divName)) {
          items.push({
            type: 'proker',
            id: wp.id || Date.now(),
            title: wp.name || wp.title,
            division: divName,
            dateStr: dateStr || '2026-08-20',
            pic: wp.pic || 'Pengurus Divisi',
            progress: wp.progress || 0,
            status: wp.status || 'Perencanaan',
            description: ''
          })
        }
      })
    }
  } catch (err) {
    console.warn('Error loading calendar items:', err)
  } finally {
    allCalendarItems.value = items
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

function getDivStyle(divName) {
  const found = divisionsList.value.find(d => d.name && d.name.toLowerCase() === String(divName).toLowerCase())
  return {
    color: found ? found.color : '#2563EB',
    bg: found ? found.bg : '#EFF6FF'
  }
}

function changeMonth(delta) {
  currentMonth.value += delta
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

function goToToday() {
  currentYear.value = new Date().getFullYear()
  currentMonth.value = new Date().getMonth()
}

/* ── Calendar Grid Computation ────────────────────────────────────────────── */
const calendarCells = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const todayStr = new Date().toISOString().substring(0, 10)
  const cells = []

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const prevMonthVal = month === 0 ? 11 : month - 1
    const prevYearVal = month === 0 ? year - 1 : year
    const dateStr = `${prevYearVal}-${String(prevMonthVal + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const items = getItemsOnDate(dateStr)
    cells.push({
      day: d,
      inCurrentMonth: false,
      dateStr,
      isToday: dateStr === todayStr,
      items,
      isFree: items.length === 0,
      hasConflict: checkCellConflict(items)
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const monthFormatted = String(month + 1).padStart(2, '0')
    const dayFormatted = String(d).padStart(2, '0')
    const dateStr = `${year}-${monthFormatted}-${dayFormatted}`
    const items = getItemsOnDate(dateStr)

    cells.push({
      day: d,
      inCurrentMonth: true,
      dateStr,
      isToday: dateStr === todayStr,
      items,
      isFree: items.length === 0,
      hasConflict: checkCellConflict(items)
    })
  }

  // Next month leading days to complete grid (42 cells)
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const nextMonthVal = month === 11 ? 0 : month + 1
    const nextYearVal = month === 11 ? year + 1 : year
    const dateStr = `${nextYearVal}-${String(nextMonthVal + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const items = getItemsOnDate(dateStr)
    cells.push({
      day: d,
      inCurrentMonth: false,
      dateStr,
      isToday: dateStr === todayStr,
      items,
      isFree: items.length === 0,
      hasConflict: checkCellConflict(items)
    })
  }

  return cells
})

function getItemsOnDate(dateStr) {
  return allCalendarItems.value.filter(item => {
    // Type filter
    if (filterType.value !== 'all' && item.type !== filterType.value) return false
    // Division filter (case-insensitive)
    if (filterDivision.value !== 'all' && item.division && item.division.toLowerCase() !== filterDivision.value.toLowerCase()) return false
    // Date match (range check if startDate and endDate present)
    if (item.startDate && item.endDate && item.startDate.length === 10 && item.endDate.length === 10) {
      return item.startDate <= dateStr && dateStr <= item.endDate
    }
    return item.dateStr === dateStr
  })
}

function checkCellConflict(items) {
  if (items.length < 2) return false
  const divisions = new Set(items.map(i => i.division))
  return divisions.size > 1
}

const currentMonthAgendaCount = computed(() => {
  return calendarCells.value
    .filter(c => c.inCurrentMonth)
    .flatMap(c => c.items)
    .filter(i => i.type === 'agenda').length
})

const currentMonthProkerCount = computed(() => {
  return calendarCells.value
    .filter(c => c.inCurrentMonth)
    .flatMap(c => c.items)
    .filter(i => i.type === 'proker').length
})

const freeDaysCount = computed(() => {
  return calendarCells.value.filter(c => c.inCurrentMonth && c.items.length === 0).length
})

function onCellClick(cell) {
  if (cell.inCurrentMonth) {
    selectedCell.value = cell
  }
}

function formatTanggalFull(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border, #E2E8F0);
}

.grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  background: #FFF;
  min-height: 115px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.calendar-cell:hover {
  background: #F8FAFC;
}

.calendar-cell.other-month {
  background: #FAFAFA;
  opacity: 0.5;
}

.calendar-cell.is-today {
  background: #EFF6FF !important;
}

.calendar-cell.is-highlighted-free {
  background: #F0FDF4 !important;
  border: 1.5px dashed #22C55E;
}

.free-badge {
  font-size: 0.65rem;
  font-weight: 700;
  color: #16A34A;
  background: #DCFCE7;
  padding: 2px 6px;
  border-radius: 10px;
}

.event-badge {
  line-height: 1.2;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.event-badge:hover {
  transform: scale(1.02);
}

.btn-white {
  background: #fff;
}
</style>
