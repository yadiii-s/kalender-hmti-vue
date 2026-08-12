<template>
  <PublicNavbar />

  <header class="page-header">
    <div class="hero-shape shape-1" style="top:10%;right:5%"></div>
    <div class="hero-shape shape-2" style="bottom:10%;left:5%"></div>
    <div class="container">
      <h1 data-aos="fade-up">Program Kerja</h1>
      <p data-aos="fade-up" data-aos-delay="100">Telusuri seluruh program kerja dari setiap divisi himpunan mahasiswa.</p>
      <div class="breadcrumb-custom" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/">Beranda</router-link>
        <span><i class="bi bi-chevron-right" style="font-size:0.7rem"></i></span>
        <span>Program Kerja</span>
      </div>
    </div>
  </header>

  <!-- Stats Overview -->
  <section class="section-padding-sm" style="margin-top:-32px; position:relative; z-index:10;">
    <div class="container">
      <div class="row g-4">
        <div class="col-6 col-lg-3" v-for="(stat, i) in statsCards" :key="i" data-aos="fade-up" :data-aos-delay="i * 80">
          <div class="stat-card text-center" style="padding: 24px 16px;">
            <div class="stat-icon mx-auto mb-2" :style="stat.iconStyle"><i :class="'bi ' + stat.icon"></i></div>
            <div class="stat-number">{{ stat.value }}</div>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="section-padding" style="background: linear-gradient(180deg, #F8FAFC, #F1F5F9);">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Semua Program Kerja</span>
        <h2>Daftar Program Kerja Divisi</h2>
        <p>Pantau seluruh program kerja yang sedang berjalan, mendatang, dan telah selesai.</p>
      </div>

      <!-- Filter Bar -->
      <div class="row g-3 mb-4" data-aos="fade-up">
        <!-- Search -->
        <div class="col-lg-5">
          <div class="position-relative">
            <i class="bi bi-search" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); z-index: 2;"></i>
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              placeholder="Cari program kerja, PIC, atau divisi..."
              style="padding-left: 44px; border-radius: 14px; height: 48px; border: 1.5px solid var(--border); background: var(--card);"
            />
          </div>
        </div>
        <!-- Division Filter -->
        <div class="col-lg-4">
          <div class="filter-bar d-flex flex-wrap gap-2">
            <span class="filter-chip" :class="{ active: filterDivision === 'all' }" @click="filterDivision = 'all'">Semua</span>
            <span class="filter-chip" :class="{ active: filterDivision === d.name }" v-for="d in divisionList" :key="d.name" @click="filterDivision = d.name">{{ d.name }}</span>
          </div>
        </div>
        <!-- Status Filter -->
        <div class="col-lg-3">
          <select v-model="filterStatus" class="form-select" style="border-radius: 14px; height: 48px; border: 1.5px solid var(--border); background: var(--card);">
            <option value="all">Semua Status</option>
            <option value="Mendatang">Mendatang</option>
            <option value="Berlangsung">Berlangsung</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-5" data-aos="fade-up">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">Memuat program kerja...</p>
      </div>

      <!-- Program Kerja Cards -->
      <div v-else-if="filteredPrograms.length > 0" class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="(wp, i) in filteredPrograms" :key="wp.id" data-aos="fade-up" :data-aos-delay="(i % 3) * 100">
          <div class="proker-card" @click="openDetail(wp)">
            <!-- Color accent top bar -->
            <div class="proker-accent" :style="{ background: getDivColor(wp.division_name) }"></div>

            <div class="proker-body">
              <!-- Division & Status -->
              <div class="d-flex justify-content-between align-items-start mb-3">
                <DivisionBadge :division="wp.division_name" />
                <StatusBadge :status="wp.status || 'Mendatang'" />
              </div>

              <!-- Name -->
              <h5 class="proker-title">{{ wp.name }}</h5>

              <!-- Meta -->
              <div class="proker-meta">
                <div class="proker-meta-item">
                  <i class="bi bi-calendar3"></i>
                  <span>{{ wp.date || '-' }}</span>
                </div>
                <div class="proker-meta-item">
                  <i class="bi bi-person-badge"></i>
                  <span>{{ wp.pic || 'Belum ditentukan' }}</span>
                </div>
              </div>

              <!-- Progress -->
              <div class="proker-progress-section mt-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="proker-progress-label">Progress</span>
                  <span class="proker-progress-value" :style="{ color: getDivColor(wp.division_name) }">{{ wp.progress || 0 }}%</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 8px; background: var(--border);">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="{ width: (wp.progress || 0) + '%', background: getDivColor(wp.division_name), borderRadius: '8px' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state" data-aos="fade-up">
        <div class="empty-state-icon"><i class="bi bi-journal-x"></i></div>
        <h5>Tidak Ada Program Kerja</h5>
        <p>Belum ada program kerja yang sesuai dengan filter yang dipilih.</p>
      </div>
    </div>
  </section>

  <!-- Detail Modal -->
  <div class="modal fade" id="prokerDetailModal" tabindex="-1" ref="detailModalRef">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
        <div v-if="selectedWP" class="modal-header text-white py-4 px-4" :style="{ background: 'linear-gradient(135deg, ' + getDivColor(selectedWP.division_name) + ', ' + getDivColor(selectedWP.division_name) + 'CC)' }">
          <div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-white bg-opacity-25 px-3 py-2" style="border-radius: 20px; font-size: 0.8rem;">
                <i class="bi bi-diagram-3 me-1"></i> {{ selectedWP.division_name || 'Divisi' }}
              </span>
              <span class="badge bg-white bg-opacity-25 px-3 py-2" style="border-radius: 20px; font-size: 0.8rem;">
                {{ selectedWP.status || 'Mendatang' }}
              </span>
            </div>
            <h4 class="modal-title fw-bold mb-0">{{ selectedWP.name }}</h4>
          </div>
          <button type="button" class="btn-close btn-close-white" @click="closeDetail"></button>
        </div>
        <div v-if="selectedWP" class="modal-body p-4">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-light-subtle border">
                <div class="text-muted small mb-1"><i class="bi bi-building me-1"></i> Divisi</div>
                <div class="fw-bold">{{ selectedWP.division_full_name || selectedWP.division_name }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-light-subtle border">
                <div class="text-muted small mb-1"><i class="bi bi-person-badge me-1"></i> Penanggung Jawab (PIC)</div>
                <div class="fw-bold">{{ selectedWP.pic || 'Belum ditentukan' }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-light-subtle border">
                <div class="text-muted small mb-1"><i class="bi bi-calendar-event me-1"></i> Waktu Pelaksanaan</div>
                <div class="fw-bold">{{ selectedWP.date || '-' }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-light-subtle border">
                <div class="text-muted small mb-1"><i class="bi bi-flag me-1"></i> Status</div>
                <div class="fw-bold">
                  <StatusBadge :status="selectedWP.status || 'Mendatang'" />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="text-muted small mb-2"><i class="bi bi-bar-chart me-1"></i> Progress Pelaksanaan</div>
              <div class="d-flex align-items-center gap-3">
                <div class="progress flex-grow-1" style="height: 16px; border-radius: 12px; background: var(--border);">
                  <div
                    class="progress-bar"
                    :style="{ width: (selectedWP.progress || 0) + '%', background: getDivColor(selectedWP.division_name), borderRadius: '12px', transition: 'width 0.8s ease' }"
                  ></div>
                </div>
                <span class="fw-bold fs-5" :style="{ color: getDivColor(selectedWP.division_name) }">{{ selectedWP.progress || 0 }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        <h2>Ingin melihat agenda kegiatan lengkap?</h2>
        <p>Kunjungi halaman agenda untuk melihat semua kegiatan himpunan mahasiswa.</p>
        <router-link to="/agenda" class="btn btn-light btn-lg"><i class="bi bi-calendar2-week"></i> Lihat Agenda</router-link>
      </div>
    </div>
  </section>

  <PublicFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import DivisionBadge from '@/components/shared/DivisionBadge.vue'
import { getWorkPrograms, getDivisions } from '@/services/api'

const DIVISION_COLORS = {
  KWSB: '#2563EB',
  Internal: '#22C55E',
  Eksternal: '#F97316',
  Minbak: '#8B5CF6',
  Sosma: '#EF4444',
  Infokom: '#06B6D4',
  KWU: '#EAB308',
}

function getDivColor(name) {
  return DIVISION_COLORS[name] || '#2563EB'
}

const loading = ref(true)
const searchQuery = ref('')
const filterDivision = ref('all')
const filterStatus = ref('all')
const allPrograms = ref([])
const divisionList = ref([])
const selectedWP = ref(null)
const detailModalRef = ref(null)

// Initial / fallback data
const initialPrograms = [
  { id: 1, division_name: 'Internal', division_full_name: 'Hubungan Internal & Kaderisasi', name: 'Kaderisasi Anggota Baru', date: 'September 2026', pic: 'Dewi Anjani', status: 'Mendatang', progress: 10 },
  { id: 2, division_name: 'Internal', division_full_name: 'Hubungan Internal & Kaderisasi', name: 'Gathering Himpunan', date: 'Juli 2026', pic: 'Dewi Anjani', status: 'Selesai', progress: 100 },
  { id: 3, division_name: 'KWU', division_full_name: 'Kewirausahaan', name: 'Workshop Kewirausahaan', date: 'September 2026', pic: 'Fajar Nugroho', status: 'Mendatang', progress: 30 },
  { id: 4, division_name: 'Sosma', division_full_name: 'Sosial Masyarakat', name: 'Bakti Sosial Semester Genap', date: 'Agustus 2026', pic: 'Bayu Setiawan', status: 'Berlangsung', progress: 65 },
  { id: 5, division_name: 'Infokom', division_full_name: 'Informasi & Komunikasi', name: 'Peluncuran Website HMJ', date: 'Agustus 2026', pic: 'Nadia Pramita', status: 'Berlangsung', progress: 80 },
  { id: 6, division_name: 'Eksternal', division_full_name: 'Hubungan Eksternal & Kemitraan', name: 'Seminar Karier Industri', date: 'Oktober 2026', pic: 'Hendra Wijaya', status: 'Mendatang', progress: 15 },
  { id: 7, division_name: 'Minbak', division_full_name: 'Minat & Bakat', name: 'Lomba Minat Bakat Mahasiswa', date: 'September 2026', pic: 'Sari Wulandari', status: 'Mendatang', progress: 5 },
  { id: 8, division_name: 'KWSB', division_full_name: 'Ketertiban, Wewenang & Badan Pengawas', name: 'Sidang Evaluasi Kinerja Semester', date: 'Agustus 2026', pic: 'Rizki Maulana', status: 'Mendatang', progress: 20 },
  { id: 9, division_name: 'Internal', division_full_name: 'Hubungan Internal & Kaderisasi', name: 'Upgrading Leadership Pengurus', date: 'November 2026', pic: 'Dewi Anjani', status: 'Mendatang', progress: 0 },
]

const initialDivisions = [
  { name: 'KWSB' }, { name: 'Internal' }, { name: 'Eksternal' }, { name: 'Minbak' },
  { name: 'Sosma' }, { name: 'Infokom' }, { name: 'KWU' },
]

// Stats
const statsCards = computed(() => {
  const total = allPrograms.value.length
  const selesai = allPrograms.value.filter(w => w.status === 'Selesai').length
  const berlangsung = allPrograms.value.filter(w => w.status === 'Berlangsung').length
  const avgProgress = total > 0
    ? Math.round(allPrograms.value.reduce((a, w) => a + (w.progress || 0), 0) / total)
    : 0
  return [
    { icon: 'bi-journal-check', iconStyle: { background: '#DBEAFE', color: '#2563EB' }, value: total, label: 'Total Program Kerja' },
    { icon: 'bi-play-circle', iconStyle: { background: '#D1FAE5', color: '#059669' }, value: berlangsung, label: 'Sedang Berlangsung' },
    { icon: 'bi-check-circle', iconStyle: { background: '#FEF3C7', color: '#D97706' }, value: selesai, label: 'Telah Selesai' },
    { icon: 'bi-bar-chart', iconStyle: { background: '#F3E8FF', color: '#9333EA' }, value: avgProgress + '%', label: 'Rata-rata Progress' },
  ]
})

// Filtered programs
const filteredPrograms = computed(() => {
  let list = allPrograms.value

  if (filterDivision.value !== 'all') {
    list = list.filter(w => w.division_name === filterDivision.value)
  }
  if (filterStatus.value !== 'all') {
    list = list.filter(w => w.status === filterStatus.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(w =>
      (w.name || '').toLowerCase().includes(q) ||
      (w.pic || '').toLowerCase().includes(q) ||
      (w.division_name || '').toLowerCase().includes(q) ||
      (w.division_full_name || '').toLowerCase().includes(q)
    )
  }

  return list
})

function openDetail(wp) {
  selectedWP.value = wp
  if (window.bootstrap && detailModalRef.value) {
    const modal = new window.bootstrap.Modal(detailModalRef.value)
    modal.show()
  }
}

function closeDetail() {
  if (window.bootstrap && detailModalRef.value) {
    const modal = window.bootstrap.Modal.getInstance(detailModalRef.value)
    if (modal) modal.hide()
  }
}

onMounted(async () => {
  loading.value = true

  const collectedProkers = []

  // Load divisions & embedded prokers
  try {
    const divs = await getDivisions()
    if (Array.isArray(divs) && divs.length > 0) {
      divisionList.value = divs.map(d => ({ name: d.name || d.nama }))
      
      divs.forEach(d => {
        if (Array.isArray(d.work_programs)) {
          d.work_programs.forEach(wp => {
            collectedProkers.push({
              id: wp.id,
              name: wp.name,
              date: wp.date || '2026',
              pic: wp.pic || d.coordinator || 'Pengurus',
              status: wp.status || 'Perencanaan',
              progress: wp.progress || 0,
              division_name: d.name || d.nama,
              division_full_name: d.full_name || d.name,
              description: `Program kerja divisi ${d.name}`
            })
          })
        }
      })
    }
  } catch (err) {
    console.warn('Backend API getDivisions error:', err.message)
  }

  // Load standalone work programs
  try {
    const wps = await getWorkPrograms()
    if (Array.isArray(wps) && wps.length > 0) {
      wps.forEach(wp => {
        const divName = wp.division_name || (typeof wp.division === 'string' ? wp.division : wp.division?.name) || 'Himpunan'
        if (!collectedProkers.some(p => p.id === wp.id && p.name === wp.name)) {
          collectedProkers.push({
            id: wp.id,
            name: wp.name || wp.title,
            date: wp.date || '-',
            pic: wp.pic || 'Pengurus Divisi',
            status: wp.status || 'Perencanaan',
            progress: wp.progress || 0,
            division_name: divName,
            division_full_name: wp.division_full_name || divName
          })
        }
      })
    }
  } catch (err) {
    console.warn('Backend API getWorkPrograms error:', err.message)
  }

  if (collectedProkers.length > 0) {
    allPrograms.value = collectedProkers
  }

  loading.value = false
})
</script>

<style scoped>
/* ── Proker Card ────────────────────────────────────────────────────── */
.proker-card {
  background: var(--card, #fff);
  border-radius: 18px;
  border: 1px solid var(--border, #E2E8F0);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.proker-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  border-color: transparent;
}

.proker-accent {
  height: 5px;
  width: 100%;
}

.proker-body {
  padding: 24px;
}

.proker-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--heading, #0F172A);
  margin-bottom: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.proker-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.proker-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-muted, #64748B);
}

.proker-meta-item i {
  font-size: 0.9rem;
  width: 18px;
  text-align: center;
}

.proker-progress-section {
  padding-top: 14px;
  border-top: 1px solid var(--border, #E2E8F0);
}

.proker-progress-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted, #64748B);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.proker-progress-value {
  font-size: 0.95rem;
  font-weight: 800;
}

/* ── Filter Bar scroll ──────────────────────────────────────────────── */
.filter-bar {
  overflow-x: auto;
  flex-wrap: nowrap !important;
  padding-bottom: 4px;
}

.filter-bar::-webkit-scrollbar {
  height: 4px;
}

.filter-bar::-webkit-scrollbar-track {
  background: transparent;
}

.filter-bar::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}

/* ── Modal fixes ────────────────────────────────────────────────────── */
.modal-content {
  border-radius: 20px;
}
</style>
