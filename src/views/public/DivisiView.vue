<template>
  <PublicNavbar />

  <header class="page-header" style="padding-bottom:80px">
    <div class="hero-shape shape-1" style="top:10%;right:5%"></div>
    <div class="hero-shape shape-2" style="bottom:10%;left:5%"></div>
    <div class="container">
      <h1 data-aos="fade-up">Divisi Himpunan Mahasiswa</h1>
      <p data-aos="fade-up" data-aos-delay="100">Kenali setiap divisi yang berperan dalam menjalankan program kerja organisasi.</p>
      <div class="breadcrumb-custom" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/">Beranda</router-link>
        <span><i class="bi bi-chevron-right" style="font-size:0.7rem"></i></span>
        <span>Divisi</span>
      </div>
    </div>
  </header>

  <!-- Overview Cards -->
  <section class="section-padding-sm" style="margin-top:-40px;position:relative;z-index:10">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Tujuh Divisi</span>
        <h2>Overview Divisi</h2>
        <p>Setiap divisi memiliki peran, koordinator, dan program kerja unik untuk menjalankan organisasi.</p>
      </div>
      <div class="row g-4">
        <div class="col-6 col-md-6 col-lg-3" v-for="(d, i) in divisionData" :key="d.id" data-aos="fade-up" :data-aos-delay="(i % 4) * 100">
          <div class="division-overview-card" @click="selectDivision(d.id)">
            <span class="division-color-badge" :style="{ position:'absolute', top:0, left:0, width:'100%', height:'5px', borderRadius:'20px 20px 0 0', background: d.color }"></span>
            <div class="ov-icon" :style="{ background: d.colorSoft, color: d.color }"><i :class="'bi ' + d.icon"></i></div>
            <h5>{{ d.name }}</h5>
            <p class="ov-desc">{{ d.desc }}</p>
            <div class="ov-coordinator">
              <div class="ov-coordinator-avatar" :style="{ background: d.color }">{{ getInitials(d.coordinator) }}</div>
              <div class="ov-coordinator-info">
                <div class="label">Koordinator</div>
                <div class="name">{{ d.coordinator }}</div>
              </div>
            </div>
            <div class="ov-footer">
              <span class="ov-members"><i class="bi bi-people"></i> {{ d.members }} anggota</span>
              <span class="btn btn-soft btn-sm">Lihat Detail <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Division Detail -->
  <section class="section-padding" id="divisionDetail" style="background:linear-gradient(180deg,#F8FAFC,#F1F5F9)">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Detail Divisi</span>
        <h2>Profil Divisi</h2>
        <p>Pilih divisi untuk melihat informasi lengkap, anggota, dan program kerja.</p>
      </div>

      <!-- Tabs -->
      <div class="division-tabs" data-aos="fade-up">
        <span class="division-tab" v-for="d in divisionData" :key="d.id" :class="{ active: selected === d.id }" @click="selected = d.id">
          <span class="tab-dot" :style="{ background: d.color }"></span> {{ d.name }}
        </span>
      </div>

      <!-- Banner -->
      <div v-if="current" class="division-banner" :style="{ background: 'linear-gradient(135deg,' + current.color + ',' + current.color + 'DD)' }" data-aos="zoom-in">
        <div class="division-banner-logo" style="background:rgba(255,255,255,0.2);backdrop-filter:blur(10px)"><i :class="'bi ' + current.icon"></i></div>
        <div class="division-banner-info">
          <h2>{{ current.fullName }}</h2>
          <p>{{ current.desc }}</p>
          <div class="banner-meta">
            <span class="banner-meta-item"><i class="bi bi-person-badge"></i> {{ current.coordinator }}</span>
            <span class="banner-meta-item"><i class="bi bi-people"></i> {{ current.members }} Anggota</span>
            <span class="banner-meta-item"><i class="bi bi-calendar-event"></i> Berdiri {{ current.established }}</span>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div v-if="current" class="row g-4 mt-1">
        <div class="col-lg-4" data-aos="fade-up">
          <div class="division-info-card">
            <div class="info-icon" :style="{ background: current.colorLight, color: current.color }"><i class="bi bi-eye"></i></div>
            <h5>Visi</h5>
            <p>{{ current.vision }}</p>
          </div>
        </div>
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="division-info-card">
            <div class="info-icon" :style="{ background: current.colorLight, color: current.color }"><i class="bi bi-bullseye"></i></div>
            <h5>Misi</h5>
            <p>{{ current.mission }}</p>
          </div>
        </div>
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="division-info-card">
            <div class="info-icon" :style="{ background: current.colorLight, color: current.color }"><i class="bi bi-person-badge"></i></div>
            <h5>Kepengurusan</h5>
            <ul>
              <li><i class="bi bi-check-circle"></i> Koordinator: <strong>{{ current.coordinator }}</strong></li>
              <li><i class="bi bi-check-circle"></i> Wakil: <strong>{{ current.viceCoordinator }}</strong></li>
              <li><i class="bi bi-check-circle"></i> Total Anggota: <strong>{{ current.members }}</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        <h2>Ingin mengetahui seluruh program kerja divisi?</h2>
        <p>Lihat program kerja lengkap dari setiap divisi dan pantau progress pelaksanaannya.</p>
        <router-link to="/proker" class="btn btn-light btn-lg"><i class="bi bi-journal-check"></i> Lihat Program Kerja</router-link>
      </div>
    </div>
  </section>

  <PublicFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { getDivisions } from '@/services/api'

const selected = ref('KWSB')

function getInitials(name) {
  if (!name) return 'U'
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function selectDivision(id) {
  selected.value = id
  const el = document.querySelector('#divisionDetail')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const initialDivisionData = [
  { id: 'KWSB', name: 'KWSB', fullName: 'Ketertiban, Wewenang & Badan Pengawas', icon: 'bi-shield-check', color: '#2563EB', colorLight: '#DBEAFE', colorSoft: '#EFF6FF', desc: 'Pengawasan kepatuhan terhadap AD/ART dan evaluasi kinerja pengurus organisasi.', vision: 'Menjadi badan pengawas yang independen, adil, dan transparan.', mission: 'Melakukan evaluasi berkala dan menegakkan disiplin organisasi.', coordinator: 'Rizki Maulana', viceCoordinator: 'Andini Putri Maharani', members: 8, established: 2018 },
  { id: 'Internal', name: 'Internal', fullName: 'Hubungan Internal & Kaderisasi', icon: 'bi-people-fill', color: '#22C55E', colorLight: '#DCFCE7', colorSoft: '#F0FDF4', desc: 'Mengelola hubungan antar anggota dan program kaderisasi.', vision: 'Membangun solidaritas dan kekeluargaan antar anggota.', mission: 'Menyelenggarakan kaderisasi, gathering, dan pengembangan kapasitas.', coordinator: 'Dewi Anjani', viceCoordinator: 'Reza Pratama Adi', members: 12, established: 2017 },
  { id: 'Eksternal', name: 'Eksternal', fullName: 'Hubungan Eksternal & Kemitraan', icon: 'bi-globe2', color: '#F97316', colorLight: '#FFEDD5', colorSoft: '#FFF7ED', desc: 'Membangun jejaring dan kerja sama dengan pihak eksternal.', vision: 'Menjadi jembatan strategis antara himpunan dan industri.', mission: 'Membangun kemitraan dan menghadirkan peluang magang.', coordinator: 'Hendra Wijaya', viceCoordinator: 'Larasati Putri', members: 10, established: 2017 },
  { id: 'Minbak', name: 'Minbak', fullName: 'Minat & Bakat / Penatausahaan', icon: 'bi-journal-text', color: '#8B5CF6', colorLight: '#EDE9FE', colorSoft: '#F5F3FF', desc: 'Penatausahaan administrasi dan pengembangan minat bakat.', vision: 'Menjadi pusat penatausahaan yang rapi dan kreatif.', mission: 'Mengelola administrasi dan menyelenggarakan kegiatan minat-bakat.', coordinator: 'Sari Wulandari', viceCoordinator: 'Taufik Hidayat', members: 9, established: 2018 },
  { id: 'Sosma', name: 'Sosma', fullName: 'Sosial Masyarakat', icon: 'bi-heart-pulse', color: '#EF4444', colorLight: '#FEE2E2', colorSoft: '#FEF2F2', desc: 'Pengembangan sosial masyarakat dan kegiatan pengabdian.', vision: 'Menjadi agen perubahan sosial yang berkontribusi nyata.', mission: 'Menyelenggarakan bakti sosial dan program pengabdian.', coordinator: 'Bayu Setiawan', viceCoordinator: 'Dina Aulia Rahman', members: 11, established: 2017 },
  { id: 'Infokom', name: 'Infokom', fullName: 'Informasi & Komunikasi', icon: 'bi-broadcast-pin', color: '#06B6D4', colorLight: '#CFFAFE', colorSoft: '#ECFEFF', desc: 'Informasi, publikasi, dan pengelolaan sistem teknologi komunikasi.', vision: 'Menjadi pusat informasi yang cepat, akurat, dan kreatif.', mission: 'Mengelola media sosial, website, dan dokumentasi visual.', coordinator: 'Nadia Pramita', viceCoordinator: 'Adit Pranata', members: 13, established: 2016 },
  { id: 'KWU', name: 'KWU', fullName: 'Kewirausahaan', icon: 'bi-bag-check', color: '#EAB308', colorLight: '#FEF3C7', colorSoft: '#FEFCE8', desc: 'Kewirausahaan dan pengembangan unit usaha organisasi.', vision: 'Menjadi inkubator kewirausahaan mahasiswa.', mission: 'Mengembangkan unit usaha dan menyelenggarakan pelatihan.', coordinator: 'Fajar Nugroho', viceCoordinator: 'Mega Lestari', members: 8, established: 2019 },
]

const divisionData = ref([...initialDivisionData])

onMounted(async () => {
  try {
    const res = await getDivisions()
    if (Array.isArray(res) && res.length > 0) {
      divisionData.value = res.map(d => ({
        id: d.id,
        name: d.name || d.nama,
        fullName: d.full_name || d.fullName || d.name,
        icon: d.icon || 'bi-diagram-3',
        color: d.color || '#2563EB',
        colorLight: d.color_light || d.colorLight || '#DBEAFE',
        colorSoft: d.color_soft || d.colorSoft || '#EFF6FF',
        desc: d.description || d.deskripsi || 'Divisi himpunan mahasiswa',
        vision: d.vision || 'Menjadi divisi yang tangguh, profesional, dan berintegritas.',
        mission: d.mission || 'Melaksanakan program kerja divisi dengan penuh tanggung jawab.',
        coordinator: d.coordinator || 'Belum ditentukan',
        viceCoordinator: d.vice_coordinator || 'Belum ditentukan',
        members: Array.isArray(d.members) ? d.members.length : (d.members_count || 0),
        established: d.established_year || 2018
      }))
      if (divisionData.value.length > 0) {
        selected.value = divisionData.value[0].id
      }
    }
  } catch (err) {
    console.warn('Backend API getDivisions error:', err.message)
  }
})

const current = computed(() => divisionData.value.find(d => String(d.id) === String(selected.value)) || divisionData.value[0])
</script>
