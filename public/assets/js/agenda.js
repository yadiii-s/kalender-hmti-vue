/* ==================================================
   agenda.js — Agenda Page Logic & Dummy Data
   Sistem Informasi Penjadwalan dan Manajemen Kegiatan HMJ
   ================================================== */

/* ---------- Division Meta ---------- */
var DIVISIONS = {
  KWSB:      { color: '#2563EB', light: '#DBEAFE', soft: '#EFF6FF',  icon: 'bi-shield-check'   },
  Internal:  { color: '#22C55E', light: '#DCFCE7', soft: '#F0FDF4',  icon: 'bi-people-fill'    },
  Eksternal: { color: '#F97316', light: '#FFEDD5', soft: '#FFF7ED',  icon: 'bi-globe2'          },
  Minbak:    { color: '#8B5CF6', light: '#EDE9FE', soft: '#F5F3FF',  icon: 'bi-journal-text'   },
  Sosma:     { color: '#EF4444', light: '#FEE2E2', soft: '#FEF2F2',  icon: 'bi-heart-pulse'    },
  Infokom:   { color: '#06B6D4', light: '#CFFAFE', soft: '#ECFEFF',  icon: 'bi-broadcast-pin'  },
  KWU:       { color: '#EAB308', light: '#FEF3C7', soft: '#FEFCE8',  icon: 'bi-bag-check'      }
};

/* ---------- Dummy Events (24 events) ---------- */
var EVENTS = [
  {
    id: 'E01',
    title: 'Rapat Pleno Evaluasi Semester Genap',
    division: 'Internal',
    pic: 'Dewi Anjani',
    start: '2026-07-12T14:00:00',
    end:   '2026-07-12T16:00:00',
    location: 'Ruang Rapat Utama, Gedung A',
    status: 'Berlangsung',
    description: 'Evaluasi menyeluruh terhadap pelaksanaan program kerja selama semester genap 2025/2026. Seluruh kepala divisi wajib menyampaikan laporan capaian dan kendala.',
    rundown: [
      { time: '14:00', desc: 'Pembukaan & Doa' },
      { time: '14:15', desc: 'Laporan Divisi Internal' },
      { time: '14:45', desc: 'Laporan Divisi Eksternal' },
      { time: '15:15', desc: 'Diskusi & Evaluasi' },
      { time: '15:50', desc: 'Kesimpulan & Penutup' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-file-earmark-ppt', 'bi-camera']
  },
  {
    id: 'E02',
    title: 'Workshop Desain UI/UX untuk Mahasiswa',
    division: 'Infokom',
    pic: 'Nadia Pramita',
    start: '2026-07-15T09:00:00',
    end:   '2026-07-15T12:00:00',
    location: 'Lab Komputer 2, Gedung B',
    status: 'Mendatang',
    description: 'Pelatihan dasar desain antarmuka pengguna menggunakan Figma. Peserta akan belajar prinsip UI/UX, pembuatan wireframe, dan prototype interaktif.',
    rundown: [
      { time: '09:00', desc: 'Registrasi & Persiapan' },
      { time: '09:30', desc: 'Pengenalan UI/UX Design' },
      { time: '10:30', desc: 'Hands-on: Figma Workshop' },
      { time: '11:30', desc: 'Presentasi Hasil & Review' },
      { time: '11:50', desc: 'Penutup' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-camera', 'bi-play-circle']
  },
  {
    id: 'E03',
    title: 'Seminar Karier & Magang Industri 2026',
    division: 'Eksternal',
    pic: 'Hendra Wijaya',
    start: '2026-07-20T10:00:00',
    end:   '2026-07-20T15:00:00',
    location: 'Auditorium Kampus, Gedung Utama',
    status: 'Mendatang',
    description: 'Seminar karier bersama praktisi industri teknologi terkemuka. Membahas tren karier, program magang, dan peluang kerja bagi mahasiswa tingkat akhir.',
    rundown: [
      { time: '10:00', desc: 'Registrasi & Coffee Break' },
      { time: '10:30', desc: 'Sambutan Ketua Himpunan' },
      { time: '11:00', desc: 'Keynote: Tren Karier 2026' },
      { time: '12:00', desc: 'Panel Discussion' },
      { time: '13:00', desc: 'ISHOMA' },
      { time: '14:00', desc: 'Sesi Tanya Jawab' },
      { time: '14:45', desc: 'Networking Session' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-camera', 'bi-film']
  },
  {
    id: 'E04',
    title: 'Bakti Sosial & Donor Darah Terbuka',
    division: 'Sosma',
    pic: 'Bayu Setiawan',
    start: '2026-07-28T08:00:00',
    end:   '2026-07-28T13:00:00',
    location: 'Halaman Kampus, Area Parkir Timur',
    status: 'Mendatang',
    description: 'Kegiatan sosial rutin berupa donor darah terbuka bekerja sama dengan PMI Kota. Diperuntukkan bagi seluruh mahasiswa dan civitas akademika.',
    rundown: [
      { time: '08:00', desc: 'Registrasi Donor Darah' },
      { time: '08:30', desc: 'Pemeriksaan Kesehatan' },
      { time: '09:00', desc: 'Pelaksanaan Donor Darah' },
      { time: '11:00', desc: 'Bagi Snack & Istirahat' },
      { time: '12:00', desc: 'Kegiatan Bakti Sosial' },
      { time: '12:45', desc: 'Penutup & Dokumentasi' }
    ],
    docs: ['bi-camera', 'bi-file-earmark-pdf']
  },
  {
    id: 'E05',
    title: 'Bazaar Kewirausahaan Mahasiswa 2026',
    division: 'KWU',
    pic: 'Fajar Nugroho',
    start: '2026-08-03T09:00:00',
    end:   '2026-08-03T17:00:00',
    location: 'Plaza Kampus, Area Terbuka',
    status: 'Mendatang',
    description: 'Bazaar tahunan yang mempertemukan mahasiswa wirausaha dengan pengunjung kampus. Menampilkan 30+ stan produk kreatif dan UMKM mahasiswa.',
    rundown: [
      { time: '09:00', desc: 'Persiapan & Setup Stan' },
      { time: '10:00', desc: 'Pembukaan Resmi Bazaar' },
      { time: '10:30', desc: 'Bazaar Berlangsung' },
      { time: '13:00', desc: 'ISHOMA' },
      { time: '14:00', desc: 'Sesi Pitching Produk' },
      { time: '15:30', desc: 'Pengumuman Juara' },
      { time: '16:30', desc: 'Penutup & Bersih-bersih' }
    ],
    docs: ['bi-camera', 'bi-play-circle', 'bi-file-earmark-pdf']
  },
  {
    id: 'E06',
    title: 'Sidang Pengawasan Semesteran KWSB',
    division: 'KWSB',
    pic: 'Rizki Maulana',
    start: '2026-08-08T13:00:00',
    end:   '2026-08-08T15:00:00',
    location: 'Ruang Sidang, Gedung A Lt.3',
    status: 'Mendatang',
    description: 'Sidang pengawasan rutin semesteran untuk mengevaluasi kepatuhan seluruh divisi terhadap AD/ART dan program kerja yang telah ditetapkan.',
    rundown: [
      { time: '13:00', desc: 'Pembukaan Sidang' },
      { time: '13:15', desc: 'Pemaparan Temuan KWSB' },
      { time: '13:45', desc: 'Klarifikasi dari Divisi' },
      { time: '14:15', desc: 'Rekomendasi & Keputusan' },
      { time: '14:50', desc: 'Penutup Sidang' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-file-earmark-text']
  },
  {
    id: 'E07',
    title: 'Pelatihan Administrasi & Dokumentasi',
    division: 'Minbak',
    pic: 'Sari Wulandari',
    start: '2026-08-15T10:00:00',
    end:   '2026-08-15T12:00:00',
    location: 'Ruang Minbak, Gedung C Lt.2',
    status: 'Mendatang',
    description: 'Pelatihan internal untuk anggota baru divisi Minbak mengenai tata cara administrasi, pengelolaan surat-menyurat, dan arsip digital organisasi.',
    rundown: [
      { time: '10:00', desc: 'Pembukaan & Perkenalan' },
      { time: '10:15', desc: 'Materi: Surat-menyurat Organisasi' },
      { time: '10:45', desc: 'Praktik: Pembuatan Surat' },
      { time: '11:15', desc: 'Materi: Arsip Digital' },
      { time: '11:45', desc: 'Diskusi & Penutup' }
    ],
    docs: ['bi-file-earmark-pdf']
  },
  {
    id: 'E08',
    title: 'Kaderisasi Anggota Baru Internal',
    division: 'Internal',
    pic: 'Dewi Anjani',
    start: '2026-08-20T08:00:00',
    end:   '2026-08-21T17:00:00',
    location: 'Aula Kampus & Outdoor Area',
    status: 'Mendatang',
    description: 'Program kaderisasi 2 hari untuk anggota baru himpunan. Meliputi orientasi organisasi, team building, dan pembekalan nilai-nilai himpunan.',
    rundown: [
      { time: 'Hari 1', desc: 'Orientasi Organisasi & Materi Dasar' },
      { time: 'Hari 2', desc: 'Team Building & Outdoor Activity' }
    ],
    docs: ['bi-camera', 'bi-play-circle']
  },
  {
    id: 'E09',
    title: 'Peluncuran Website Baru Himpunan',
    division: 'Infokom',
    pic: 'Nadia Pramita',
    start: '2026-08-22T15:00:00',
    end:   '2026-08-22T16:30:00',
    location: 'Online via Zoom & YouTube Live',
    status: 'Mendatang',
    description: 'Peluncuran resmi website baru SIPMA HMJ yang dilengkapi fitur penjadwalan, manajemen kegiatan, dan direktori divisi secara online.',
    rundown: [
      { time: '15:00', desc: 'Pembukaan & Demo Website' },
      { time: '15:30', desc: 'Fitur Unggulan & Q&A' },
      { time: '16:00', desc: 'Soft Launch Resmi' },
      { time: '16:20', desc: 'Penutup' }
    ],
    docs: ['bi-play-circle', 'bi-camera']
  },
  {
    id: 'E10',
    title: 'Pengabdian Masyarakat Desa Sukamaju',
    division: 'Sosma',
    pic: 'Dina Aulia Rahman',
    start: '2026-09-15T07:00:00',
    end:   '2026-09-15T17:00:00',
    location: 'Desa Sukamaju, Kab. Bandung Barat',
    status: 'Mendatang',
    description: 'Kegiatan pengabdian masyarakat berupa bantuan pendidikan, penyuluhan kesehatan, dan perbaikan fasilitas umum di Desa Sukamaju.',
    rundown: [
      { time: '07:00', desc: 'Keberangkatan dari Kampus' },
      { time: '09:00', desc: 'Tiba di Lokasi & Penyambutan' },
      { time: '10:00', desc: 'Kegiatan Pengabdian Dimulai' },
      { time: '13:00', desc: 'ISHOMA' },
      { time: '14:00', desc: 'Sesi Penyuluhan Kesehatan' },
      { time: '16:00', desc: 'Penutup & Foto Bersama' }
    ],
    docs: ['bi-camera', 'bi-file-earmark-pdf']
  },
  {
    id: 'E11',
    title: 'Kunjungan Industri ke PT Teknologi Maju',
    division: 'Eksternal',
    pic: 'Larasati Putri',
    start: '2026-09-12T08:00:00',
    end:   '2026-09-12T17:00:00',
    location: 'PT Teknologi Maju, Kawasan KIIC Karawang',
    status: 'Mendatang',
    description: 'Kunjungan industri untuk mempelajari proses bisnis dan teknologi di perusahaan teknologi terkemuka. Wajib bagi mahasiswa semester 5 ke atas.',
    rundown: [
      { time: '08:00', desc: 'Keberangkatan dari Kampus' },
      { time: '10:00', desc: 'Company Tour & Presentasi' },
      { time: '12:00', desc: 'ISHOMA' },
      { time: '13:00', desc: 'Sesi Diskusi dengan Engineer' },
      { time: '15:00', desc: 'Tanya Jawab & Networking' },
      { time: '16:00', desc: 'Perjalanan Pulang' }
    ],
    docs: ['bi-camera', 'bi-file-earmark-pdf', 'bi-play-circle']
  },
  {
    id: 'E12',
    title: 'Gathering Anggota Semester Ganjil',
    division: 'Internal',
    pic: 'Reza Pratama Adi',
    start: '2026-09-05T14:00:00',
    end:   '2026-09-05T21:00:00',
    location: 'Outdoor Camp Gunung Geulis, Bogor',
    status: 'Mendatang',
    description: 'Gathering semester ganjil sebagai ajang mempererat silaturahmi seluruh anggota himpunan. Dikemas dalam suasana santai dengan berbagai games dan hiburan.',
    rundown: [
      { time: '14:00', desc: 'Keberangkatan' },
      { time: '16:00', desc: 'Tiba & Check-in Camp' },
      { time: '17:00', desc: 'Games & Ice Breaking' },
      { time: '19:00', desc: 'Makan Malam Bersama' },
      { time: '20:00', desc: 'Api Unggun & Sharing' }
    ],
    docs: ['bi-camera', 'bi-play-circle']
  },
  {
    id: 'E13',
    title: 'Lomba Minat & Bakat Mahasiswa',
    division: 'Minbak',
    pic: 'Taufik Hidayat',
    start: '2026-09-22T08:00:00',
    end:   '2026-09-22T17:00:00',
    location: 'Plaza Kampus & Aula Utama',
    status: 'Mendatang',
    description: 'Kompetisi tahunan yang menampilkan bakat-bakat terpendam mahasiswa di bidang seni, olahraga, dan kreativitas. Terbuka untuk seluruh mahasiswa.',
    rundown: [
      { time: '08:00', desc: 'Registrasi & Persiapan' },
      { time: '09:00', desc: 'Pembukaan Resmi' },
      { time: '09:30', desc: 'Penampilan Peserta Lomba' },
      { time: '12:00', desc: 'ISHOMA' },
      { time: '13:00', desc: 'Final & Babak Penyisihan' },
      { time: '15:30', desc: 'Pengumuman Pemenang' },
      { time: '16:30', desc: 'Penutup' }
    ],
    docs: ['bi-camera', 'bi-trophy', 'bi-play-circle']
  },
  {
    id: 'E14',
    title: 'Pelatihan Entrepreneurship Batch 2',
    division: 'KWU',
    pic: 'Mega Lestari',
    start: '2026-09-18T10:00:00',
    end:   '2026-09-18T15:00:00',
    location: 'Ruang Seminar, Gedung B Lt.2',
    status: 'Mendatang',
    description: 'Pelatihan kewirausahaan lanjutan untuk mahasiswa yang ingin memulai dan mengembangkan bisnis. Narasumber dari kalangan entrepreneur muda.',
    rundown: [
      { time: '10:00', desc: 'Registrasi & Pembukaan' },
      { time: '10:30', desc: 'Materi: Business Model Canvas' },
      { time: '11:30', desc: 'Workshop: Validasi Ide Bisnis' },
      { time: '12:30', desc: 'ISHOMA' },
      { time: '13:30', desc: 'Pitching & Feedback' },
      { time: '14:45', desc: 'Penutup & Sertifikat' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-camera']
  },
  {
    id: 'E15',
    title: 'Leadership Training 2026',
    division: 'Internal',
    pic: 'Salsa Bilqis',
    start: '2026-10-18T09:00:00',
    end:   '2026-10-18T15:00:00',
    location: 'Ruang Seminar, Gedung Utama',
    status: 'Persiapan',
    description: 'Pelatihan kepemimpinan untuk kader terpilih himpunan. Fokus pada pengembangan soft skill, public speaking, dan manajemen tim.',
    rundown: [
      { time: '09:00', desc: 'Pembukaan & Motivasi' },
      { time: '09:30', desc: 'Materi: Kepemimpinan Transformasional' },
      { time: '10:30', desc: 'Role Play & Simulasi' },
      { time: '12:00', desc: 'ISHOMA' },
      { time: '13:00', desc: 'Materi: Public Speaking' },
      { time: '14:00', desc: 'Praktik & Evaluasi' },
      { time: '14:45', desc: 'Penutup' }
    ],
    docs: ['bi-file-earmark-pdf']
  },
  {
    id: 'E16',
    title: 'MoU dengan HMJ Se-Kota',
    division: 'Eksternal',
    pic: 'M. Iqbal Hakim',
    start: '2026-10-25T13:00:00',
    end:   '2026-10-25T15:00:00',
    location: 'Ruang Rapat Dekanat, Gedung A',
    status: 'Persiapan',
    description: 'Penandatanganan nota kesepahaman (MoU) antara HMJ dengan 5 himpunan mahasiswa jurusan lain se-kota untuk program kolaborasi kegiatan.',
    rundown: [
      { time: '13:00', desc: 'Pembukaan' },
      { time: '13:15', desc: 'Sambutan Dekan' },
      { time: '13:30', desc: 'Pembacaan Isi MoU' },
      { time: '14:00', desc: 'Penandatanganan MoU' },
      { time: '14:30', desc: 'Sesi Foto & Networking' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-camera']
  },
  {
    id: 'E17',
    title: 'Workshop Kepatuhan AD/ART',
    division: 'KWSB',
    pic: 'Andini Putri Maharani',
    start: '2026-10-10T09:00:00',
    end:   '2026-10-10T11:00:00',
    location: 'Auditorium Kecil, Gedung C',
    status: 'Persiapan',
    description: 'Workshop untuk seluruh pengurus mengenai pemahaman mendalam terhadap AD/ART himpunan dan implikasinya dalam pelaksanaan program kerja.',
    rundown: [
      { time: '09:00', desc: 'Pembukaan' },
      { time: '09:15', desc: 'Bedah AD/ART: Bab I-V' },
      { time: '10:00', desc: 'Studi Kasus & Diskusi' },
      { time: '10:45', desc: 'Tanya Jawab' }
    ],
    docs: ['bi-file-earmark-pdf', 'bi-file-earmark-text']
  },
  {
    id: 'E18',
    title: 'Konten Creation Day',
    division: 'Infokom',
    pic: 'Bella Safira',
    start: '2026-09-05T10:00:00',
    end:   '2026-09-05T15:00:00',
    location: 'Co-Working Space HMJ, Gedung B',
    status: 'Mendatang',
    description: 'Sesi pembuatan konten massal untuk mempersiapkan materi publikasi seluruh kegiatan bulan September-Oktober 2026.',
    rundown: [
      { time: '10:00', desc: 'Briefing & Pembagian Tugas' },
      { time: '10:30', desc: 'Pembuatan Konten Instagram' },
      { time: '12:00', desc: 'ISHOMA' },
      { time: '13:00', desc: 'Pembuatan Konten YouTube' },
      { time: '14:30', desc: 'Review & Approval' }
    ],
    docs: ['bi-camera', 'bi-play-circle']
  },
  {
    id: 'E19',
    title: 'Digitalisasi Arsip Organisasi',
    division: 'Minbak',
    pic: 'Ulfa Nuraini',
    start: '2026-11-10T13:00:00',
    end:   '2026-11-10T16:00:00',
    location: 'Lab Komputer 1, Gedung B',
    status: 'Persiapan',
    description: 'Program digitalisasi seluruh arsip fisik organisasi ke sistem penyimpanan cloud. Meningkatkan efisiensi dan keamanan dokumen organisasi.',
    rundown: [
      { time: '13:00', desc: 'Pengarahan & Pembagian Tugas' },
      { time: '13:30', desc: 'Scanning Dokumen Fisik' },
      { time: '14:30', desc: 'Upload & Kategorisasi' },
      { time: '15:30', desc: 'Verifikasi & Penutup' }
    ],
    docs: ['bi-file-earmark-pdf']
  },
  {
    id: 'E20',
    title: 'Marketplace Online HMJ Launch',
    division: 'KWU',
    pic: 'Oki Ramadhan',
    start: '2026-11-10T13:00:00',
    end:   '2026-11-10T15:00:00',
    location: 'Online via Zoom',
    status: 'Persiapan',
    description: 'Peluncuran platform marketplace online untuk memfasilitasi transaksi produk anggota himpunan secara digital dan terorganisir.',
    rundown: [
      { time: '13:00', desc: 'Demo Platform Marketplace' },
      { time: '13:30', desc: 'Onboarding Seller' },
      { time: '14:00', desc: 'Soft Launch & Promo Perdana' },
      { time: '14:45', desc: 'Penutup' }
    ],
    docs: ['bi-play-circle', 'bi-camera']
  },
  {
    id: 'E21',
    title: 'Evaluasi Kinerja Pengurus KWSB',
    division: 'KWSB',
    pic: 'Rizki Maulana',
    start: '2026-09-15T10:00:00',
    end:   '2026-09-15T12:00:00',
    location: 'Ruang Rapat KWSB, Gedung A',
    status: 'Mendatang',
    description: 'Evaluasi kinerja seluruh pengurus divisi oleh KWSB. Setiap kepala divisi mempresentasikan laporan capaian program kerja Q3.',
    rundown: [
      { time: '10:00', desc: 'Pembukaan' },
      { time: '10:15', desc: 'Presentasi Per-Divisi (10 menit/divisi)' },
      { time: '11:30', desc: 'Rekomendasi KWSB' },
      { time: '11:50', desc: 'Penutup' }
    ],
    docs: ['bi-file-earmark-pdf']
  },
  {
    id: 'E22',
    title: 'Career Fair Mahasiswa 2026',
    division: 'Eksternal',
    pic: 'Nadia Salsabila',
    start: '2026-10-05T09:00:00',
    end:   '2026-10-05T16:00:00',
    location: 'Gedung Serbaguna Kampus',
    status: 'Persiapan',
    description: 'Pameran karier yang menghadirkan 20+ perusahaan dari berbagai industri untuk membuka peluang magang dan rekrutmen bagi mahasiswa.',
    rundown: [
      { time: '09:00', desc: 'Pembukaan & Sambutan' },
      { time: '09:30', desc: 'Career Fair Berlangsung' },
      { time: '12:00', desc: 'ISHOMA' },
      { time: '13:00', desc: 'Sesi Mini Interview' },
      { time: '15:30', desc: 'Penutup' }
    ],
    docs: ['bi-camera', 'bi-file-earmark-pdf', 'bi-play-circle']
  },
  {
    id: 'E23',
    title: 'Program Beasiswa Anak Yatim',
    division: 'Sosma',
    pic: 'Farah Diba',
    start: '2026-10-20T10:00:00',
    end:   '2026-10-20T12:00:00',
    location: 'Panti Asuhan Al-Ikhlas, Bandung',
    status: 'Mendatang',
    description: 'Penyerahan beasiswa pendidikan kepada anak-anak yatim piatu di panti asuhan. Dana berasal dari donasi anggota himpunan.',
    rundown: [
      { time: '10:00', desc: 'Tiba di Panti Asuhan' },
      { time: '10:15', desc: 'Penyambutan & Sambutan' },
      { time: '10:30', desc: 'Penyerahan Beasiswa' },
      { time: '11:00', desc: 'Bermain Bersama Anak-anak' },
      { time: '11:45', desc: 'Foto Bersama & Penutup' }
    ],
    docs: ['bi-camera', 'bi-file-earmark-pdf']
  },
  {
    id: 'E24',
    title: 'Podcast & Dokumentasi Visual HMJ',
    division: 'Infokom',
    pic: 'Gita Ramadhani',
    start: '2026-10-12T14:00:00',
    end:   '2026-10-12T17:00:00',
    location: 'Studio Mini HMJ, Gedung B',
    status: 'Persiapan',
    description: 'Produksi podcast episode perdana HMJ yang membahas kehidupan mahasiswa dan tips sukses berorganisasi. Dipublikasikan di Spotify dan YouTube.',
    rundown: [
      { time: '14:00', desc: 'Persiapan Studio & Peralatan' },
      { time: '14:30', desc: 'Rekaman Podcast Episode 1' },
      { time: '15:30', desc: 'Editing & Review' },
      { time: '16:30', desc: 'Upload & Distribusi' }
    ],
    docs: ['bi-play-circle', 'bi-mic', 'bi-camera']
  }
];

/* ==========================================================
   PAGE LOGIC
   ========================================================== */
(function () {
  'use strict';

  if (!document.querySelector('#agendaCalendar')) return;

  /* ---- State ---- */
  var currentDivFilter   = 'all';
  var currentStatusFilter = 'all';
  var currentMonthFilter = 'all';
  var currentYearFilter  = '2026';
  var searchQuery        = '';
  var calendarInstance   = null;
  var dataTableInstance  = null;

  /* ---- Helpers ---- */
  function divMeta(div) { return DIVISIONS[div] || { color: '#64748B', light: '#F1F5F9', soft: '#F8FAFC', icon: 'bi-calendar' }; }

  function statusBadgeClass(status) {
    if (status === 'Mendatang') return 'status-upcoming';
    if (status === 'Berlangsung') return 'status-ongoing';
    if (status === 'Selesai')   return 'status-done';
    if (status === 'Dibatalkan') return 'status-done';
    return 'status-upcoming';
  }

  function formatDate(isoStr) {
    var d = new Date(isoStr);
    var months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function formatTime(isoStr) {
    var d = new Date(isoStr);
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  function applyFilters() {
    return EVENTS.filter(function (ev) {
      var matchDiv    = currentDivFilter === 'all' || ev.division === currentDivFilter;
      var matchStatus = currentStatusFilter === 'all' || ev.status === currentStatusFilter;
      var matchMonth  = currentMonthFilter === 'all' || (new Date(ev.start).getMonth() + 1) === parseInt(currentMonthFilter);
      var matchYear   = currentYearFilter  === 'all' || new Date(ev.start).getFullYear() === parseInt(currentYearFilter);
      var matchSearch = searchQuery === '' || ev.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
                        ev.division.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
                        ev.pic.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
      return matchDiv && matchStatus && matchMonth && matchYear && matchSearch;
    });
  }

  /* ---- FullCalendar ---- */
  function initCalendar() {
    var el = document.querySelector('#agendaCalendar');
    if (!el || typeof FullCalendar === 'undefined') return;

    calendarInstance = new FullCalendar.Calendar(el, {
      initialView: 'dayGridMonth',
      locale: 'id',
      headerToolbar: {
        left:   'prev,next today',
        center: 'title',
        right:  'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      buttonText: {
        today:       'Hari Ini',
        month:       'Bulan',
        week:        'Minggu',
        day:         'Hari',
        list:        'Daftar'
      },
      events: fcEvents(),
      eventClick: function (info) { openEventModal(info.event.id); },
      eventContent: function (arg) {
        var div = arg.event.extendedProps.division;
        var meta = divMeta(div);
        return {
          html: '<div style="display:flex;align-items:center;gap:4px;padding:2px 4px;">' +
                '<i class="bi ' + meta.icon + '" style="font-size:0.7rem;"></i>' +
                '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + arg.event.title + '</span>' +
                '</div>'
        };
      },
      height: 'auto',
      dayMaxEvents: 3
    });
    calendarInstance.render();
  }

  function fcEvents() {
    return applyFilters().map(function (ev) {
      var meta = divMeta(ev.division);
      return {
        id:              ev.id,
        title:           ev.title,
        start:           ev.start,
        end:             ev.end,
        backgroundColor: meta.color,
        borderColor:     meta.color,
        extendedProps:   { division: ev.division }
      };
    });
  }

  function refreshCalendar() {
    if (!calendarInstance) return;
    calendarInstance.removeAllEvents();
    calendarInstance.addEventSource(fcEvents());
    var filtered = applyFilters();
    var emptyEl = document.querySelector('#calendarEmpty');
    if (emptyEl) emptyEl.style.display = filtered.length === 0 ? '' : 'none';
  }

  /* ---- FullCalendar view switcher (custom toolbar) ---- */
  document.querySelectorAll('.view-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.view-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      if (calendarInstance) calendarInstance.changeView(this.getAttribute('data-view'));
    });
  });

  /* ---- Today button ---- */
  var todayBtn = document.querySelector('#btnToday');
  if (todayBtn) todayBtn.addEventListener('click', function () {
    if (calendarInstance) calendarInstance.today();
  });

  /* ---- Filters ---- */
  function bindFilter(id, callback) {
    var el = document.querySelector('#' + id);
    if (el) el.addEventListener('change', function () { callback(this.value); refreshAll(); });
  }
  bindFilter('filterDivision', function (v) { currentDivFilter    = v; });
  bindFilter('filterStatus',   function (v) { currentStatusFilter = v; });
  bindFilter('filterMonth',    function (v) { currentMonthFilter  = v; });
  bindFilter('filterYear',     function (v) { currentYearFilter   = v; });

  var searchEl = document.querySelector('#toolbarSearch');
  if (searchEl) {
    searchEl.addEventListener('input', function () {
      searchQuery = this.value;
      refreshAll();
    });
  }

  var resetBtn = document.querySelector('#btnReset');
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  function resetFilters() {
    currentDivFilter    = 'all';
    currentStatusFilter = 'all';
    currentMonthFilter  = 'all';
    currentYearFilter   = '2026';
    searchQuery         = '';
    var ids = ['filterDivision','filterStatus','filterMonth','filterYear'];
    ids.forEach(function (id) {
      var el = document.querySelector('#' + id);
      if (el) el.value = id === 'filterYear' ? '2026' : 'all';
    });
    var s = document.querySelector('#toolbarSearch');
    if (s) s.value = '';
    refreshAll();
  }

  function refreshAll() {
    refreshCalendar();
    renderTimeline();
    renderDataTable();
    renderStats();
    renderSidebar();
  }

  /* ---- Event Modal ---- */
  function openEventModal(eventId) {
    var ev = EVENTS.find(function (e) { return e.id === eventId; });
    if (!ev) return;
    var meta = divMeta(ev.division);
    var modalEl = document.querySelector('#eventModal');
    if (!modalEl) return;

    /* Banner */
    var banner = modalEl.querySelector('#modalBanner');
    if (banner) {
      banner.style.background = 'linear-gradient(135deg,' + meta.color + ',' + meta.color + 'CC)';
      banner.querySelector('#modalTitle').textContent = ev.title;
      banner.querySelector('#modalDivBadge').textContent = ev.division;
      banner.querySelector('#modalDivBadge').style.background = 'rgba(255,255,255,0.2)';
    }

    /* Detail grid */
    var grid = modalEl.querySelector('#modalDetailGrid');
    if (grid) {
      grid.innerHTML =
        detailItem('bi-person',      'PIC',      ev.pic)      +
        detailItem('bi-geo-alt',     'Lokasi',   ev.location) +
        detailItem('bi-calendar3',   'Tanggal',  formatDate(ev.start)) +
        detailItem('bi-clock',       'Waktu',    formatTime(ev.start) + ' – ' + formatTime(ev.end)) +
        detailItem('bi-diagram-3',   'Divisi',   ev.division) +
        detailItem('bi-circle-fill', 'Status',   ev.status,  meta.color);
    }

    /* Description */
    var desc = modalEl.querySelector('#modalDesc');
    if (desc) desc.textContent = ev.description;

    /* Rundown */
    var rdEl = modalEl.querySelector('#modalRundown');
    if (rdEl) {
      rdEl.innerHTML = ev.rundown.map(function (r) {
        return '<div class="rundown-item">' +
               '<span class="rundown-time">' + r.time + '</span>' +
               '<span class="rundown-desc">' + r.desc + '</span>' +
               '</div>';
      }).join('');
    }

    /* Docs */
    var docsEl = modalEl.querySelector('#modalDocs');
    if (docsEl) {
      docsEl.innerHTML = ev.docs.map(function (icon) {
        return '<div class="doc-preview-item" style="background:' + meta.soft + ';color:' + meta.color + '">' +
               '<i class="bi ' + icon + '"></i></div>';
      }).join('');
    }

    var bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  }

  function detailItem(icon, label, value, color) {
    var valStyle = color ? 'color:' + color + ';' : '';
    return '<div class="event-detail-item">' +
           '<i class="bi ' + icon + '"></i>' +
           '<div><div class="label">' + label + '</div>' +
           '<div class="value" style="' + valStyle + '">' + value + '</div></div>' +
           '</div>';
  }

  /* ---- Sidebar ---- */
  function renderSidebar() {
    var today   = new Date();
    var todayStr = today.toDateString();

    var todayEvents = EVENTS.filter(function (ev) {
      return new Date(ev.start).toDateString() === todayStr;
    });
    var upcoming = EVENTS.filter(function (ev) {
      var d = new Date(ev.start);
      return d > today;
    }).sort(function (a, b) { return new Date(a.start) - new Date(b.start); }).slice(0, 4);
    var recent = EVENTS.filter(function (ev) {
      var d = new Date(ev.start);
      return d <= today;
    }).sort(function (a, b) { return new Date(b.start) - new Date(a.start); }).slice(0, 4);

    renderSidebarSection('#sidebarToday', todayEvents.length === 0
      ? '<p class="text-muted" style="font-size:0.8rem;padding:8px 0;">Tidak ada kegiatan hari ini.</p>'
      : todayEvents.map(function (ev) { return sidebarEventItem(ev); }).join(''));

    renderSidebarSection('#sidebarUpcoming', upcoming.map(function (ev) { return sidebarEventItem(ev); }).join(''));
    renderSidebarSection('#sidebarRecent',   recent.map(function (ev) { return sidebarEventItem(ev); }).join(''));

    /* Legend counts */
    document.querySelectorAll('.legend-item[data-div]').forEach(function (item) {
      var div = item.getAttribute('data-div');
      var count = EVENTS.filter(function (ev) { return ev.division === div; }).length;
      var countEl = item.querySelector('.legend-count');
      if (countEl) countEl.textContent = count;
    });
  }

  function renderSidebarSection(selector, html) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function sidebarEventItem(ev) {
    var meta = divMeta(ev.division);
    return '<div class="sidebar-event-item">' +
           '<span class="sidebar-event-dot" style="background:' + meta.color + '"></span>' +
           '<div class="sidebar-event-info">' +
             '<p>' + ev.title + '</p>' +
             '<span>' + formatDate(ev.start) + ' · ' + formatTime(ev.start) + '</span>' +
           '</div>' +
           '</div>';
  }

  /* ---- Timeline ---- */
  function renderTimeline() {
    var container = document.querySelector('#agendaTimeline');
    if (!container) return;
    var filtered = applyFilters().sort(function (a, b) {
      return new Date(a.start) - new Date(b.start);
    }).slice(0, 10);

    if (filtered.length === 0) {
      container.innerHTML = emptyStateHTML();
      return;
    }

    var months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    container.innerHTML = filtered.map(function (ev, i) {
      var d    = new Date(ev.start);
      var meta = divMeta(ev.division);
      return '<div class="agenda-tl-item" data-aos="fade-up" data-aos-delay="' + (i % 5) * 80 + '">' +
        '<div class="agenda-tl-dot" style="border-color:' + meta.color + '">' +
          '<i class="bi bi-circle-fill" style="color:' + meta.color + '"></i>' +
        '</div>' +
        '<div class="agenda-tl-card">' +
          '<div class="agenda-tl-date" style="color:' + meta.color + '">' +
            '<div class="day">' + String(d.getDate()).padStart(2,'0') + '</div>' +
            '<div class="month">' + months[d.getMonth()] + '</div>' +
          '</div>' +
          '<div class="agenda-tl-body">' +
            '<h5>' + ev.title + '</h5>' +
            '<div class="agenda-tl-meta">' +
              '<span><i class="bi ' + meta.icon + '" style="color:' + meta.color + '"></i>' +
                '<span class="division-badge div-' + ev.division + '">' + ev.division + '</span></span>' +
              '<span><i class="bi bi-person"></i> ' + ev.pic + '</span>' +
              '<span><i class="bi bi-geo-alt"></i> ' + ev.location + '</span>' +
              '<span><i class="bi bi-clock"></i> ' + formatTime(ev.start) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="d-flex align-items-center gap-2">' +
            '<span class="status-badge ' + statusBadgeClass(ev.status) + '">' + ev.status + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  /* ---- DataTable ---- */
  function renderDataTable() {
    var tbody = document.querySelector('#agendaTableBody');
    if (!tbody) return;
    var filtered = applyFilters();

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8"><div class="text-center py-4 text-muted">Tidak ada data.</div></td></tr>';
    } else {
      tbody.innerHTML = filtered.map(function (ev) {
        var meta = divMeta(ev.division);
        return '<tr>' +
          '<td><strong>' + ev.title + '</strong></td>' +
          '<td><span class="division-badge div-' + ev.division + '">' + ev.division + '</span></td>' +
          '<td>' + ev.pic + '</td>' +
          '<td>' + formatDate(ev.start) + '</td>' +
          '<td>' + formatTime(ev.start) + ' – ' + formatTime(ev.end) + '</td>' +
          '<td>' + ev.location.split(',')[0] + '</td>' +
          '<td><span class="status-badge ' + statusBadgeClass(ev.status) + '">' + ev.status + '</span></td>' +
          '<td><button class="btn btn-soft btn-sm" onclick="openEventFromTable(\'' + ev.id + '\')"><i class="bi bi-eye"></i></button></td>' +
          '</tr>';
      }).join('');
    }

    /* Reinit DataTable */
    if (dataTableInstance) {
      dataTableInstance.destroy();
      dataTableInstance = null;
    }
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.DataTable !== 'undefined') {
      dataTableInstance = jQuery('#agendaTable').DataTable({
        language: {
          search:    'Cari:',
          lengthMenu: 'Tampilkan _MENU_ data',
          info:      'Menampilkan _START_ - _END_ dari _TOTAL_ kegiatan',
          paginate:  { first:'«', last:'»', next:'›', previous:'‹' },
          emptyTable: 'Tidak ada kegiatan.'
        },
        order: [[3,'asc']],
        pageLength: 8,
        responsive: true
      });
    }
  }

  /* ---- Statistics ---- */
  function renderStats() {
    var all       = EVENTS;
    var filtered  = applyFilters();
    var now       = new Date();
    var thisMonth = now.getMonth();
    var thisYear  = now.getFullYear();

    function setCounter(id, value) {
      var el = document.querySelector('#' + id);
      if (!el) return;
      el.setAttribute('data-counter', value);
      el.textContent = value;
    }
    setCounter('statTotal',    all.length);
    setCounter('statMonth',    all.filter(function (ev) {
      var d = new Date(ev.start);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).length);
    setCounter('statDone',     all.filter(function (ev) { return ev.status === 'Selesai'; }).length);
    setCounter('statUpcoming', all.filter(function (ev) { return ev.status === 'Mendatang'; }).length);
    setCounter('statCancelled',all.filter(function (ev) { return ev.status === 'Dibatalkan'; }).length);
  }

  /* ---- Empty State ---- */
  function emptyStateHTML() {
    return '<div class="empty-state">' +
           '<div class="empty-state-icon"><i class="bi bi-calendar-x"></i></div>' +
           '<h5>Tidak Ada Kegiatan</h5>' +
           '<p>Tidak ada kegiatan yang sesuai dengan filter yang dipilih.</p>' +
           '<button class="btn btn-primary" onclick="document.querySelector(\'#btnReset\').click()">' +
           '<i class="bi bi-arrow-counterclockwise"></i> Reset Filter</button>' +
           '</div>';
  }

  /* ---- Legend Cards ---- */
  function renderLegendCards() {
    var container = document.querySelector('#legendCards');
    if (!container) return;
    container.innerHTML = Object.keys(DIVISIONS).map(function (key) {
      var meta  = DIVISIONS[key];
      var count = EVENTS.filter(function (ev) { return ev.division === key; }).length;
      return '<div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in">' +
        '<div class="legend-full-card">' +
          '<div class="legend-icon" style="background:' + meta.light + ';color:' + meta.color + '">' +
            '<i class="bi ' + meta.icon + '"></i>' +
          '</div>' +
          '<div class="legend-info">' +
            '<div class="legend-div-name" style="color:' + meta.color + '">' + key + '</div>' +
            '<div class="legend-total">' + count + ' kegiatan</div>' +
          '</div>' +
          '<span class="legend-count" style="background:' + meta.light + ';color:' + meta.color + '">' + count + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ---- Expose for inline onclick ---- */
  window.openEventFromTable = function (id) { openEventModal(id); };

  /* ---- Boot ---- */
  function boot() {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 60 });
    initCalendar();
    renderTimeline();
    renderDataTable();
    renderStats();
    renderSidebar();
    renderLegendCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
