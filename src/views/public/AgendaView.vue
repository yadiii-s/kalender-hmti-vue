<template>
  <PublicNavbar />

  <header class="page-header">
    <div class="hero-shape shape-1" style="top:10%;right:5%"></div>
    <div class="hero-shape shape-2" style="bottom:10%;left:5%"></div>
    <div class="container">
      <h1 data-aos="fade-up">Agenda & Kalender Kegiatan</h1>
      <p data-aos="fade-up" data-aos-delay="100">Lihat jadwal kegiatan, program kerja, dan agenda himpunan mahasiswa secara interaktif.</p>
      <div class="breadcrumb-custom" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/">Beranda</router-link>
        <span><i class="bi bi-chevron-right" style="font-size:0.7rem"></i></span>
        <span>Agenda</span>
      </div>
    </div>
  </header>

  <section class="section-padding">
    <div class="container">
      <div class="text-center section-heading mb-4" data-aos="fade-up">
        <span class="eyebrow">Jadwal & Agenda</span>
        <h2>Kalender & Agenda Himpunan</h2>
        <p>Pantau seluruh kegiatan yang sedang berlangsung dan yang akan datang melalui tampilan kalender interaktif.</p>

        <!-- View Mode Switcher -->
        <div class="d-inline-flex bg-light p-1 rounded-pill border shadow-sm mt-3">
          <button 
            class="btn rounded-pill px-4 btn-sm fw-semibold transition-all"
            :class="viewMode === 'calendar' ? 'btn-primary shadow-sm' : 'btn-light text-muted'"
            @click="viewMode = 'calendar'"
          >
            <i class="bi bi-calendar3 me-2"></i>Tampilan Kalender
          </button>
          <button 
            class="btn rounded-pill px-4 btn-sm fw-semibold transition-all"
            :class="viewMode === 'list' ? 'btn-primary shadow-sm' : 'btn-light text-muted'"
            @click="viewMode = 'list'"
          >
            <i class="bi bi-grid-3x3-gap me-2"></i>Tampilan Kartu / List
          </button>
        </div>
      </div>

      <!-- ==================== VIEW MODE 1: CALENDAR VIEW ==================== -->
      <div v-if="viewMode === 'calendar'" data-aos="fade-up">
        <!-- Controls & Filter Bar -->
        <div class="card border-0 shadow-sm rounded-4 mb-4">
          <div class="card-body p-3 p-md-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
            
            <!-- Month Navigation -->
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-light btn-sm rounded-circle shadow-sm" style="width:38px;height:38px" @click="changeMonth(-1)" title="Bulan Sebelumnya">
                <i class="bi bi-chevron-left fs-6"></i>
              </button>
              <h5 class="mb-0 fw-bold px-2 text-primary" style="min-width: 180px; text-align: center;">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </h5>
              <button class="btn btn-light btn-sm rounded-circle shadow-sm" style="width:38px;height:38px" @click="changeMonth(1)" title="Bulan Selanjutnya">
                <i class="bi bi-chevron-right fs-6"></i>
              </button>
              <button class="btn btn-soft-primary btn-sm rounded-pill px-3 ms-2 fw-semibold" @click="goToToday">
                Hari Ini
              </button>
            </div>

            <!-- Type Filter & Division Filter -->
            <div class="d-flex flex-wrap align-items-center gap-2">
              <!-- Type Filter -->
              <div class="btn-group btn-group-sm rounded-pill p-1 bg-light border">
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
              <select class="form-select form-select-sm rounded-pill shadow-sm" v-model="filterDivision" style="width: 160px;">
                <option value="all">Semua Divisi</option>
                <option v-for="d in divisionsList" :key="d.name" :value="d.name">{{ d.name }}</option>
              </select>

              <!-- Free Highlight Toggle -->
              <button 
                class="btn btn-sm rounded-pill px-3 fw-semibold shadow-sm"
                :class="showFreeHighlight ? 'btn-success text-white' : 'btn-outline-success'"
                @click="showFreeHighlight = !showFreeHighlight"
              >
                <i class="bi bi-magic me-1"></i> Tanggal Free
              </button>
            </div>

            <!-- Summary Stats -->
            <div class="d-flex gap-2 gap-md-3 text-center">
              <div class="px-3 py-1.5 rounded-3 bg-light border">
                <div class="fw-bold text-primary fs-6">{{ currentMonthAgendaCount }}</div>
                <div class="text-muted" style="font-size:0.72rem">Agenda Bulan Ini</div>
              </div>
              <div class="px-3 py-1.5 rounded-3 bg-light border">
                <div class="fw-bold text-warning fs-6">{{ currentMonthProkerCount }}</div>
                <div class="text-muted" style="font-size:0.72rem">Proker Bulan Ini</div>
              </div>
              <div class="px-3 py-1.5 rounded-3 bg-light border">
                <div class="fw-bold text-success fs-6">{{ freeDaysCount }}</div>
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
            class="badge rounded-pill px-3 py-1.5"
            :style="{ background: div.bg || '#EFF6FF', color: div.color || '#2563EB', border: '1px solid ' + (div.color || '#2563EB') }"
          >
            {{ div.name }}
          </span>
          <span class="badge rounded-pill px-3 py-1.5 bg-success-subtle text-success border border-success">
            <i class="bi bi-check-circle-fill me-1"></i>FREE (Bebas Agenda & Proker)
          </span>
        </div>

        <!-- CALENDAR GRID -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2 text-muted small">Memuat kalender agenda & proker...</p>
        </div>

        <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <!-- Days of Week Header -->
          <div class="grid-header bg-light border-bottom text-center fw-bold py-2.5 text-secondary small">
            <div class="text-danger">Minggu</div>
            <div>Senin</div>
            <div>Selasa</div>
            <div>Rabu</div>
            <div>Kamis</div>
            <div>Jumat</div>
            <div class="text-primary">Sabtu</div>
          </div>

          <!-- Days Cells Grid -->
          <div class="calendar-grid">
            <div 
              v-for="(cell, i) in calendarCells" 
              :key="i" 
              class="calendar-cell p-2 d-flex flex-column justify-content-between position-relative"
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
              <div class="cell-events flex-grow-1 overflow-auto" style="max-height: 95px;">
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
      </div>

      <!-- ==================== VIEW MODE 2: CARD / LIST VIEW ==================== -->
      <div v-else-if="viewMode === 'list'" data-aos="fade-up">
        <!-- Division Filter Bar -->
        <div class="filter-bar d-flex flex-wrap gap-2 mb-4">
          <span class="filter-chip" :class="{ active: filterListDivision === 'all' }" @click="filterListDivision = 'all'">Semua Divisi</span>
          <span class="filter-chip" :class="{ active: filterListDivision === div.name }" v-for="div in divisionsList" :key="div.name" @click="filterListDivision = div.name">{{ div.name }}</span>
        </div>

        <!-- Events List Cards -->
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(evt, i) in filteredListEvents" :key="i" data-aos="fade-up" :data-aos-delay="(i % 3) * 100">
            <div class="event-card">
              <div class="event-image" :style="{ background: 'linear-gradient(135deg,' + getDivStyle(evt.division).bg + ',#ffffff)' }">
                <i :class="evt.type === 'proker' ? 'bi bi-journal-check' : 'bi bi-calendar2-event'" :style="{ color: getDivStyle(evt.division).color }"></i>
                <StatusBadge :status="evt.status || 'Mendatang'" />
              </div>
              <div class="event-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <DivisionBadge :division="evt.division" />
                  <span class="badge rounded-pill" :class="evt.type === 'proker' ? 'bg-warning text-dark' : 'bg-primary'">
                    {{ evt.type === 'proker' ? 'Proker' : 'Agenda' }}
                  </span>
                </div>
                <h5 class="fw-bold">{{ evt.title }}</h5>
                <div class="event-meta mt-3">
                  <div class="event-meta-item"><i class="bi bi-calendar3"></i> {{ formatTanggalFull(evt.dateStr) || evt.dateStr }}</div>
                  <div class="event-meta-item" v-if="evt.pic"><i class="bi bi-person"></i> PIC: {{ evt.pic }}</div>
                  <div class="event-meta-item" v-if="evt.location"><i class="bi bi-geo-alt"></i> {{ evt.location }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!filteredListEvents.length" class="empty-state">
          <div class="empty-state-icon"><i class="bi bi-calendar-x"></i></div>
          <h5>Belum Ada Kegiatan</h5>
          <p>Belum ada agenda atau proker untuk filter divisi yang dipilih.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        <h2>Ingin Mengelola Kegiatan & Agenda?</h2>
        <p>Masuk ke dashboard admin untuk menambah, mengubah, dan memantau seluruh agenda himpunan.</p>
        <router-link to="/login" class="btn btn-light btn-lg"><i class="bi bi-box-arrow-in-right me-2"></i> Masuk Dashboard</router-link>
      </div>
    </div>
  </section>

  <!-- ==================== DAY OVERVIEW MODAL ==================== -->
  <div v-if="selectedCell" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.55); backdrop-filter: blur(5px); z-index: 1060;">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg" style="border-radius:24px">
        
        <!-- Modal Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-primary">
            <i class="bi bi-calendar-event me-2 text-primary"></i>
            Agenda & Proker — {{ formatTanggalFull(selectedCell.dateStr) }}
          </h5>
          <button type="button" class="btn-close" @click="selectedCell = null"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-4" style="max-height: 70vh; overflow-y: auto;">
          
          <!-- Conflict Warning Alert -->
          <div v-if="selectedCell.hasConflict" class="alert alert-warning border-0 shadow-sm rounded-4 mb-4 p-3 d-flex align-items-start gap-3">
            <i class="bi bi-exclamation-triangle-fill fs-3 text-warning flex-shrink-0"></i>
            <div>
              <strong class="d-block text-dark">Peringatan Jadwal Bentrok / Tabrakan!</strong>
              <span class="small text-muted">Terdapat {{ selectedCell.items.length }} agenda/proker dari divisi berbeda pada tanggal yang sama. Harap perhatikan koordinasi penggunaan waktu & tempat.</span>
            </div>
          </div>

          <!-- Free Date Indicator -->
          <div v-if="selectedCell.items.length === 0" class="text-center py-5 bg-light rounded-4 mb-2">
            <div class="free-icon-wrapper mb-3">
              <i class="bi bi-calendar-check text-success display-4"></i>
            </div>
            <h5 class="fw-bold text-success">Tanggal Ini Bebas Agenda & Proker (FREE)!</h5>
            <p class="text-muted small mb-0" style="max-width: 420px; margin: 0 auto;">
              Tidak ada kegiatan atau program kerja divisi yang terjadwal di tanggal ini. Tanggal ini dapat digunakan untuk agenda baru.
            </p>
          </div>

          <!-- Scheduled Items List -->
          <div v-else class="mb-2">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0 text-muted small text-uppercase">AGENDA & PROKER TERJADWAL ({{ selectedCell.items.length }})</h6>
              <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-1">{{ formatTanggalShort(selectedCell.dateStr) }}</span>
            </div>
            
            <div 
              v-for="item in selectedCell.items" 
              :key="item.type + '-' + item.id" 
              class="p-3.5 mb-3 rounded-4 border shadow-sm transition-all"
              :style="{ background: getDivStyle(item.division).bg }"
            >
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <span class="badge rounded-pill px-3 py-1" :style="{ background: getDivStyle(item.division).color, color: '#fff' }">
                      {{ item.division }}
                    </span>
                    <span class="badge rounded-pill px-3 py-1" :class="item.type === 'proker' ? 'bg-warning text-dark' : 'bg-primary'">
                      <i :class="item.type === 'proker' ? 'bi bi-journal-check me-1' : 'bi bi-calendar-event me-1'"></i>
                      {{ item.type === 'proker' ? 'Program Kerja' : 'Agenda Himpunan' }}
                    </span>
                    <span class="badge bg-white text-dark border shadow-sm px-2.5 py-1">{{ item.status || 'Mendatang' }}</span>
                  </div>

                  <h5 class="fw-bold mb-1 text-dark">{{ item.title }}</h5>
                  
                  <div class="d-flex flex-wrap gap-3 small text-muted mt-2">
                    <span v-if="item.pic"><i class="bi bi-person me-1 text-primary"></i>PIC: <strong>{{ item.pic }}</strong></span>
                    <span v-if="item.location"><i class="bi bi-geo-alt me-1 text-danger"></i>Lokasi: <strong>{{ item.location }}</strong></span>
                    <span v-if="item.progress !== undefined && item.type === 'proker'"><i class="bi bi-bar-chart me-1 text-success"></i>Progress: <strong>{{ item.progress }}%</strong></span>
                  </div>

                  <p v-if="item.description" class="small text-secondary mb-0 mt-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-0 bg-light px-4 py-3" style="border-bottom-left-radius:24px; border-bottom-right-radius:24px;">
          <button type="button" class="btn btn-secondary rounded-pill px-4 fw-semibold" @click="selectedCell = null">Tutup</button>
        </div>

      </div>
    </div>
  </div>

  <PublicFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import DivisionBadge from '@/components/shared/DivisionBadge.vue'
import { 
  getDivisions, 
  getEvents, 
  getWorkPrograms, 
  formatTanggalShort 
} from '@/services/api'

const viewMode = ref('calendar') // 'calendar' or 'list'
const filterType = ref('all') // 'all', 'agenda', 'proker'
const filterDivision = ref('all')
const filterListDivision = ref('all')
const showFreeHighlight = ref(false)
const selectedCell = ref(null)
const loading = ref(true)

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

// Fallback items generator for initial rich calendar display
function generateFallbackItems() {
  const year = currentYear.value
  const monthStr = String(currentMonth.value + 1).padStart(2, '0')
  return [
    {
      type: 'agenda',
      id: 1,
      title: 'Workshop Desain UI/UX untuk Mahasiswa',
      division: 'Infokom',
      dateStr: `${year}-${monthStr}-05`,
      pic: 'Divisi Infokom',
      location: 'Lab Komputer 2',
      status: 'Mendatang',
      description: 'Pelatihan dasar hingga lanjut UI/UX design menggunakan Figma untuk seluruh mahasiswa.'
    },
    {
      type: 'agenda',
      id: 2,
      title: 'Rapat Pleno Evaluasi Semester',
      division: 'Internal',
      dateStr: `${year}-${monthStr}-10`,
      pic: 'Sekretaris Umum',
      location: 'Ruang Rapat Utama',
      status: 'Berlangsung',
      description: 'Evaluasi program kerja yang telah terlaksana selama setengah periode pengurusan.'
    },
    {
      type: 'proker',
      id: 3,
      title: 'Pelatihan Leadership & Team Building',
      division: 'Internal',
      dateStr: `${year}-${monthStr}-10`,
      pic: 'Ketua Divisi Internal',
      progress: 65,
      status: 'Berlangsung',
      description: 'Mengasah kemampuan kepemimpinan pengurus himpunan.'
    },
    {
      type: 'agenda',
      id: 4,
      title: 'Seminar Karier & Magang Industri 2026',
      division: 'Eksternal',
      dateStr: `${year}-${monthStr}-15`,
      pic: 'Divisi Eksternal',
      location: 'Auditorium Kampus',
      status: 'Mendatang',
      description: 'Seminar nasional menghadirkan praktisi IT ternama dari perusahaan teknologi besar.'
    },
    {
      type: 'proker',
      id: 5,
      title: 'Company Visit ke Tech Startup',
      division: 'Eksternal',
      dateStr: `${year}-${monthStr}-18`,
      pic: 'Koor Eksternal',
      progress: 40,
      status: 'Perencanaan',
      description: 'Kunjungan edukatif ke kantor unicorn lokal.'
    },
    {
      type: 'agenda',
      id: 6,
      title: 'Bakti Sosial & Donor Darah Terbuka',
      division: 'Sosma',
      dateStr: `${year}-${monthStr}-22`,
      pic: 'Divisi Sosma',
      location: 'Halaman Utama Kampus',
      status: 'Mendatang',
      description: 'Kegiatan pengabdian masyarakat bekerjasama dengan PMI Kota.'
    },
    {
      type: 'agenda',
      id: 7,
      title: 'Bazaar Kewirausahaan Mahasiswa',
      division: 'KWU',
      dateStr: `${year}-${monthStr}-25`,
      pic: 'Divisi KWU',
      location: 'Plaza Kampus',
      status: 'Mendatang',
      description: 'Pameran dan penjualan produk kreatif karya mahasiswa Informatika.'
    },
    {
      type: 'proker',
      id: 8,
      title: 'Kompetisi E-Sport Himpunan',
      division: 'Minbak',
      dateStr: `${year}-${monthStr}-28`,
      pic: 'Divisi Minbak',
      progress: 80,
      status: 'Persiapan',
      description: 'Turnamen Mobile Legends dan Valorant antar angkatan.'
    }
  ]
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
              dateStr: dateStr || `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-15`,
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
      const fallbacks = generateFallbackItems()
      fallbacks.forEach(e => {
        const startStr = normalizeDateStr(e.dateStr || e.start_time || e.date)
        const endStr = normalizeDateStr(e.end_time || e.end_date || startStr)
        items.push({
          type: 'agenda',
          id: e.id,
          title: e.title,
          division: e.division,
          dateStr: startStr,
          startDate: startStr,
          endDate: endStr,
          pic: e.pic,
          location: e.location,
          status: e.status,
          description: e.description
        })
      })
    }

    // Standalone Work Programs
    if (wRes.status === 'fulfilled' && Array.isArray(wRes.value) && wRes.value.length > 0) {
      wRes.value.forEach(wp => {
        const divName = wp.division_name || (typeof wp.division === 'string' ? wp.division : wp.division?.name) || 'Internal'
        const dateStr = normalizeDateStr(wp.date)
        if (!items.some(i => i.type === 'proker' && i.title === wp.name && i.division === divName)) {
          items.push({
            type: 'proker',
            id: wp.id || Date.now(),
            title: wp.name || wp.title,
            division: divName,
            dateStr: dateStr || `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-20`,
            pic: wp.pic || 'Pengurus Divisi',
            progress: wp.progress || 0,
            status: wp.status || 'Perencanaan',
            description: ''
          })
        }
      })
    }
  } catch (err) {
    console.warn('Error loading public calendar items:', err)
  } finally {
    if (items.length === 0) {
      allCalendarItems.value = generateFallbackItems()
    } else {
      allCalendarItems.value = items
    }
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

/* ── Calendar Grid Computation ────────────────────────────────────────────── */
const calendarCells = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const todayObj = new Date()
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`
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

  // Next month leading days to complete grid (42 cells total)
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
    if (filterType.value !== 'all' && item.type !== filterType.value) return false
    if (filterDivision.value !== 'all' && item.division !== filterDivision.value) return false
    if (item.startDate && item.endDate) {
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
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

const filteredListEvents = computed(() => {
  if (filterListDivision.value === 'all') return allCalendarItems.value
  return allCalendarItems.value.filter(e => e.division === filterListDivision.value)
})
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease;
}

.btn-white {
  background: #ffffff;
}

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
  background: #ffffff;
  min-height: 120px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.calendar-cell:hover {
  background: #F8FAFC;
  box-shadow: inset 0 0 0 2px var(--bs-primary);
}

.calendar-cell.other-month {
  background: #FAFAFA;
  opacity: 0.45;
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
  line-height: 1.25;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.event-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

@media (max-width: 768px) {
  .calendar-cell {
    min-height: 85px;
    padding: 4px !important;
  }
  .event-badge span {
    display: none;
  }
}
</style>
