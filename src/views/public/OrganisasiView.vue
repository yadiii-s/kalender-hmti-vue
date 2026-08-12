<template>
  <PublicNavbar />

  <header class="page-header">
    <div class="container">
      <h1 data-aos="fade-up">Struktur Organisasi</h1>
      <p data-aos="fade-up" data-aos-delay="100">Kenali pengurus inti dan anggota divisi yang menjalankan himpunan mahasiswa.</p>
      <div class="breadcrumb-custom" data-aos="fade-up" data-aos-delay="200">
        <router-link to="/">Beranda</router-link> <span>/</span> <span>Organisasi</span>
      </div>
    </div>
  </header>

  <!-- Org Structure -->
  <section class="section-padding-sm">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Pengurus Inti</span>
        <h2>Struktur Kepemimpinan</h2>
        <p>Susunan kepengurusan inti himpunan mahasiswa periode 2025/2026.</p>
      </div>
      <div class="org-structure" data-aos="zoom-in">
        <div class="text-center mb-3">
          <div class="org-node"><div class="role">Ketua Umum</div><div class="name">Ahmad Fauzi Rahman</div></div>
        </div>
        <div class="org-connector"></div>
        <div class="text-center mb-3">
          <div class="org-node"><div class="role">Wakil Ketua</div><div class="name">Siti Nurhaliza</div></div>
        </div>
        <div class="org-connector"></div>
        <div class="row justify-content-center g-3 mb-3">
          <div class="col-md-5 col-lg-4">
            <div class="org-node w-100"><div class="role">Sekretaris Jenderal</div><div class="name">Bima Sakti Pratama</div></div>
          </div>
          <div class="col-md-5 col-lg-4">
            <div class="org-node w-100"><div class="role">Bendahara</div><div class="name">Putri Ayu Lestari</div></div>
          </div>
        </div>
        <div class="org-connector"></div>
        <div class="text-center mb-4">
          <h6 class="text-muted fw-semibold text-uppercase" style="letter-spacing:0.1em">Kepala Divisi</h6>
        </div>
        <div class="row justify-content-center g-3">
          <div class="col-6 col-md-4 col-lg-3" v-for="head in divisionHeads" :key="head.divisi">
            <div class="org-node w-100"><div class="role">{{ head.divisi }}</div><div class="name">{{ head.name }}</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Members -->
  <section class="section-padding-sm" style="background:linear-gradient(180deg,#F8FAFC,#F1F5F9)">
    <div class="container">
      <div class="text-center section-heading" data-aos="fade-up">
        <span class="eyebrow">Anggota</span>
        <h2>Tim Pengurus</h2>
        <p>Beberapa anggota aktif yang berkontribusi dalam setiap divisi.</p>
      </div>
      <div class="row g-4">
        <div class="col-6 col-md-4 col-lg-3" v-for="(m, i) in members" :key="i" data-aos="fade-up" :data-aos-delay="(i % 4) * 100">
          <div class="member-card">
            <div class="member-avatar" :style="m.style"><i class="bi bi-person-circle"></i></div>
            <div class="member-info">
              <h5>{{ m.name }}</h5>
              <div class="role">{{ m.role }}</div>
              <div class="division">{{ m.division }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <PublicFooter />
</template>

<script setup>
import PublicNavbar from '@/components/public/PublicNavbar.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'

const divisionHeads = [
  { divisi: 'KWSB', name: 'Rizki Maulana' },
  { divisi: 'Internal', name: 'Dewi Anjani' },
  { divisi: 'Eksternal', name: 'Hendra Wijaya' },
  { divisi: 'Minbak', name: 'Sari Wulandari' },
  { divisi: 'Sosma', name: 'Bayu Setiawan' },
  { divisi: 'Infokom', name: 'Nadia Pramita' },
  { divisi: 'KWU', name: 'Fajar Nugroho' },
]

const members = [
  { name: 'Ahmad Fauzi Rahman', role: 'Ketua Umum', division: 'Pengurus Inti', style: {} },
  { name: 'Rizki Maulana', role: 'Kepala Divisi', division: 'KWSB', style: { background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)' } },
  { name: 'Dewi Anjani', role: 'Kepala Divisi', division: 'Internal', style: { background: 'linear-gradient(135deg,#DBEAFE,#BFDBFE)' } },
  { name: 'Hendra Wijaya', role: 'Kepala Divisi', division: 'Eksternal', style: { background: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)' } },
  { name: 'Sari Wulandari', role: 'Kepala Divisi', division: 'Minbak', style: { background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)' } },
  { name: 'Bayu Setiawan', role: 'Kepala Divisi', division: 'Sosma', style: { background: 'linear-gradient(135deg,#FEE2E2,#FECACA)' } },
  { name: 'Nadia Pramita', role: 'Kepala Divisi', division: 'Infokom', style: { background: 'linear-gradient(135deg,#CFFAFE,#A5F3FC)' } },
  { name: 'Fajar Nugroho', role: 'Kepala Divisi', division: 'KWU', style: { background: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)' } },
]
</script>
