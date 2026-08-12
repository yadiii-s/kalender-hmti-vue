<template>
  <PublicNavbar />

  <!-- Hero Section -->
  <section class="hero" id="beranda">
    <div class="hero-shape shape-1"></div>
    <div class="hero-shape shape-2"></div>
    <div class="hero-shape shape-3"></div>
    <div class="hero-shape shape-4"></div>
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <span class="hero-badge animate__animated animate__fadeInDown">
            <i class="bi bi-stars"></i> Platform Manajemen Himpunan Mahasiswa
          </span>
          <h1 class="animate__animated animate__fadeInUp">
            Satu Platform untuk Mengelola Seluruh <span class="highlight">Kegiatan Himpunan Mahasiswa</span>
          </h1>
          <p class="lead animate__animated animate__fadeInUp animate__delay-1s">
            SIPMA HMJ membantu Anda menjadwalkan, memantau, dan mengelola seluruh agenda organisasi — dari rapat divisi hingga acara besar kampus — dalam satu tempat yang modern, cepat, dan kolaboratif.
          </p>
          <div class="hero-cta-group animate__animated animate__fadeInUp animate__delay-2s">
            <router-link to="/agenda" class="btn btn-primary btn-lg"><i class="bi bi-calendar3"></i> Lihat Kalender</router-link>
            <a href="#events" class="btn btn-outline-primary btn-lg"><i class="bi bi-arrow-right-circle"></i> Jelajahi Agenda</a>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-illustration" data-aos="zoom-in" data-aos-delay="300">
            <div class="hero-mockup">
              <div class="mockup-header">
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
                <span class="mockup-dot"></span>
              </div>
              <div class="mockup-calendar">
                <div class="mockup-cal-header">
                  <h6>Juli 2026</h6>
                  <div>
                    <i class="bi bi-chevron-left text-muted me-2"></i>
                    <i class="bi bi-chevron-right text-muted"></i>
                  </div>
                </div>
                <div class="mockup-cal-grid">
                  <div class="cal-day empty"></div><div class="cal-day empty"></div><div class="cal-day empty"></div>
                  <div class="cal-day">1</div><div class="cal-day">2</div><div class="cal-day">3</div><div class="cal-day">4</div>
                  <div class="cal-day event">5</div><div class="cal-day">6</div><div class="cal-day">7</div>
                  <div class="cal-day">8</div><div class="cal-day">9</div><div class="cal-day event">10</div>
                  <div class="cal-day">11</div><div class="cal-day active">12</div><div class="cal-day">13</div>
                  <div class="cal-day">14</div><div class="cal-day event">15</div><div class="cal-day">16</div>
                  <div class="cal-day">17</div><div class="cal-day">18</div><div class="cal-day">19</div><div class="cal-day">20</div>
                </div>
                <div class="mockup-event-list">
                  <div class="mockup-event-item">
                    <span class="event-dot" style="background:#22C55E"></span>
                    <strong>Rapat Pleno</strong> — 12 Jul, 14:00
                  </div>
                  <div class="mockup-event-item">
                    <span class="event-dot" style="background:#2563EB"></span>
                    <strong>Workshop UI/UX</strong> — 15 Jul, 09:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Statistics -->
  <section class="stats-section">
    <div class="container">
      <div class="row g-4">
        <div class="col-6 col-lg-3" v-for="(stat, i) in stats" :key="i" data-aos="fade-up" :data-aos-delay="i * 100">
          <div class="stat-card">
            <div class="stat-icon" :class="stat.iconClass"><i :class="'bi ' + stat.icon"></i></div>
            <div class="stat-number">{{ stat.value }}</div>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Upcoming Events -->
  <section class="section-padding" id="events">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Agenda Mendatang</span>
        <h2>Kegiatan yang Akan Datang</h2>
        <p>Pantau kegiatan terbaru dari setiap divisi dan jangan lewatkan kesempatan untuk berpartisipasi.</p>
      </div>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="(evt, i) in events" :key="i" data-aos="fade-up" :data-aos-delay="i * 100">
          <div class="event-card">
            <div class="event-image">
              <i :class="'bi ' + evt.icon"></i>
              <span class="status-badge" :class="evt.statusClass">{{ evt.status }}</span>
            </div>
            <div class="event-body">
              <span class="division-badge" :class="'div-' + evt.divisi">{{ evt.divisi }}</span>
              <h5>{{ evt.title }}</h5>
              <div class="event-meta">
                <div class="event-meta-item"><i class="bi bi-calendar3"></i> {{ evt.date }}</div>
                <div class="event-meta-item"><i class="bi bi-clock"></i> {{ evt.time }}</div>
                <div class="event-meta-item"><i class="bi bi-geo-alt"></i> {{ evt.location }}</div>
              </div>
              <router-link to="/agenda" class="btn btn-soft btn-sm w-100">Lihat Detail <i class="bi bi-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Division Preview -->
  <section class="section-padding" id="divisi" style="background:linear-gradient(180deg,#F8FAFC,#F1F5F9)">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Struktur Divisi</span>
        <h2>Tujuh Divisi, Satu Tujuan</h2>
        <p>Setiap divisi memiliki peran strategis untuk menjalankan roda organisasi himpunan mahasiswa.</p>
      </div>
      <div class="row g-4">
        <div class="col-6 col-md-6 col-lg-3" v-for="(div, i) in divisions" :key="i" data-aos="zoom-in" :data-aos-delay="(i % 4) * 100">
          <div class="division-card">
            <div class="division-icon" :style="{ background: div.bg, color: div.color }"><i :class="'bi ' + div.icon"></i></div>
            <h5>{{ div.name }}</h5>
            <p>{{ div.desc }}</p>
            <router-link to="/divisi" class="btn btn-outline-primary btn-sm">View Detail <i class="bi bi-arrow-right"></i></router-link>
          </div>
        </div>
        <!-- CTA Card -->
        <div class="col-6 col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
          <div class="division-card d-flex flex-column justify-content-center" style="background:linear-gradient(135deg,var(--primary),#1D4ED8);border:none">
            <i class="bi bi-grid-3x3-gap" style="font-size:2.5rem;color:#fff;margin-bottom:12px"></i>
            <h5 style="color:#fff">Lihat Semua</h5>
            <p style="color:rgba(255,255,255,0.85)">Jelajahi detail seluruh divisi dan program kerjanya.</p>
            <router-link to="/divisi" class="btn btn-outline-light btn-sm">Selengkapnya <i class="bi bi-arrow-right"></i></router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline Preview -->
  <section class="section-padding timeline-section" id="tentang">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Linimasa</span>
        <h2>Linimasa Kegiatan Organisasi</h2>
        <p>Pantau rangkaian kegiatan mendatang dari seluruh divisi dalam bentuk linimasa.</p>
      </div>
      <div class="timeline">
        <div class="timeline-item" v-for="(tl, i) in timeline" :key="i" data-aos="fade-left" :data-aos-delay="i * 100">
          <div class="timeline-dot" :class="tl.dotClass"><i class="bi bi-circle-fill"></i></div>
          <div class="timeline-content">
            <div class="timeline-date">{{ tl.date }}</div>
            <h5>{{ tl.title }}</h5>
            <p class="text-muted mb-0">{{ tl.desc }}</p>
            <div class="timeline-meta">
              <span><i class="bi bi-diagram-3"></i> {{ tl.divisi }}</span>
              <span><i :class="'bi bi-circle-fill ' + tl.statusColor"></i> {{ tl.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        <h2>Jelajahi Seluruh Agenda Organisasi</h2>
        <p>Lihat kalender lengkap seluruh kegiatan himpunan mahasiswa dan jangan lewatkan setiap acara penting.</p>
        <router-link to="/agenda" class="btn btn-light btn-lg"><i class="bi bi-calendar2-week"></i> Lihat Semua Agenda</router-link>
      </div>
    </div>
  </section>

  <PublicFooter />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
import { getEvents, getDivisions, formatTanggalShort } from '@/services/api'

const stats = ref([
  { icon: 'bi-calendar2-event', iconClass: 'primary', value: '120+', label: 'Total Kegiatan' },
  { icon: 'bi-diagram-3', iconClass: 'success', value: '7', label: 'Total Divisi' },
  { icon: 'bi-people', iconClass: 'warning', value: '250+', label: 'Anggota Aktif' },
  { icon: 'bi-graph-up-arrow', iconClass: 'danger', value: '86', label: 'Kegiatan Tahun Ini' },
])

const initialEvents = [
  { icon: 'bi-calendar2-event', statusClass: 'status-upcoming', status: 'Mendatang', divisi: 'Infokom', title: 'Workshop Desain UI/UX untuk Mahasiswa', date: '15 Juli 2026', time: '09:00 - 12:00 WIB', location: 'Lab Komputer 2, Gedung A' },
  { icon: 'bi-people', statusClass: 'status-ongoing', status: 'Berlangsung', divisi: 'Internal', title: 'Rapat Pleno Evaluasi Semester Genap', date: '12 Juli 2026', time: '14:00 - 16:00 WIB', location: 'Ruang Rapat Utama' },
  { icon: 'bi-broadcast', statusClass: 'status-upcoming', status: 'Mendatang', divisi: 'Eksternal', title: 'Seminar Karier & Magang Industri 2026', date: '20 Juli 2026', time: '10:00 - 15:00 WIB', location: 'Auditorium Kampus' },
]

const events = ref([...initialEvents])

const divisions = [
  { name: 'KWSB', icon: 'bi-shield-check', bg: '#EDE9FE', color: '#7C3AED', desc: 'Pengawasan kepengurusan dan kepatuhan terhadap AD/ART organisasi.' },
  { name: 'Internal', icon: 'bi-people-fill', bg: '#DBEAFE', color: '#2563EB', desc: 'Mengelola hubungan antar anggota dan kegiatan kekeluargaan internal.' },
  { name: 'Eksternal', icon: 'bi-globe2', bg: '#D1FAE5', color: '#059669', desc: 'Membangun jejaring dan kerja sama dengan pihak luar organisasi.' },
  { name: 'Minbak', icon: 'bi-journal-text', bg: '#FEF3C7', color: '#B45309', desc: 'Penatausahaan administrasi, surat-menyurat, dan dokumentasi organisasi.' },
  { name: 'Sosma', icon: 'bi-heart-pulse', bg: '#FEE2E2', color: '#DC2626', desc: 'Pengembangan sosial masyarakat dan kegiatan pengabdian.' },
  { name: 'Infokom', icon: 'bi-broadcast-pin', bg: '#CFFAFE', color: '#0891B2', desc: 'Informasi, publikasi, dan pengelolaan sistem teknologi komunikasi.' },
  { name: 'KWU', icon: 'bi-bag-check', bg: '#FCE7F3', color: '#BE185D', desc: 'Kewirausahaan dan pengembangan unit usaha organisasi.' },
]

const timeline = [
  { date: '12 Juli 2026', title: 'Rapat Pleno Evaluasi Semester Genap', desc: 'Evaluasi menyeluruh terhadap program kerja semester berjalan.', divisi: 'Internal', status: 'Berlangsung', statusColor: 'text-success', dotClass: '' },
  { date: '15 Juli 2026', title: 'Workshop Desain UI/UX untuk Mahasiswa', desc: 'Pelatihan dasar desain antarmuka pengguna untuk anggota baru.', divisi: 'Infokom', status: 'Mendatang', statusColor: 'text-success', dotClass: 'success' },
  { date: '20 Juli 2026', title: 'Seminar Karier & Magang Industri 2026', desc: 'Seminar karier dengan praktisi industri ternama.', divisi: 'Eksternal', status: 'Persiapan', statusColor: 'text-warning', dotClass: 'warning' },
  { date: '28 Juli 2026', title: 'Bakti Sosial & Donor Darah', desc: 'Kegiatan pengabdian masyarakat dan donor darah terbuka.', divisi: 'Sosma', status: 'Mendatang', statusColor: 'text-primary', dotClass: '' },
]

onMounted(async () => {
  try {
    const [eRes, dRes] = await Promise.allSettled([getEvents(), getDivisions()])
    if (eRes.status === 'fulfilled' && Array.isArray(eRes.value) && eRes.value.length > 0) {
      events.value = eRes.value.slice(0, 3).map(e => ({
        icon: e.icon || 'bi-calendar2-event',
        statusClass: e.status === 'Berlangsung' ? 'status-ongoing' : 'status-upcoming',
        status: e.status || 'Mendatang',
        divisi: e.division || e.divisi || 'Himpunan',
        title: e.title || e.name || 'Agenda Himpunan',
        date: e.start_time ? formatTanggalShort(e.start_time) : (e.date ? formatTanggalShort(e.date) : '-'),
        time: e.time || '09:00 WIB',
        location: e.location || 'Kampus Utama'
      }))
      stats.value[0].value = eRes.value.length + '+'

      timeline.value = eRes.value.slice(0, 4).map(e => ({
        date: e.start_time ? formatTanggalShort(e.start_time) : (e.date ? formatTanggalShort(e.date) : '-'),
        title: e.title || e.name || 'Kegiatan Organisasi',
        desc: e.description || 'Agenda kegiatan divisi himpunan mahasiswa.',
        divisi: e.division || e.divisi || 'Himpunan',
        status: e.status || 'Mendatang',
        statusColor: e.status === 'Berlangsung' ? 'text-success' : 'text-primary',
        dotClass: e.status === 'Berlangsung' ? 'success' : ''
      }))
    }

    if (dRes.status === 'fulfilled' && Array.isArray(dRes.value) && dRes.value.length > 0) {
      stats.value[1].value = String(dRes.value.length)
      let totalMembers = 0
      dRes.value.forEach(d => {
        if (d.members_count !== undefined) totalMembers += d.members_count
        else if (Array.isArray(d.members)) totalMembers += d.members.length
      })
      if (totalMembers > 0) stats.value[2].value = totalMembers + '+'
    }
  } catch (err) {
    console.warn('Backend API HomeView error:', err.message)
  }
})
</script>
