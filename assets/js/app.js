/* ==================================================
   app.js — Main JavaScript
   Sistem Informasi Penjadwalan dan Manajemen Kegiatan Himpunan Mahasiswa
   ================================================== */

(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(function () { preloader.classList.add('hide'); }, 400);
    }
  });

  /* ---------- Navbar Scroll Effect ---------- */
  var navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    var handleScroll = function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = this.getAttribute('href');
      if (target === '#' || target.length < 2) return;
      var el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        var offset = 80;
        var top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Active Nav Link Based on Section ---------- */
  var navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  var sections = document.querySelectorAll('section[id]');
  if (navLinks.length && sections.length) {
    var setActive = function () {
      var scrollY = window.scrollY + 100;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', setActive, { passive: true });
  }

  /* ---------- Counter Animation ---------- */
  var counters = document.querySelectorAll('[data-counter]');
  var animateCounter = function (el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;
    var step = function (timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(easeOut * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Button Ripple Effect ---------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = this.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  /* ---------- Scroll to Top ---------- */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    var toggleScrollTop = function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    };
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- AOS Init ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  /* ---------- Agenda Filter ---------- */
  var filterChips = document.querySelectorAll('.filter-chip');
  if (filterChips.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');
        var items = document.querySelectorAll('.agenda-item');
        items.forEach(function (item) {
          var cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Login Form (Demo) ---------- */
  var loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = loginForm.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Memproses...';
      btn.disabled = true;
      setTimeout(function () {
        window.location.href = '../dashboard/index.html';
      }, 1200);
    });
  }

  /* ---------- Dashboard Sidebar Toggle ---------- */
  var sidebarToggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('.sidebar');
  var sidebarOverlay = document.querySelector('.sidebar-overlay');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('show');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    });
  }

  /* ---------- Dashboard Mini Calendar ---------- */
  var calEl = document.querySelector('#miniCalBody');
  if (calEl) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    var dayNames = ['M','S','S','R','K','J','S'];
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var today = now.getDate();
    var eventDays = [5, 12, 18, 25];

    var calTitle = document.querySelector('#miniCalTitle');
    if (calTitle) calTitle.textContent = monthNames[month] + ' ' + year;

    var html = '';
    for (var d = 0; d < firstDay; d++) {
      var prevDays = new Date(year, month, 0).getDate() - firstDay + d + 1;
      html += '<td class="muted">' + prevDays + '</td>';
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var classes = '';
      if (day === today) classes = 'active';
      if (eventDays.indexOf(day) !== -1) classes += ' has-event';
      html += '<td class="' + classes.trim() + '">' + day + '</td>';
      if ((day + firstDay) % 7 === 0 && day !== daysInMonth) html += '</tr><tr>';
    }
    var totalCells = firstDay + daysInMonth;
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var nd = 1; nd <= remaining; nd++) {
      html += '<td class="muted">' + nd + '</td>';
    }
    calEl.innerHTML = '<tr>' + html + '</tr>';
  }

  /* ---------- Current Year in Footer ---------- */
  var yearEls = document.querySelectorAll('[data-current-year]');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ==================================================
     DIVISI PAGE — Dummy Data & Rendering
     ================================================== */

  var divisionData = [
    {
      id: 'KWSB',
      name: 'KWSB',
      fullName: 'Ketertiban, Wewenang & Badan Pengawas',
      icon: 'bi-shield-check',
      color: '#2563EB',
      colorLight: '#DBEAFE',
      colorSoft: '#EFF6FF',
      desc: 'Pengawasan kepatuhan terhadap AD/ART dan evaluasi kinerja pengurus organisasi.',
      vision: 'Menjadi badan pengawas yang independen, adil, dan transparan dalam menjaga kepatuhan organisasi terhadap AD/ART.',
      mission: 'Melakukan evaluasi berkala, menegakkan disiplin, dan memediasi konflik internal secara profesional.',
      coordinator: 'Rizki Maulana',
      viceCoordinator: 'Andini Putri Maharani',
      members: 8,
      established: 2018,
      members_list: [
        { name: 'Rizki Maulana', position: 'Koordinator', batch: '2022', email: 'rizki.m@kampus.ac.id', phone: '0812 3456 7801' },
        { name: 'Andini Putri Maharani', position: 'Wakil Koordinator', batch: '2023', email: 'andini.p@kampus.ac.id', phone: '0812 3456 7802' },
        { name: 'Bagus Pranata', position: 'Staff Pengawas', batch: '2024', email: 'bagus.p@kampus.ac.id', phone: '0812 3456 7803' },
        { name: 'Citra Dewi Anggraini', position: 'Staff Pengawas', batch: '2024', email: 'citra.d@kampus.ac.id', phone: '0812 3456 7804' },
        { name: 'Dimas Aryo Wibowo', position: 'Staff Pengawas', batch: '2025', email: 'dimas.a@kampus.ac.id', phone: '0812 3456 7805' },
        { name: 'Eka Prasetya', position: 'Staff Pengawas', batch: '2025', email: 'eka.p@kampus.ac.id', phone: '0812 3456 7806' },
        { name: 'Fitri Handayani', position: 'Staff Pengawas', batch: '2025', email: 'fitri.h@kampus.ac.id', phone: '0812 3456 7807' },
        { name: 'Galih Ramadhan', position: 'Staff Pengawas', batch: '2025', email: 'galih.r@kampus.ac.id', phone: '0812 3456 7808' }
      ],
      workPrograms: [
        { name: 'Sidang Pengawasan Semesteran', date: '8 Agustus 2026', pic: 'Rizki Maulana', status: 'Mendatang', progress: 65 },
        { name: 'Evaluasi Kinerja Pengurus', date: '15 September 2026', pic: 'Andini Putri', status: 'Persiapan', progress: 30 },
        { name: 'Workshop Kepatuhan AD/ART', date: '10 Oktober 2026', pic: 'Bagus Pranata', status: 'Persiapan', progress: 15 },
        { name: 'Mediasi Konflik Internal', date: 'Ongoing', pic: 'Citra Dewi', status: 'Berlangsung', progress: 80 }
      ],
      calendar: [
        { date: '08', month: 'Agu', activity: 'Sidang Pengawasan Semesteran', time: '13:00 - 15:00', location: 'Ruang Sidang' },
        { date: '15', month: 'Sep', activity: 'Evaluasi Kinerja Pengurus', time: '10:00 - 12:00', location: 'Ruang Rapat' },
        { date: '10', month: 'Okt', activity: 'Workshop Kepatuhan AD/ART', time: '09:00 - 11:00', location: 'Auditorium' }
      ],
      history: [
        { name: 'Rapat Pengawasan Triwulan II', date: '12 Mei 2026', status: 'Selesai', icon: 'bi-clipboard-check' },
        { name: 'Evaluasi Mid-Year 2026', date: '28 Februari 2026', status: 'Selesai', icon: 'bi-graph-down-arrow' },
        { name: 'Sidang Pengawasan Semester Genap', date: '15 Januari 2026', status: 'Selesai', icon: 'bi-people' },
        { name: 'Workshop Disiplin Anggota', date: '20 November 2025', status: 'Selesai', icon: 'bi-mortarboard' }
      ],
      stats: { members: 8, completed: 24, upcoming: 6, successRate: 92 },
      gallery: [
        { title: 'Rapat Pengawasan Triwulan', icon: 'bi-clipboard-check', bg: '#DBEAFE' },
        { title: 'Workshop Disiplin', icon: 'bi-mortarboard', bg: '#EFF6FF' },
        { title: 'Sidang Evaluasi', icon: 'bi-people', bg: '#BFDBFE' },
        { title: 'Mediasi Konflik', icon: 'bi-chat-dots', bg: '#DBEAFE' },
        { title: 'Dokumentasi Sidang', icon: 'bi-camera', bg: '#EFF6FF' },
        { title: 'Pelatihan Pengawas', icon: 'bi-award', bg: '#BFDBFE' }
      ]
    },
    {
      id: 'Internal',
      name: 'Internal',
      fullName: 'Hubungan Internal & Kaderisasi',
      icon: 'bi-people-fill',
      color: '#22C55E',
      colorLight: '#DCFCE7',
      colorSoft: '#F0FDF4',
      desc: 'Mengelola hubungan antar anggota dan program kaderisasi untuk pengembangan SDM.',
      vision: 'Membangun solidaritas dan kekeluargaan yang kuat antar seluruh anggota himpunan.',
      mission: 'Menyelenggarakan kegiatan kaderisasi, gathering, dan pengembangan kapasitas anggota.',
      coordinator: 'Dewi Anjani',
      viceCoordinator: 'Reza Pratama Adi',
      members: 12,
      established: 2017,
      members_list: [
        { name: 'Dewi Anjani', position: 'Koordinator', batch: '2022', email: 'dewi.a@kampus.ac.id', phone: '0812 3456 7811' },
        { name: 'Reza Pratama Adi', position: 'Wakil Koordinator', batch: '2023', email: 'reza.p@kampus.ac.id', phone: '0812 3456 7812' },
        { name: 'Salsa Bilqis', position: 'Staff Kaderisasi', batch: '2024', email: 'salsa.b@kampus.ac.id', phone: '0812 3456 7813' },
        { name: 'Teguh Santoso', position: 'Staff Kaderisasi', batch: '2024', email: 'teguh.s@kampus.ac.id', phone: '0812 3456 7814' },
        { name: 'Umar Faruq', position: 'Staff Gathering', batch: '2025', email: 'umar.f@kampus.ac.id', phone: '0812 3456 7815' },
        { name: 'Vina Aprilia', position: 'Staff Gathering', batch: '2025', email: 'vina.a@kampus.ac.id', phone: '0812 3456 7816' },
        { name: 'Wahyu Hidayat', position: 'Staff Pengembangan', batch: '2025', email: 'wahyu.h@kampus.ac.id', phone: '0812 3456 7817' },
        { name: 'Yuni Astuti', position: 'Staff Pengembangan', batch: '2025', email: 'yuni.a@kampus.ac.id', phone: '0812 3456 7818' }
      ],
      workPrograms: [
        { name: 'Program Kaderisasi Anggota Baru', date: '20 Agustus 2026', pic: 'Dewi Anjani', status: 'Mendatang', progress: 70 },
        { name: 'Gathering Anggota Himpuanan', date: '5 September 2026', pic: 'Reza Pratama', status: 'Persiapan', progress: 40 },
        { name: 'Leadership Training', date: '18 Oktober 2026', pic: 'Salsa Bilqis', status: 'Persiapan', progress: 20 },
        { name: 'Mentoring Anggota Baru', date: 'Ongoing', pic: 'Teguh Santoso', status: 'Berlangsung', progress: 85 }
      ],
      calendar: [
        { date: '20', month: 'Agu', activity: 'Kaderisasi Anggota Baru', time: '08:00 - 16:00', location: 'Aula Kampus' },
        { date: '05', month: 'Sep', activity: 'Gathering Anggota', time: '14:00 - 21:00', location: 'Outdoor Camp' },
        { date: '18', month: 'Okt', activity: 'Leadership Training', time: '09:00 - 15:00', location: 'Ruang Seminar' }
      ],
      history: [
        { name: 'Kaderisasi Anggota Baru 2025', date: '22 Agustus 2025', status: 'Selesai', icon: 'bi-mortarboard' },
        { name: 'Gathering Semester Genap', date: '15 Juni 2026', status: 'Selesai', icon: 'bi-tree' },
        { name: 'Leadership Training 2025', date: '10 Oktober 2025', status: 'Selesai', icon: 'bi-award' },
        { name: 'Mentoring Batch 2024', date: '5 Desember 2025', status: 'Selesai', icon: 'bi-chat-heart' }
      ],
      stats: { members: 12, completed: 32, upcoming: 8, successRate: 95 },
      gallery: [
        { title: 'Kaderisasi Anggota Baru', icon: 'bi-mortarboard', bg: '#DCFCE7' },
        { title: 'Gathering Anggota', icon: 'bi-tree', bg: '#F0FDF4' },
        { title: 'Leadership Training', icon: 'bi-award', bg: '#BBF7D0' },
        { title: 'Mentoring Session', icon: 'bi-chat-heart', bg: '#DCFCE7' },
        { title: 'Team Building', icon: 'bi-people', bg: '#F0FDF4' },
        { title: 'Dokumentasi Kegiatan', icon: 'bi-camera', bg: '#BBF7D0' }
      ]
    },
    {
      id: 'Eksternal',
      name: 'Eksternal',
      fullName: 'Hubungan Eksternal & Kemitraan',
      icon: 'bi-globe2',
      color: '#F97316',
      colorLight: '#FFEDD5',
      colorSoft: '#FFF7ED',
      desc: 'Membangun jejaring dan kerja sama dengan pihak eksternal dan industri.',
      vision: 'Menjadi jembatan strategis antara himpunan mahasiswa dengan eksternal kampus dan industri.',
      mission: 'Membangun kemitraan, menjalin relasi, dan menghadirkan peluang magang bagi mahasiswa.',
      coordinator: 'Hendra Wijaya',
      viceCoordinator: 'Larasati Putri',
      members: 10,
      established: 2017,
      members_list: [
        { name: 'Hendra Wijaya', position: 'Koordinator', batch: '2022', email: 'hendra.w@kampus.ac.id', phone: '0812 3456 7821' },
        { name: 'Larasati Putri', position: 'Wakil Koordinator', batch: '2023', email: 'larasati.p@kampus.ac.id', phone: '0812 3456 7822' },
        { name: 'M. Iqbal Hakim', position: 'Staff Kemitraan', batch: '2024', email: 'iqbal.h@kampus.ac.id', phone: '0812 3456 7823' },
        { name: 'Nadia Salsabila', position: 'Staff Kemitraan', batch: '2024', email: 'nadia.s@kampus.ac.id', phone: '0812 3456 7824' },
        { name: 'Oki Setiawan', position: 'Staff Relasi', batch: '2025', email: 'oki.s@kampus.ac.id', phone: '0812 3456 7825' },
        { name: 'Putri Maharani', position: 'Staff Relasi', batch: '2025', email: 'putri.m@kampus.ac.id', phone: '0812 3456 7826' },
        { name: 'Qori Annisa', position: 'Staff Sponsorship', batch: '2025', email: 'qori.a@kampus.ac.id', phone: '0812 3456 7827' },
        { name: 'Rangga Dwi P.', position: 'Staff Sponsorship', batch: '2025', email: 'rangga.d@kampus.ac.id', phone: '0812 3456 7828' }
      ],
      workPrograms: [
        { name: 'Seminar Karier & Magang Industri 2026', date: '20 Juli 2026', pic: 'Hendra Wijaya', status: 'Mendatang', progress: 75 },
        { name: 'Kunjungan Industri', date: '12 September 2026', pic: 'Larasati Putri', status: 'Persiapan', progress: 35 },
        { name: 'MoU dengan HMJ Lain', date: '25 Oktober 2026', pic: 'M. Iqbal', status: 'Persiapan', progress: 20 },
        { name: 'Career Fair Mahasiswa', date: 'Ongoing', pic: 'Nadia Salsabila', status: 'Berlangsung', progress: 60 }
      ],
      calendar: [
        { date: '20', month: 'Jul', activity: 'Seminar Karier & Magang', time: '10:00 - 15:00', location: 'Auditorium' },
        { date: '12', month: 'Sep', activity: 'Kunjungan Industri', time: '08:00 - 17:00', location: 'PT Teknologi Maju' },
        { date: '25', month: 'Okt', activity: 'MoU dengan HMJ Lain', time: '13:00 - 15:00', location: 'Ruang Rapat' }
      ],
      history: [
        { name: 'Seminar Karier 2025', date: '18 Juli 2025', status: 'Selesai', icon: 'bi-briefcase' },
        { name: 'Kunjungan Industri 2025', date: '10 September 2025', status: 'Selesai', icon: 'bi-building' },
        { name: 'Career Fair 2025', date: '5 November 2025', status: 'Selesai', icon: 'bi-people' },
        { name: 'MoU HMJ Se-Kota', date: '20 Desember 2025', status: 'Selesai', icon: 'bi-file-earmark-text' }
      ],
      stats: { members: 10, completed: 28, upcoming: 7, successRate: 88 },
      gallery: [
        { title: 'Seminar Karier 2025', icon: 'bi-briefcase', bg: '#FFEDD5' },
        { title: 'Kunjungan Industri', icon: 'bi-building', bg: '#FFF7ED' },
        { title: 'Career Fair', icon: 'bi-people', bg: '#FED7AA' },
        { title: 'MoU Signing', icon: 'bi-file-earmark-text', bg: '#FFEDD5' },
        { title: 'Networking Night', icon: 'bi-handshake', bg: '#FFF7ED' },
        { title: 'Dokumentasi Eksternal', icon: 'bi-camera', bg: '#FED7AA' }
      ]
    },
    {
      id: 'Minbak',
      name: 'Minbak',
      fullName: 'Minat & Bakat / Penatausahaan',
      icon: 'bi-journal-text',
      color: '#8B5CF6',
      colorLight: '#EDE9FE',
      colorSoft: '#F5F3FF',
      desc: 'Penatausahaan administrasi, surat-menyurat, dan pengembangan minat bakat anggota.',
      vision: 'Menjadi pusat penatausahaan yang rapi, terstruktur, dan kreatif dalam pengembangan minat-bakat.',
      mission: 'Mengelola administrasi organisasi dan menyelenggarakan kegiatan minat-bakat yang inspiratif.',
      coordinator: 'Sari Wulandari',
      viceCoordinator: 'Taufik Hidayat',
      members: 9,
      established: 2018,
      members_list: [
        { name: 'Sari Wulandari', position: 'Koordinator', batch: '2022', email: 'sari.w@kampus.ac.id', phone: '0812 3456 7831' },
        { name: 'Taufik Hidayat', position: 'Wakil Koordinator', batch: '2023', email: 'taufik.h@kampus.ac.id', phone: '0812 3456 7832' },
        { name: 'Ulfa Nuraini', position: 'Staff Administrasi', batch: '2024', email: 'ulfa.n@kampus.ac.id', phone: '0812 3456 7833' },
        { name: 'Vito Pratama', position: 'Staff Administrasi', batch: '2024', email: 'vito.p@kampus.ac.id', phone: '0812 3456 7834' },
        { name: 'Wawan Setiawan', position: 'Staff Minat-Bakat', batch: '2025', email: 'wawan.s@kampus.ac.id', phone: '0812 3456 7835' },
        { name: 'Xena Permatasari', position: 'Staff Minat-Bakat', batch: '2025', email: 'xena.p@kampus.ac.id', phone: '0812 3456 7836' },
        { name: 'Yoga Pranata', position: 'Staff Dokumentasi', batch: '2025', email: 'yoga.p@kampus.ac.id', phone: '0812 3456 7837' },
        { name: 'Zahra Amelia', position: 'Staff Dokumentasi', batch: '2025', email: 'zahra.a@kampus.ac.id', phone: '0812 3456 7838' }
      ],
      workPrograms: [
        { name: 'Pelatihan Administrasi & Dokumentasi', date: '15 Agustus 2026', pic: 'Sari Wulandari', status: 'Mendatang', progress: 60 },
        { name: 'Lomba Minat & Bakat Mahasiswa', date: '22 September 2026', pic: 'Taufik Hidayat', status: 'Persiapan', progress: 25 },
        { name: 'Digitalisasi Arsip Organisasi', date: '10 November 2026', pic: 'Ulfa Nuraini', status: 'Persiapan', progress: 15 },
        { name: 'Workshop Penatausahaan', date: 'Ongoing', pic: 'Vito Pratama', status: 'Berlangsung', progress: 75 }
      ],
      calendar: [
        { date: '15', month: 'Agu', activity: 'Pelatihan Administrasi', time: '10:00 - 12:00', location: 'Ruang Minbak' },
        { date: '22', month: 'Sep', activity: 'Lomba Minat & Bakat', time: '08:00 - 17:00', location: 'Plaza Kampus' },
        { date: '10', month: 'Nov', activity: 'Digitalisasi Arsip', time: '13:00 - 16:00', location: 'Lab Komputer' }
      ],
      history: [
        { name: 'Pelatihan Administrasi 2025', date: '12 Agustus 2025', status: 'Selesai', icon: 'bi-journal-check' },
        { name: 'Lomba Minat & Bakat 2025', date: '20 September 2025', status: 'Selesai', icon: 'bi-trophy' },
        { name: 'Workshop Penatausahaan', date: '5 November 2025', status: 'Selesai', icon: 'bi-folder' },
        { name: 'Pengarsipan Akhir Tahun', date: '28 Desember 2025', status: 'Selesai', icon: 'bi-archive' }
      ],
      stats: { members: 9, completed: 20, upcoming: 5, successRate: 90 },
      gallery: [
        { title: 'Pelatihan Administrasi', icon: 'bi-journal-check', bg: '#EDE9FE' },
        { title: 'Lomba Minat & Bakat', icon: 'bi-trophy', bg: '#F5F3FF' },
        { title: 'Workshop Penatausahaan', icon: 'bi-folder', bg: '#DDD6FE' },
        { title: 'Pengarsipan', icon: 'bi-archive', bg: '#EDE9FE' },
        { title: 'Dokumentasi Arsip', icon: 'bi-camera', bg: '#F5F3FF' },
        { title: 'Digitalisasi', icon: 'bi-laptop', bg: '#DDD6FE' }
      ]
    },
    {
      id: 'Sosma',
      name: 'Sosma',
      fullName: 'Sosial Masyarakat',
      icon: 'bi-heart-pulse',
      color: '#EF4444',
      colorLight: '#FEE2E2',
      colorSoft: '#FEF2F2',
      desc: 'Pengembangan sosial masyarakat dan kegiatan pengabdian kepada masyarakat.',
      vision: 'Menjadi agen perubahan sosial yang berkontribusi nyata bagi masyarakat sekitar.',
      mission: 'Menyelenggarakan bakti sosial, donor darah, dan program pengabdian masyarakat berkelanjutan.',
      coordinator: 'Bayu Setiawan',
      viceCoordinator: 'Dina Aulia Rahman',
      members: 11,
      established: 2017,
      members_list: [
        { name: 'Bayu Setiawan', position: 'Koordinator', batch: '2022', email: 'bayu.s@kampus.ac.id', phone: '0812 3456 7841' },
        { name: 'Dina Aulia Rahman', position: 'Wakil Koordinator', batch: '2023', email: 'dina.a@kampus.ac.id', phone: '0812 3456 7842' },
        { name: 'Erik Prasetyo', position: 'Staff Sosial', batch: '2024', email: 'erik.p@kampus.ac.id', phone: '0812 3456 7843' },
        { name: 'Farah Diba', position: 'Staff Sosial', batch: '2024', email: 'farah.d@kampus.ac.id', phone: '0812 3456 7844' },
        { name: 'Gilang Ramadhan', position: 'Staff Donor Darah', batch: '2025', email: 'gilang.r@kampus.ac.id', phone: '0812 3456 7845' },
        { name: 'Hana Permata', position: 'Staff Donor Darah', batch: '2025', email: 'hana.p@kampus.ac.id', phone: '0812 3456 7846' },
        { name: 'Irfan Maulana', position: 'Staff Pengabdian', batch: '2025', email: 'irfan.m@kampus.ac.id', phone: '0812 3456 7847' },
        { name: 'Jihan Sartika', position: 'Staff Pengabdian', batch: '2025', email: 'jihan.s@kampus.ac.id', phone: '0812 3456 7848' }
      ],
      workPrograms: [
        { name: 'Bakti Sosial & Donor Darah Terbuka', date: '28 Juli 2026', pic: 'Bayu Setiawan', status: 'Mendatang', progress: 80 },
        { name: 'Pengabdian Masyarakat Desa', date: '15 September 2026', pic: 'Dina Aulia', status: 'Persiapan', progress: 30 },
        { name: 'Bantuan Bencana Alam', date: 'On Call', pic: 'Erik Prasetyo', status: 'Standby', progress: 50 },
        { name: 'Program Beasiswa Anak Yatim', date: 'Ongoing', pic: 'Farah Diba', status: 'Berlangsung', progress: 70 }
      ],
      calendar: [
        { date: '28', month: 'Jul', activity: 'Bakti Sosial & Donor Darah', time: '08:00 - 13:00', location: 'Halaman Kampus' },
        { date: '15', month: 'Sep', activity: 'Pengabdian Desa', time: '07:00 - 17:00', location: 'Desa Sukamaju' },
        { date: '20', month: 'Okt', activity: 'Beasiswa Anak Yatim', time: '10:00 - 12:00', location: 'Panti Asuhan' }
      ],
      history: [
        { name: 'Bakti Sosial Lebaran 2026', date: '5 April 2026', status: 'Selesai', icon: 'bi-gift' },
        { name: 'Donor Darah Semester Genap', date: '10 Maret 2026', status: 'Selesai', icon: 'bi-droplet' },
        { name: 'Pengabdian Desa 2025', date: '15 September 2025', status: 'Selesai', icon: 'bi-house-heart' },
        { name: 'Bantuan Bencana Banjir', date: '8 Februari 2026', status: 'Selesai', icon: 'bi-cloud-rain' }
      ],
      stats: { members: 11, completed: 30, upcoming: 9, successRate: 94 },
      gallery: [
        { title: 'Bakti Sosial Lebaran', icon: 'bi-gift', bg: '#FEE2E2' },
        { title: 'Donor Darah', icon: 'bi-droplet', bg: '#FEF2F2' },
        { title: 'Pengabdian Desa', icon: 'bi-house-heart', bg: '#FECACA' },
        { title: 'Bantuan Bencana', icon: 'bi-cloud-rain', bg: '#FEE2E2' },
        { title: 'Beasiswa Yatim', icon: 'bi-mortarboard', bg: '#FEF2F2' },
        { title: 'Dokumentasi Sosma', icon: 'bi-camera', bg: '#FECACA' }
      ]
    },
    {
      id: 'Infokom',
      name: 'Infokom',
      fullName: 'Informasi & Komunikasi',
      icon: 'bi-broadcast-pin',
      color: '#06B6D4',
      colorLight: '#CFFAFE',
      colorSoft: '#ECFEFF',
      desc: 'Informasi, publikasi, dan pengelolaan sistem teknologi komunikasi organisasi.',
      vision: 'Menjadi pusat informasi yang cepat, akurat, dan kreatif untuk seluruh kegiatan himpunan.',
      mission: 'Mengelola media sosial, website, desain publikasi, dan dokumentasi visual organisasi.',
      coordinator: 'Nadia Pramita',
      viceCoordinator: 'Adit Pranata',
      members: 13,
      established: 2016,
      members_list: [
        { name: 'Nadia Pramita', position: 'Koordinator', batch: '2022', email: 'nadia.p@kampus.ac.id', phone: '0812 3456 7851' },
        { name: 'Adit Pranata', position: 'Wakil Koordinator', batch: '2023', email: 'adit.p@kampus.ac.id', phone: '0812 3456 7852' },
        { name: 'Bella Safira', position: 'Staff Desain', batch: '2024', email: 'bella.s@kampus.ac.id', phone: '0812 3456 7853' },
        { name: 'Candra Wijaya', position: 'Staff Desain', batch: '2024', email: 'candra.w@kampus.ac.id', phone: '0812 3456 7854' },
        { name: 'Dewi Lestari', position: 'Staff Media Sosial', batch: '2025', email: 'dewi.l@kampus.ac.id', phone: '0812 3456 7855' },
        { name: 'Elang Pratama', position: 'Staff Media Sosial', batch: '2025', email: 'elang.p@kampus.ac.id', phone: '0812 3456 7856' },
        { name: 'Fika Nurhaliza', position: 'Staff Website', batch: '2025', email: 'fika.n@kampus.ac.id', phone: '0812 3456 7857' },
        { name: 'Gita Ramadhani', position: 'Staff Dokumentasi', batch: '2025', email: 'gita.r@kampus.ac.id', phone: '0812 3456 7858' }
      ],
      workPrograms: [
        { name: 'Peluncuran Website Baru Himpunan', date: '22 Agustus 2026', pic: 'Nadia Pramita', status: 'Mendatang', progress: 85 },
        { name: 'Workshop Desain UI/UX', date: '15 Juli 2026', pic: 'Adit Pranata', status: 'Mendatang', progress: 90 },
        { name: 'Konten Bulanan Media Sosial', date: 'Ongoing', pic: 'Bella Safira', status: 'Berlangsung', progress: 65 },
        { name: 'Dokumentasi Audio-Visual', date: 'Ongoing', pic: 'Candra Wijaya', status: 'Berlangsung', progress: 55 }
      ],
      calendar: [
        { date: '15', month: 'Jul', activity: 'Workshop Desain UI/UX', time: '09:00 - 12:00', location: 'Lab Komputer 2' },
        { date: '22', month: 'Agu', activity: 'Peluncuran Website', time: '15:00 - 16:00', location: 'Online (Zoom)' },
        { date: '05', month: 'Sep', activity: 'Konten Creation Day', time: '10:00 - 15:00', location: 'Co-Working Space' }
      ],
      history: [
        { name: 'Peluncuran Website 2025', date: '22 Agustus 2025', status: 'Selesai', icon: 'bi-globe' },
        { name: 'Workshop Desain 2025', date: '15 Juli 2025', status: 'Selesai', icon: 'bi-palette' },
        { name: 'Konten Lebaran 2026', date: '5 April 2026', status: 'Selesai', icon: 'bi-megaphone' },
        { name: 'Dokumentasi Wisuda', date: '20 Februari 2026', status: 'Selesai', icon: 'bi-camera-reels' }
      ],
      stats: { members: 13, completed: 45, upcoming: 12, successRate: 97 },
      gallery: [
        { title: 'Peluncuran Website', icon: 'bi-globe', bg: '#CFFAFE' },
        { title: 'Workshop Desain', icon: 'bi-palette', bg: '#ECFEFF' },
        { title: 'Konten Media Sosial', icon: 'bi-megaphone', bg: '#A5F3FC' },
        { title: 'Dokumentasi Visual', icon: 'bi-camera-reels', bg: '#CFFAFE' },
        { title: 'Branding Session', icon: 'bi-brush', bg: '#ECFEFF' },
        { title: 'Podcast Himpuanan', icon: 'bi-mic', bg: '#A5F3FC' }
      ]
    },
    {
      id: 'KWU',
      name: 'KWU',
      fullName: 'Kewirausahaan',
      icon: 'bi-bag-check',
      color: '#EAB308',
      colorLight: '#FEF3C7',
      colorSoft: '#FEFCE8',
      desc: 'Kewirausahaan dan pengembangan unit usaha organisasi himpunan mahasiswa.',
      vision: 'Menjadi inkubator kewirausahaan mahasiswa yang menghasilkan entrepreneur muda.',
      mission: 'Mengembangkan unit usaha, menyelenggarakan pelatihan, dan mengelola bazaar kewirausahaan.',
      coordinator: 'Fajar Nugroho',
      viceCoordinator: 'Mega Lestari',
      members: 8,
      established: 2019,
      members_list: [
        { name: 'Fajar Nugroho', position: 'Koordinator', batch: '2022', email: 'fajar.n@kampus.ac.id', phone: '0812 3456 7861' },
        { name: 'Mega Lestari', position: 'Wakil Koordinator', batch: '2023', email: 'mega.l@kampus.ac.id', phone: '0812 3456 7862' },
        { name: 'Nanda Pratama', position: 'Staff Usaha', batch: '2024', email: 'nanda.p@kampus.ac.id', phone: '0812 3456 7863' },
        { name: 'Oki Ramadhan', position: 'Staff Usaha', batch: '2024', email: 'oki.r@kampus.ac.id', phone: '0812 3456 7864' },
        { name: 'Putri Anggraini', position: 'Staff Bazaar', batch: '2025', email: 'putri.a@kampus.ac.id', phone: '0812 3456 7865' },
        { name: 'Rudi Hartono', position: 'Staff Bazaar', batch: '2025', email: 'rudi.h@kampus.ac.id', phone: '0812 3456 7866' },
        { name: 'Sari Dewi', position: 'Staff Inkubasi', batch: '2025', email: 'sari.d@kampus.ac.id', phone: '0812 3456 7867' },
        { name: 'Tono Wibowo', position: 'Staff Inkubasi', batch: '2025', email: 'tono.w@kampus.ac.id', phone: '0812 3456 7868' }
      ],
      workPrograms: [
        { name: 'Bazaar Kewirausahaan Mahasiswa', date: '3 Agustus 2026', pic: 'Fajar Nugroho', status: 'Mendatang', progress: 70 },
        { name: 'Inkubasi Bisnis Mahasiswa', date: 'Ongoing', pic: 'Mega Lestari', status: 'Berlangsung', progress: 60 },
        { name: 'Pelatihan Entrepreneurship', date: '18 September 2026', pic: 'Nanda Pratama', status: 'Persiapan', progress: 25 },
        { name: 'Marketplace Online HMJ', date: '10 November 2026', pic: 'Oki Ramadhan', status: 'Persiapan', progress: 15 }
      ],
      calendar: [
        { date: '03', month: 'Agu', activity: 'Bazaar Kewirausahaan', time: '09:00 - 17:00', location: 'Plaza Kampus' },
        { date: '18', month: 'Sep', activity: 'Pelatihan Entrepreneurship', time: '10:00 - 15:00', location: 'Ruang Seminar' },
        { date: '10', month: 'Nov', activity: 'Marketplace Launch', time: '13:00 - 15:00', location: 'Online' }
      ],
      history: [
        { name: 'Bazaar Kewirausahaan 2025', date: '3 Agustus 2025', status: 'Selesai', icon: 'bi-bag-check' },
        { name: 'Inkubasi Bisnis Batch 1', date: '15 September 2025', status: 'Selesai', icon: 'bi-lightbulb' },
        { name: 'Pelatihan Entrepreneurship 2025', date: '20 Oktober 2025', status: 'Selesai', icon: 'bi-graph-up' },
        { name: 'Marketplace Launch 2025', date: '10 November 2025', status: 'Selesai', icon: 'bi-cart' }
      ],
      stats: { members: 8, completed: 18, upcoming: 6, successRate: 86 },
      gallery: [
        { title: 'Bazaar Kewirausahaan', icon: 'bi-bag-check', bg: '#FEF3C7' },
        { title: 'Inkubasi Bisnis', icon: 'bi-lightbulb', bg: '#FEFCE8' },
        { title: 'Pelatihan Entrepreneur', icon: 'bi-graph-up', bg: '#FDE68A' },
        { title: 'Marketplace Online', icon: 'bi-cart', bg: '#FEF3C7' },
        { title: 'Pitching Day', icon: 'bi-megaphone', bg: '#FEFCE8' },
        { title: 'Dokumentasi KWU', icon: 'bi-camera', bg: '#FDE68A' }
      ]
    }
  ];

  var selectedDivision = 'KWSB';

  /* Helper: get initials */
  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  /* Helper: status badge class */
  function statusBadgeClass(status) {
    if (status === 'Selesai' || status === 'Mendatang') return 'status-upcoming';
    if (status === 'Berlangsung') return 'status-ongoing';
    if (status === 'Standby') return 'status-upcoming';
    return 'status-done';
  }

  /* Helper: progress bar color */
  function progressColor(progress) {
    if (progress >= 75) return '#22C55E';
    if (progress >= 50) return '#2563EB';
    if (progress >= 25) return '#FACC15';
    return '#EF4444';
  }

  /* Render: Overview Cards */
  function renderOverviewCards() {
    var grid = document.querySelector('#divisionOverviewGrid');
    if (!grid) return;
    var html = '';
    divisionData.forEach(function (d, i) {
      html += '<div class="col-6 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="' + (i % 4) * 100 + '">' +
        '<div class="division-overview-card" data-division="' + d.id + '">' +
          '<span class="division-color-badge" style="position:absolute;top:0;left:0;width:100%;height:5px;border-radius:20px 20px 0 0;background:' + d.color + ';"></span>' +
          '<div class="ov-icon" style="background:' + d.colorSoft + ';color:' + d.color + '"><i class="bi ' + d.icon + '"></i></div>' +
          '<h5>' + d.name + '</h5>' +
          '<p class="ov-desc">' + d.desc + '</p>' +
          '<div class="ov-coordinator">' +
            '<div class="ov-coordinator-avatar" style="background:' + d.color + '">' + getInitials(d.coordinator) + '</div>' +
            '<div class="ov-coordinator-info">' +
              '<div class="label">Koordinator</div>' +
              '<div class="name">' + d.coordinator + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="ov-footer">' +
            '<span class="ov-members"><i class="bi bi-people"></i> ' + d.members + ' anggota</span>' +
            '<span class="btn btn-soft btn-sm">Lihat Detail <i class="bi bi-arrow-right"></i></span>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    grid.innerHTML = html;

    /* Click handler */
    grid.querySelectorAll('.division-overview-card').forEach(function (card) {
      card.addEventListener('click', function () {
        selectedDivision = this.getAttribute('data-division');
        renderDivisionTabs();
        renderDivisionDetail();
        renderDivisionStats();
        var detailSection = document.querySelector('#divisionDetail');
        if (detailSection) {
          var top = detailSection.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* Render: Division Tabs */
  function renderDivisionTabs() {
    var tabsEl = document.querySelector('#divisionTabs');
    if (!tabsEl) return;
    var html = '';
    divisionData.forEach(function (d) {
      var active = d.id === selectedDivision ? ' active' : '';
      html += '<span class="division-tab' + active + '" data-division="' + d.id + '">' +
        '<span class="tab-dot" style="background:' + d.color + '"></span> ' + d.name +
      '</span>';
    });
    tabsEl.innerHTML = html;
    tabsEl.querySelectorAll('.division-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        selectedDivision = this.getAttribute('data-division');
        renderDivisionTabs();
        renderDivisionDetail();
        renderDivisionStats();
      });
    });
  }

  /* Render: Division Detail */
  function renderDivisionDetail() {
    var container = document.querySelector('#divisionDetailContent');
    if (!container) return;
    var d = divisionData.find(function (x) { return x.id === selectedDivision; });
    if (!d) return;

    /* Banner */
    var banner = '<div class="division-banner" style="background:linear-gradient(135deg,' + d.color + ',' + d.color + 'DD);" data-aos="zoom-in">' +
      '<div class="division-banner-logo" style="background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);"><i class="bi ' + d.icon + '"></i></div>' +
      '<div class="division-banner-info">' +
        '<h2>' + d.fullName + '</h2>' +
        '<p>' + d.desc + '</p>' +
        '<div class="banner-meta">' +
          '<span class="banner-meta-item"><i class="bi bi-person-badge"></i> ' + d.coordinator + '</span>' +
          '<span class="banner-meta-item"><i class="bi bi-people"></i> ' + d.members + ' Anggota</span>' +
          '<span class="banner-meta-item"><i class="bi bi-calendar-event"></i> Berdiri ' + d.established + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';

    /* Info Cards: Vision, Mission, Coordinator */
    var infoCards = '<div class="row g-4 mt-1">' +
      '<div class="col-lg-4" data-aos="fade-up" data-aos-delay="0">' +
        '<div class="division-info-card">' +
          '<div class="info-icon" style="background:' + d.colorLight + ';color:' + d.color + '"><i class="bi bi-eye"></i></div>' +
          '<h5>Visi</h5><p>' + d.vision + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">' +
        '<div class="division-info-card">' +
          '<div class="info-icon" style="background:' + d.colorLight + ';color:' + d.color + '"><i class="bi bi-bullseye"></i></div>' +
          '<h5>Misi</h5><p>' + d.mission + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">' +
        '<div class="division-info-card">' +
          '<div class="info-icon" style="background:' + d.colorLight + ';color:' + d.color + '"><i class="bi bi-person-badge"></i></div>' +
          '<h5>Kepengurusan</h5>' +
          '<ul>' +
            '<li><i class="bi bi-check-circle"></i> Koordinator: <strong>' + d.coordinator + '</strong></li>' +
            '<li><i class="bi bi-check-circle"></i> Wakil: <strong>' + d.viceCoordinator + '</strong></li>' +
            '<li><i class="bi bi-check-circle"></i> Total Anggota: <strong>' + d.members + '</strong></li>' +
            '<li><i class="bi bi-check-circle"></i> Berdiri Sejak: <strong>' + d.established + '</strong></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>';

    /* Members Section */
    var membersHtml = '<div class="mt-5" data-aos="fade-up">' +
      '<div class="d-flex align-items-center gap-2 mb-4">' +
        '<div style="width:40px;height:40px;border-radius:12px;background:' + d.colorSoft + ';color:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="bi bi-people-fill"></i></div>' +
        '<h4 style="margin:0;">Anggota Divisi</h4>' +
      '</div>' +
      '<div class="row g-4">';
    d.members_list.forEach(function (m, i) {
      membersHtml += '<div class="col-6 col-md-4 col-lg-3" data-aos="zoom-in" data-aos-delay="' + (i % 4) * 100 + '">' +
        '<div class="div-member-card">' +
          '<div class="div-member-photo" style="background:linear-gradient(135deg,' + d.color + ',' + d.colorLight + ');"><i class="bi bi-person-circle"></i></div>' +
          '<div class="div-member-body">' +
            '<h6>' + m.name + '</h6>' +
            '<div class="position" style="color:' + d.color + '">' + m.position + '</div>' +
            '<div class="batch">Batch ' + m.batch + '</div>' +
            '<div class="div-member-contact">' +
              '<div class="contact-row"><i class="bi bi-envelope"></i> ' + m.email + '</div>' +
              '<div class="contact-row"><i class="bi bi-phone"></i> ' + m.phone + '</div>' +
            '</div>' +
            '<div class="div-member-social">' +
              '<a href="#"><i class="bi bi-instagram"></i></a>' +
              '<a href="#"><i class="bi bi-linkedin"></i></a>' +
              '<a href="#"><i class="bi bi-whatsapp"></i></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    membersHtml += '</div></div>';

    /* Work Programs */
    var wpHtml = '<div class="mt-5" data-aos="fade-up">' +
      '<div class="d-flex align-items-center gap-2 mb-4">' +
        '<div style="width:40px;height:40px;border-radius:12px;background:' + d.colorSoft + ';color:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="bi bi-card-checklist"></i></div>' +
        '<h4 style="margin:0;">Program Kerja</h4>' +
      '</div>' +
      '<div class="row g-4">';
    d.workPrograms.forEach(function (wp, i) {
      wpHtml += '<div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="' + (i % 4) * 100 + '">' +
        '<div class="work-program-card">' +
          '<div class="wp-header">' +
            '<div class="wp-icon" style="background:' + d.colorSoft + ';color:' + d.color + '"><i class="bi bi-file-earmark-text"></i></div>' +
            '<span class="status-badge ' + statusBadgeClass(wp.status) + '">' + wp.status + '</span>' +
          '</div>' +
          '<h6>' + wp.name + '</h6>' +
          '<div class="wp-meta">' +
            '<span><i class="bi bi-calendar3"></i> ' + wp.date + '</span>' +
            '<span><i class="bi bi-person"></i> ' + wp.pic + '</span>' +
          '</div>' +
          '<div class="wp-progress-label"><span>Progress</span><span style="color:' + progressColor(wp.progress) + '">' + wp.progress + '%</span></div>' +
          '<div class="wp-progress-bar"><div class="wp-progress-fill" style="width:' + wp.progress + '%;background:' + progressColor(wp.progress) + '"></div></div>' +
        '</div>' +
      '</div>';
    });
    wpHtml += '</div></div>';

    /* Calendar + History (two columns) */
    var calHtml = '<div class="row g-4 mt-5">' +
      '<div class="col-lg-5" data-aos="fade-right">' +
        '<div class="d-flex align-items-center gap-2 mb-4">' +
          '<div style="width:40px;height:40px;border-radius:12px;background:' + d.colorSoft + ';color:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="bi bi-calendar2-week"></i></div>' +
          '<h4 style="margin:0;">Kalender Divisi</h4>' +
        '</div>' +
        '<div class="div-calendar">';
    d.calendar.forEach(function (ev) {
      calHtml += '<div class="div-calendar-event">' +
        '<div class="div-cal-date" style="background:' + d.colorSoft + ';color:' + d.color + '">' +
          '<div class="day">' + ev.date + '</div><div class="month">' + ev.month + '</div>' +
        '</div>' +
        '<div class="div-cal-event-info">' +
          '<h6>' + ev.activity + '</h6>' +
          '<div class="cal-meta">' +
            '<span><i class="bi bi-clock"></i> ' + ev.time + '</span>' +
            '<span><i class="bi bi-geo-alt"></i> ' + ev.location + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    calHtml += '</div></div>' +
      '<div class="col-lg-7" data-aos="fade-left">' +
        '<div class="d-flex align-items-center gap-2 mb-4">' +
          '<div style="width:40px;height:40px;border-radius:12px;background:' + d.colorSoft + ';color:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="bi bi-clock-history"></i></div>' +
          '<h4 style="margin:0;">Riwayat Aktivitas</h4>' +
        '</div>' +
        '<div class="history-timeline">';
    d.history.forEach(function (h, i) {
      calHtml += '<div class="history-item" data-aos="fade-left" data-aos-delay="' + i * 100 + '">' +
        '<div class="history-card">' +
          '<div class="row g-0">' +
            '<div class="col-auto">' +
              '<div class="history-photo" style="background:linear-gradient(135deg,' + d.color + ',' + d.colorLight + ');width:140px;height:100%;min-height:100px;"><i class="bi ' + h.icon + '"></i></div>' +
            '</div>' +
            '<div class="col">' +
              '<div class="history-body">' +
                '<h6>' + h.name + '</h6>' +
                '<div class="history-meta">' +
                  '<span><i class="bi bi-diagram-3"></i> ' + d.name + '</span>' +
                  '<span><i class="bi bi-calendar3"></i> ' + h.date + '</span>' +
                  '<span><i class="bi bi-check-circle text-success"></i> ' + h.status + '</span>' +
                '</div>' +
                '<button class="btn btn-soft btn-sm"><i class="bi bi-folder2-open"></i> Dokumentasi</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    calHtml += '</div></div></div>';

    /* Gallery */
    var galleryHtml = '<div class="mt-5" data-aos="fade-up">' +
      '<div class="d-flex align-items-center gap-2 mb-4">' +
        '<div style="width:40px;height:40px;border-radius:12px;background:' + d.colorSoft + ';color:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="bi bi-images"></i></div>' +
        '<h4 style="margin:0;">Galeri Divisi</h4>' +
      '</div>' +
      '<div class="gallery-grid">';
    d.gallery.forEach(function (g, i) {
      galleryHtml += '<div class="gallery-item" data-gallery-index="' + i + '" data-division="' + d.id + '">' +
        '<div class="gallery-placeholder" style="background:linear-gradient(135deg,' + g.bg + ',' + d.colorLight + ');color:' + d.color + '"><i class="bi ' + g.icon + '"></i></div>' +
        '<div class="gallery-overlay"><span><i class="bi bi-zoom-in"></i> ' + g.title + '</span></div>' +
      '</div>';
    });
    galleryHtml += '</div></div>';

    container.innerHTML = banner + infoCards + membersHtml + wpHtml + calHtml + galleryHtml;

    /* Re-init AOS for new content */
    if (typeof AOS !== 'undefined') AOS.refresh();

    /* Gallery click handlers */
    container.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-gallery-index'), 10);
        openGalleryModal(d, idx);
      });
    });
  }

  /* Gallery Modal */
  function openGalleryModal(d, idx) {
    var modal = document.querySelector('#galleryModal');
    var content = document.querySelector('#galleryModalContent');
    if (!modal || !content) return;
    var g = d.gallery[idx];
    content.innerHTML =
      '<div class="gallery-modal-image" style="background:linear-gradient(135deg,' + g.bg + ',' + d.colorLight + ');color:' + d.color + '"><i class="bi ' + g.icon + '"></i></div>' +
      '<div class="gallery-modal-body">' +
        '<h5>' + g.title + '</h5>' +
        '<p>Divisi ' + d.fullName + ' — Dokumentasi kegiatan ' + g.title + '.</p>' +
      '</div>';
    modal.classList.add('show');
  }

  var modalClose = document.querySelector('#galleryModalClose');
  if (modalClose) {
    modalClose.addEventListener('click', function () {
      var modal = document.querySelector('#galleryModal');
      if (modal) modal.classList.remove('show');
    });
  }
  document.addEventListener('click', function (e) {
    var modal = document.querySelector('#galleryModal');
    if (modal && modal.classList.contains('show') && e.target === modal) {
      modal.classList.remove('show');
    }
  });

  /* Render: Division Statistics */
  function renderDivisionStats() {
    var grid = document.querySelector('#divisionStatsGrid');
    if (!grid) return;
    var d = divisionData.find(function (x) { return x.id === selectedDivision; });
    if (!d) return;
    var s = d.stats;
    var html = '<div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">' +
      '<div class="stat-card"><div class="stat-icon primary"><i class="bi bi-people"></i></div>' +
      '<div class="stat-number" data-counter="' + s.members + '">0</div><p class="stat-label">Total Anggota</p></div></div>' +
      '<div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">' +
      '<div class="stat-card"><div class="stat-icon success"><i class="bi bi-check-circle"></i></div>' +
      '<div class="stat-number" data-counter="' + s.completed + '">0</div><p class="stat-label">Aktivitas Selesai</p></div></div>' +
      '<div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">' +
      '<div class="stat-card"><div class="stat-icon warning"><i class="bi bi-calendar2-event"></i></div>' +
      '<div class="stat-number" data-counter="' + s.upcoming + '">0</div><p class="stat-label">Aktivitas Mendatang</p></div></div>' +
      '<div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">' +
      '<div class="stat-card"><div class="stat-icon danger"><i class="bi bi-graph-up-arrow"></i></div>' +
      '<div class="stat-number" data-counter="' + s.successRate + '" data-suffix="%">0</div><p class="stat-label">Tingkat Keberhasilan</p></div></div>';
    grid.innerHTML = html;

    /* Re-init counters */
    var newCounters = grid.querySelectorAll('[data-counter]');
    newCounters.forEach(function (c) { animateCounter(c); });
  }

  /* Initialize Divisi Page */
  if (document.querySelector('#divisionOverviewGrid')) {
    renderOverviewCards();
    renderDivisionTabs();
    renderDivisionDetail();
    renderDivisionStats();
  }

})();
