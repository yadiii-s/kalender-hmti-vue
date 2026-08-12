<template>
  <AdminLayout title="Kelola Divisi">
    <!-- Top Header / Bar -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold">Manajemen Divisi Himpunan</h4>
        <p class="text-muted mb-0 small">Pilih salah satu divisi untuk mengelola anggota, agenda, dan program kerja.</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm rounded-pill px-3" @click="openCreateDiv">
          <i class="bi bi-plus-lg me-1"></i> Tambah Divisi
        </button>
      </div>
    </div>

    <!-- Division Cards Grid -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Memuat data divisi...</span>
      </div>
      <p class="mt-2 text-muted small">Memuat daftar divisi dari API...</p>
    </div>

    <div v-else class="row g-4 mb-4">
      <div class="col-12 col-md-6 col-xl-4" v-for="div in divisions" :key="div.id">
        <div 
          class="card border-0 shadow-sm h-100 division-card" 
          style="border-radius:16px; transition: all 0.25s ease; cursor: pointer; overflow: hidden;"
          @click="selectDivision(div)"
        >
          <div class="card-body p-4 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div 
                  class="rounded-3 d-flex align-items-center justify-content-center" 
                  :style="{ width:'48px', height:'48px', background: div.color_soft || div.bg || '#EFF6FF', color: div.color || '#2563EB', fontSize:'1.4rem' }"
                >
                  <i :class="'bi ' + (div.icon || 'bi-diagram-3')"></i>
                </div>
                <div class="dropdown" @click.stop>
                  <button class="btn btn-link text-muted p-1 text-decoration-none" data-bs-toggle="dropdown">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="openEditDiv(div)"><i class="bi bi-pencil me-2"></i>Edit Divisi</a></li>
                    <li><a class="dropdown-item py-2 text-danger" href="#" @click.prevent="openDeleteDiv(div)"><i class="bi bi-trash me-2"></i>Hapus Divisi</a></li>
                  </ul>
                </div>
              </div>

              <h5 class="fw-bold mb-1" :style="{ color: div.color || 'var(--text-main)' }">{{ div.name }}</h5>
              <p class="text-secondary small fw-semibold mb-2">{{ div.full_name || div.name }}</p>
              <p class="text-muted small line-clamp-2 mb-3" style="min-height: 38px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                {{ div.description || 'Tidak ada deskripsi' }}
              </p>
            </div>

            <div>
              <div class="p-2 rounded-3 mb-3" style="background: rgba(0,0,0,0.02); border: 1px dashed rgba(0,0,0,0.08);">
                <div class="d-flex justify-content-between align-items-center small text-muted">
                  <span>Koordinator:</span>
                  <strong class="text-dark">{{ div.coordinator || 'Belum ada' }}</strong>
                </div>
              </div>

              <div class="row g-2 text-center small mb-3">
                <div class="col-4">
                  <div class="p-2 rounded-3 bg-light">
                    <div class="fw-bold text-primary">{{ div.membersList ? div.membersList.length : (div.members_count || 0) }}</div>
                    <div class="text-muted" style="font-size: 0.72rem;">Anggota</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 rounded-3 bg-light">
                    <div class="fw-bold text-success">{{ div.agendaList ? div.agendaList.length : 0 }}</div>
                    <div class="text-muted" style="font-size: 0.72rem;">Agenda</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 rounded-3 bg-light">
                    <div class="fw-bold text-warning">{{ div.prokerList ? div.prokerList.length : (div.work_programs ? div.work_programs.length : 0) }}</div>
                    <div class="text-muted" style="font-size: 0.72rem;">Proker</div>
                  </div>
                </div>
              </div>

              <button class="btn btn-outline-primary btn-sm w-100 rounded-pill fw-semibold" @click.stop="selectDivision(div)">
                <i class="bi bi-gear me-1"></i> Kelola Divisi Ini
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DIVISION MANAGEMENT MODAL / PANEL -->
    <div v-if="activeDiv" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius:20px; overflow:hidden">
          
          <!-- Modal Header -->
          <div class="modal-header border-0 px-4 pt-4 pb-3" :style="{ background: activeDiv.color_soft || '#F8FAFC' }">
            <div class="d-flex align-items-center gap-3">
              <div 
                class="rounded-3 d-flex align-items-center justify-content-center" 
                :style="{ width:'46px', height:'46px', background: activeDiv.color || '#2563EB', color: '#FFF', fontSize:'1.3rem' }"
              >
                <i :class="'bi ' + (activeDiv.icon || 'bi-diagram-3')"></i>
              </div>
              <div>
                <h5 class="modal-title fw-bold mb-0">Kelola Divisi: {{ activeDiv.name }}</h5>
                <span class="text-muted small">{{ activeDiv.full_name || activeDiv.description }}</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-primary btn-sm rounded-pill px-3" @click="openEditDiv(activeDiv)">
                <i class="bi bi-pencil me-1"></i> Edit Deskripsi Divisi
              </button>
              <button type="button" class="btn-close" @click="activeDiv = null"></button>
            </div>
          </div>

          <!-- Tabs Header -->
          <div class="px-4 border-bottom bg-light">
            <ul class="nav nav-tabs border-0" role="tablist">
              <li class="nav-item">
                <button 
                  class="nav-link border-0 py-3 px-4 fw-semibold" 
                  :class="{ active: activeTab === 'members' }"
                  @click="activeTab = 'members'"
                >
                  <i class="bi bi-people me-2"></i>Mengelola Anggota
                  <span class="badge rounded-pill bg-primary ms-1">{{ activeDiv.membersList ? activeDiv.membersList.length : 0 }}</span>
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link border-0 py-3 px-4 fw-semibold" 
                  :class="{ active: activeTab === 'agenda' }"
                  @click="activeTab = 'agenda'"
                >
                  <i class="bi bi-calendar-event me-2"></i>Mengelola Agenda
                  <span class="badge rounded-pill bg-success ms-1">{{ activeDiv.agendaList ? activeDiv.agendaList.length : 0 }}</span>
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link border-0 py-3 px-4 fw-semibold" 
                  :class="{ active: activeTab === 'proker' }"
                  @click="activeTab = 'proker'"
                >
                  <i class="bi bi-journal-check me-2"></i>Mengelola Proker
                  <span class="badge rounded-pill bg-warning text-dark ms-1">{{ activeDiv.prokerList ? activeDiv.prokerList.length : 0 }}</span>
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link border-0 py-3 px-4 fw-semibold" 
                  :class="{ active: activeTab === 'info' }"
                  @click="activeTab = 'info'"
                >
                  <i class="bi bi-info-circle me-2"></i>Deskripsi & Informasi
                </button>
              </li>
            </ul>
          </div>

          <!-- Modal Body (Tab Content) -->
          <div class="modal-body p-4" style="min-height: 380px;">
            
            <!-- TAB 1: MENGELOLA ANGGOTA -->
            <div v-if="activeTab === 'members'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0"><i class="bi bi-people-fill text-primary me-2"></i>Daftar Anggota Divisi {{ activeDiv.name }}</h6>
                <button class="btn btn-primary btn-sm rounded-pill px-3" @click="openAddMember">
                  <i class="bi bi-plus-lg me-1"></i> Tambah Anggota
                </button>
              </div>

              <div v-if="!activeDiv.membersList || activeDiv.membersList.length === 0" class="text-center py-5 text-muted bg-light rounded-4">
                <i class="bi bi-person-x fs-1 opacity-50"></i>
                <p class="mt-2 mb-0">Belum ada anggota di divisi ini.</p>
              </div>

              <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light small">
                    <tr>
                      <th>Nama Anggota</th>
                      <th>Jabatan</th>
                      <th>Angkatan</th>
                      <th>Kontak</th>
                      <th class="text-end">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(m, idx) in activeDiv.membersList" :key="m.id || idx">
                      <td>
                        <div class="d-flex align-items-center gap-2">
                          <div class="avatar-circle bg-primary-soft text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style="width:34px;height:34px">
                            {{ (m.name || 'A').charAt(0) }}
                          </div>
                          <div>
                            <strong class="d-block">{{ m.name }}</strong>
                            <small class="text-muted">{{ m.email || '-' }}</small>
                          </div>
                        </div>
                      </td>
                      <td><span class="badge bg-soft-primary text-primary px-2 py-1 rounded-pill">{{ m.position || 'Anggota' }}</span></td>
                      <td>{{ m.batch || '-' }}</td>
                      <td>{{ m.phone || '-' }}</td>
                      <td class="text-end">
                        <button class="btn btn-outline-secondary btn-sm me-1 rounded-circle" style="width:30px;height:30px;padding:0" @click="openEditMember(m)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-circle" style="width:30px;height:30px;padding:0" @click="deleteMemberItem(m)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 2: MENGELOLA AGENDA -->
            <div v-if="activeTab === 'agenda'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0"><i class="bi bi-calendar2-event-fill text-success me-2"></i>Daftar Agenda {{ activeDiv.name }}</h6>
                <button class="btn btn-success btn-sm text-white rounded-pill px-3" @click="openAddAgenda">
                  <i class="bi bi-plus-lg me-1"></i> Tambah Agenda
                </button>
              </div>

              <div v-if="!activeDiv.agendaList || activeDiv.agendaList.length === 0" class="text-center py-5 text-muted bg-light rounded-4">
                <i class="bi bi-calendar-x fs-1 opacity-50"></i>
                <p class="mt-2 mb-0">Belum ada agenda/kegiatan terdaftar untuk divisi ini.</p>
              </div>

              <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light small">
                    <tr>
                      <th>Judul Agenda</th>
                      <th>Waktu / Tanggal</th>
                      <th>Lokasi</th>
                      <th>PIC</th>
                      <th>Status</th>
                      <th class="text-end">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ag, idx) in activeDiv.agendaList" :key="ag.id || idx">
                      <td>
                        <strong>{{ ag.title }}</strong>
                        <div class="small text-muted text-truncate" style="max-width:200px">{{ ag.description }}</div>
                      </td>
                      <td>
                        <small class="fw-semibold text-secondary">
                          <i class="bi bi-calendar3 me-1"></i>
                          {{ formatTanggalShort(ag.start_time || ag.start || ag.date) }}
                          <span v-if="(ag.end_time || ag.end) && formatTanggalShort(ag.end_time || ag.end) !== formatTanggalShort(ag.start_time || ag.start || ag.date)">
                            s.d. {{ formatTanggalShort(ag.end_time || ag.end) }}
                          </span>
                        </small>
                      </td>
                      <td><small>{{ ag.location || '-' }}</small></td>
                      <td><small>{{ ag.pic || '-' }}</small></td>
                      <td>
                        <span 
                          class="badge rounded-pill" 
                          :class="{
                            'bg-success': ag.status === 'Berlangsung' || ag.status === 'Selesai',
                            'bg-primary': ag.status === 'Mendatang',
                            'bg-secondary': !ag.status
                          }"
                        >
                          {{ ag.status || 'Mendatang' }}
                        </span>
                      </td>
                      <td class="text-end">
                        <button class="btn btn-outline-secondary btn-sm me-1 rounded-circle" style="width:30px;height:30px;padding:0" @click="openEditAgenda(ag)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-circle" style="width:30px;height:30px;padding:0" @click="deleteAgendaItem(ag)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 3: MENGELOLA PROKER -->
            <div v-if="activeTab === 'proker'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0"><i class="bi bi-journal-check text-warning me-2"></i>Daftar Program Kerja {{ activeDiv.name }}</h6>
                <button class="btn btn-warning btn-sm text-dark rounded-pill px-3" @click="openAddProker">
                  <i class="bi bi-plus-lg me-1"></i> Tambah Proker
                </button>
              </div>

              <div v-if="!activeDiv.prokerList || activeDiv.prokerList.length === 0" class="text-center py-5 text-muted bg-light rounded-4">
                <i class="bi bi-journal-x fs-1 opacity-50"></i>
                <p class="mt-2 mb-0">Belum ada program kerja untuk divisi ini.</p>
              </div>

              <div v-else class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light small">
                    <tr>
                      <th>Nama Proker</th>
                      <th>Jadwal / Pelaksanaan</th>
                      <th>PIC</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th class="text-end">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pr, idx) in activeDiv.prokerList" :key="pr.id || idx">
                      <td><strong>{{ pr.name }}</strong></td>
                      <td><small>{{ pr.date || '-' }}</small></td>
                      <td><small>{{ pr.pic || '-' }}</small></td>
                      <td style="width:160px">
                        <div class="d-flex align-items-center gap-2">
                          <div class="progress flex-grow-1" style="height: 8px;">
                            <div class="progress-bar bg-warning" role="progressbar" :style="{ width: (pr.progress || 0) + '%' }"></div>
                          </div>
                          <span class="small fw-bold" style="font-size:0.75rem">{{ pr.progress || 0 }}%</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          class="badge rounded-pill"
                          :class="{
                            'bg-success': pr.status === 'Selesai',
                            'bg-info text-dark': pr.status === 'Berjalan' || pr.status === 'Proses',
                            'bg-secondary': pr.status === 'Perencanaan' || !pr.status
                          }"
                        >
                          {{ pr.status || 'Perencanaan' }}
                        </span>
                      </td>
                      <td class="text-end">
                        <button class="btn btn-outline-secondary btn-sm me-1 rounded-circle" style="width:30px;height:30px;padding:0" @click="openEditProker(pr)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-circle" style="width:30px;height:30px;padding:0" @click="deleteProkerItem(pr)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 4: DESKRIPSI & INFORMASI DIVISI -->
            <div v-if="activeTab === 'info'">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0"><i class="bi bi-info-circle-fill text-info me-2"></i>Deskripsi & Informasi Divisi {{ activeDiv.name }}</h6>
                <button class="btn btn-primary btn-sm rounded-pill px-3" @click="saveDivInfoFromTab">
                  <i class="bi bi-check-lg me-1"></i> Simpan Deskripsi ke API
                </button>
              </div>

              <div class="card border-0 bg-light p-4 rounded-4 mb-3">
                <div class="mb-3">
                  <label class="form-label small fw-semibold">Deskripsi Divisi</label>
                  <textarea class="form-control" v-model="activeDiv.description" rows="3" style="border-radius:12px" placeholder="Masukkan deskripsi divisi..."></textarea>
                </div>
                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <label class="form-label small fw-semibold">Visi Divisi</label>
                    <textarea class="form-control" v-model="activeDiv.vision" rows="2" style="border-radius:12px" placeholder="Masukkan visi divisi..."></textarea>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-semibold">Misi Divisi</label>
                    <textarea class="form-control" v-model="activeDiv.mission" rows="2" style="border-radius:12px" placeholder="Masukkan misi divisi..."></textarea>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label small fw-semibold">Koordinator Divisi</label>
                    <input type="text" class="form-control" v-model="activeDiv.coordinator" style="border-radius:12px">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-semibold">Tahun Berdiri</label>
                    <input type="number" class="form-control" v-model.number="activeDiv.established_year" placeholder="2018" style="border-radius:12px">
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer border-0 bg-light px-4">
            <button type="button" class="btn btn-secondary rounded-pill px-4" @click="activeDiv = null">Tutup</button>
          </div>

        </div>
      </div>
    </div>

    <!-- SUB-MODAL FORM FOR ANGGOTA -->
    <FormModal :show="showMemberForm" :title="editingMember ? 'Edit Anggota Divisi' : 'Tambah Anggota Divisi'" @close="showMemberForm = false" @submit="saveMember">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama Lengkap</label>
        <input type="text" class="form-control" v-model="memberForm.name" required style="border-radius:12px">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Jabatan</label>
        <input type="text" class="form-control" v-model="memberForm.position" placeholder="e.g. Koordinator, Anggota" style="border-radius:12px">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Angkatan</label>
          <input type="text" class="form-control" v-model="memberForm.batch" placeholder="2023" style="border-radius:12px">
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">No HP</label>
          <input type="text" class="form-control" v-model="memberForm.phone" placeholder="0812..." style="border-radius:12px">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Email</label>
        <input type="email" class="form-control" v-model="memberForm.email" placeholder="nama@hmti.or.id" style="border-radius:12px">
      </div>
    </FormModal>

    <!-- SUB-MODAL FORM FOR AGENDA -->
    <FormModal :show="showAgendaForm" :title="editingAgenda ? 'Edit Agenda Divisi' : 'Tambah Agenda Divisi'" @close="showAgendaForm = false" @submit="saveAgenda">
      <!-- Conflict Warning Banner -->
      <div v-if="agendaConflictWarning" class="alert alert-warning border-0 rounded-3 mb-3 p-3 d-flex align-items-start gap-2">
        <i class="bi bi-exclamation-triangle-fill text-warning fs-5 flex-shrink-0"></i>
        <div>
          <strong class="d-block text-dark">Peringatan Tanggal Bentrok!</strong>
          <span class="small text-muted">{{ agendaConflictWarning }}</span>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label small fw-semibold">Judul Agenda / Event</label>
        <input type="text" class="form-control" v-model="agendaForm.title" required style="border-radius:12px">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Tanggal Mulai</label>
          <input type="date" class="form-control" v-model="agendaForm.start_time" required style="border-radius:12px" @change="checkAgendaDateConflict">
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">Tanggal Berakhir</label>
          <input type="date" class="form-control" v-model="agendaForm.end_time" required style="border-radius:12px">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Status Agenda</label>
        <select class="form-select" v-model="agendaForm.status" style="border-radius:12px">
          <option value="Mendatang">Mendatang</option>
          <option value="Berlangsung">Berlangsung</option>
          <option value="Selesai">Selesai</option>
          <option value="Persiapan">Persiapan</option>
        </select>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Lokasi</label>
          <input type="text" class="form-control" v-model="agendaForm.location" required style="border-radius:12px">
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">PIC (Penanggung Jawab)</label>
          <div class="input-group">
            <input 
              type="text" 
              class="form-control" 
              v-model="agendaForm.pic" 
              required
              :list="'agenda-pic-list-' + (activeDiv ? activeDiv.id : '0')"
              placeholder="Cari atau pilih anggota..."
              style="border-radius:12px 0 0 12px"
            >
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style="border-radius:0 12px 12px 0">
              Pilih
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" style="max-height:220px; overflow-y:auto">
              <li v-for="m in getMemberOptions(activeDiv)" :key="m.name">
                <a class="dropdown-item d-flex justify-content-between align-items-center py-2" href="#" @click.prevent="agendaForm.pic = m.name">
                  <span class="fw-semibold">{{ m.name }}</span>
                  <span class="badge bg-light text-dark border ms-2">{{ m.position || 'Anggota' }}</span>
                </a>
              </li>
              <li v-if="getMemberOptions(activeDiv).length === 0" class="dropdown-item text-muted small">
                Belum ada anggota
              </li>
            </ul>
          </div>
          <datalist :id="'agenda-pic-list-' + (activeDiv ? activeDiv.id : '0')">
            <option v-for="m in getMemberOptions(activeDiv)" :key="m.name" :value="m.name">
              {{ m.position || 'Anggota Divisi' }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Deskripsi</label>
        <textarea class="form-control" v-model="agendaForm.description" rows="2" style="border-radius:12px"></textarea>
      </div>
    </FormModal>

    <!-- SUB-MODAL FORM FOR PROKER -->
    <FormModal :show="showProkerForm" :title="editingProker ? 'Edit Program Kerja' : 'Tambah Program Kerja'" @close="showProkerForm = false" @submit="saveProker">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama Program Kerja</label>
        <input type="text" class="form-control" v-model="prokerForm.name" required style="border-radius:12px">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Jadwal / Pelaksanaan</label>
          <input type="date" class="form-control" v-model="prokerForm.date" required style="border-radius:12px">
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">PIC (Penanggung Jawab)</label>
          <div class="input-group">
            <input 
              type="text" 
              class="form-control" 
              v-model="prokerForm.pic" 
              required
              :list="'proker-pic-list-' + (activeDiv ? activeDiv.id : '0')"
              placeholder="Cari atau pilih anggota..."
              style="border-radius:12px 0 0 12px"
            >
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" style="border-radius:0 12px 12px 0">
              Pilih
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" style="max-height:220px; overflow-y:auto">
              <li v-for="m in getMemberOptions(activeDiv)" :key="m.name">
                <a class="dropdown-item d-flex justify-content-between align-items-center py-2" href="#" @click.prevent="prokerForm.pic = m.name">
                  <span class="fw-semibold">{{ m.name }}</span>
                  <span class="badge bg-light text-dark border ms-2">{{ m.position || 'Anggota' }}</span>
                </a>
              </li>
              <li v-if="getMemberOptions(activeDiv).length === 0" class="dropdown-item text-muted small">
                Belum ada anggota
              </li>
            </ul>
          </div>
          <datalist :id="'proker-pic-list-' + (activeDiv ? activeDiv.id : '0')">
            <option v-for="m in getMemberOptions(activeDiv)" :key="m.name" :value="m.name">
              {{ m.position || 'Anggota Divisi' }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Status</label>
          <select class="form-select" v-model="prokerForm.status" style="border-radius:12px">
            <option value="Perencanaan">Perencanaan</option>
            <option value="Berjalan">Berjalan</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">Progress (%)</label>
          <input type="number" min="0" max="100" class="form-control" v-model.number="prokerForm.progress" style="border-radius:12px">
        </div>
      </div>
    </FormModal>

    <!-- FORM MODAL FOR CREATE/EDIT TOP LEVEL DIVISION -->
    <FormModal :show="showDivForm" :title="editingDiv ? 'Edit Divisi' : 'Tambah Divisi Baru'" @close="showDivForm = false" @submit="saveDiv">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama Divisi (Singkatan)</label>
        <input type="text" class="form-control" v-model="divForm.name" required style="border-radius:12px" placeholder="e.g. KWSB, Infokom">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama Lengkap Divisi</label>
        <input type="text" class="form-control" v-model="divForm.full_name" style="border-radius:12px" placeholder="e.g. Informasi dan Komunikasi">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Tahun Berdiri</label>
        <input type="number" class="form-control" v-model.number="divForm.established_year" placeholder="2018" style="border-radius:12px">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Deskripsi Divisi</label>
        <textarea class="form-control" v-model="divForm.description" rows="3" style="border-radius:12px" placeholder="Deskripsi peran dan tugas divisi..."></textarea>
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small fw-semibold">Visi Divisi</label>
          <textarea class="form-control" v-model="divForm.vision" rows="2" style="border-radius:12px"></textarea>
        </div>
        <div class="col-6">
          <label class="form-label small fw-semibold">Misi Divisi</label>
          <textarea class="form-control" v-model="divForm.mission" rows="2" style="border-radius:12px"></textarea>
        </div>
      </div>
    </FormModal>

    <ConfirmDialog :show="showDelete" @confirm="confirmDelete" @cancel="showDelete = false" />
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import FormModal from '@/components/admin/FormModal.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'
import { 
  getDivisions, 
  createDivision, 
  updateDivision, 
  deleteDivision,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  addWorkProgram,
  updateWorkProgram,
  deleteWorkProgram,
  addDivisionMember,
  updateDivisionMember,
  deleteDivisionMember,
  formatTanggalShort
} from '@/services/api'

// Fallback dataset if API returns empty
const defaultDivisions = [
  { id: 1, name: 'KWSB', full_name: 'Ketertiban, Wewenang & Badan Pengawas', coordinator: 'Rizki Maulana', icon: 'bi-shield-check', color: '#2563EB', color_soft: '#EFF6FF', description: 'Pengawasan kepatuhan terhadap AD/ART dan evaluasi kinerja.' },
  { id: 2, name: 'Internal', full_name: 'Hubungan Internal & Kaderisasi', coordinator: 'Dewi Anjani', icon: 'bi-people-fill', color: '#22C55E', color_soft: '#F0FDF4', description: 'Mengelola hubungan antar anggota dan kaderisasi SDM.' },
  { id: 3, name: 'Eksternal', full_name: 'Hubungan Eksternal & Kemitraan', coordinator: 'Hendra Wijaya', icon: 'bi-globe2', color: '#F97316', color_soft: '#FFF7ED', description: 'Membangun jejaring dan kerja sama dengan pihak industri.' },
  { id: 4, name: 'Minbak', full_name: 'Minat & Bakat / Penatausahaan', coordinator: 'Sari Wulandari', icon: 'bi-journal-text', color: '#8B5CF6', color_soft: '#F5F3FF', description: 'Penatausahaan administrasi dan pengembangan minat bakat.' },
  { id: 5, name: 'Sosma', full_name: 'Sosial Masyarakat', coordinator: 'Bayu Setiawan', icon: 'bi-heart-pulse', color: '#EF4444', color_soft: '#FEF2F2', description: 'Pengembangan sosial dan kegiatan pengabdian masyarakat.' },
  { id: 6, name: 'Infokom', full_name: 'Informasi & Komunikasi', coordinator: 'Nadia Pramita', icon: 'bi-broadcast-pin', color: '#06B6D4', color_soft: '#ECFEFF', description: 'Informasi, publikasi, dan pengelolaan teknologi komunikasi.' },
  { id: 7, name: 'KWU', full_name: 'Kewirausahaan', coordinator: 'Fajar Nugroho', icon: 'bi-bag-check', color: '#EAB308', color_soft: '#FEFCE8', description: 'Kewirausahaan dan pengembangan unit usaha mahasiswa.' },
]

const divisions = ref([])
const allEvents = ref([])
const loading = ref(true)

const activeDiv = ref(null)
const activeTab = ref('members') // 'members', 'agenda', 'proker'

// Fetch All Divisions & Agenda Events from API
async function loadData() {
  loading.value = true
  try {
    const [divRes, eventRes] = await Promise.allSettled([getDivisions(), getEvents()])
    
    let loadedDivisions = []
    if (divRes.status === 'fulfilled' && Array.isArray(divRes.value) && divRes.value.length > 0) {
      loadedDivisions = divRes.value
    } else {
      loadedDivisions = defaultDivisions
    }

    if (eventRes.status === 'fulfilled' && Array.isArray(eventRes.value)) {
      allEvents.value = eventRes.value
    }

    divisions.value = loadedDivisions.map(d => mapDivisionItem(d))
  } catch (err) {
    console.warn('Error loading divisions data:', err)
    divisions.value = defaultDivisions.map(d => mapDivisionItem(d))
  } finally {
    loading.value = false
  }
}

function getMemberOptions(div) {
  if (!div) return []
  const list = []
  const seen = new Set()

  if (div.coordinator && div.coordinator !== 'Belum ada') {
    list.push({ name: div.coordinator, position: 'Koordinator Divisi' })
    seen.add(div.coordinator.toLowerCase())
  }

  if (Array.isArray(div.membersList)) {
    div.membersList.forEach(m => {
      if (m && m.name && !seen.has(m.name.toLowerCase())) {
        list.push({ name: m.name, position: m.position || 'Anggota' })
        seen.add(m.name.toLowerCase())
      }
    })
  }

  return list
}

function mapDivisionItem(d) {
  const membersList = d.members || []
  const prokerList = d.work_programs || []

  // Filter events belonging to this division
  const agendaList = allEvents.value.filter(e => 
    e.division && e.division.toLowerCase() === d.name.toLowerCase()
  )

  return {
    ...d,
    name: d.name || d.nama,
    full_name: d.full_name || d.name,
    coordinator: d.coordinator || d.koordinator || 'Belum ada',
    membersList,
    prokerList,
    agendaList
  }
}

function selectDivision(div) {
  activeDiv.value = div
  activeTab.value = 'members'
}

onMounted(() => {
  loadData()
})

/* ── Top Level Division CRUD ─────────────────────────────────────────────── */
const showDivForm = ref(false)
const editingDiv = ref(null)
const divForm = reactive({ name: '', full_name: '', description: '', vision: '', mission: '', established_year: '' })
const showDelete = ref(false)
const deletingDiv = ref(null)

function openCreateDiv() {
  editingDiv.value = null
  Object.assign(divForm, { name: '', full_name: '', description: '', vision: '', mission: '', established_year: '' })
  showDivForm.value = true
}

function openEditDiv(div) {
  editingDiv.value = div
  Object.assign(divForm, { 
    name: div.name, 
    full_name: div.full_name || div.name, 
    description: div.description || '',
    vision: div.vision || '',
    mission: div.mission || '',
    established_year: div.established_year || ''
  })
  showDivForm.value = true
}

function openDeleteDiv(div) {
  deletingDiv.value = div
  showDelete.value = true
}

async function saveDiv() {
  const payload = { ...divForm }
  if (editingDiv.value) {
    try { 
      await updateDivision(editingDiv.value.id, payload) 
    } catch (err) { 
      console.warn('Backend API updateDivision error:', err) 
    }
    const idx = divisions.value.findIndex(d => d.id === editingDiv.value.id)
    if (idx >= 0) {
      Object.assign(divisions.value[idx], payload)
    }
    if (activeDiv.value && activeDiv.value.id === editingDiv.value.id) {
      Object.assign(activeDiv.value, payload)
    }
  } else {
    try {
      const res = await createDivision(payload)
      if (res && res.id) payload.id = res.id
    } catch (err) { console.warn(err) }
    if (!payload.id) payload.id = Date.now()
    divisions.value.push(mapDivisionItem({ ...payload, color: '#2563EB', color_soft: '#EFF6FF', icon: 'bi-diagram-3' }))
  }
  showDivForm.value = false
}

async function saveDivInfoFromTab() {
  if (!activeDiv.value) return
  const payload = {
    name: activeDiv.value.name,
    full_name: activeDiv.value.full_name,
    coordinator: activeDiv.value.coordinator,
    description: activeDiv.value.description,
    vision: activeDiv.value.vision,
    mission: activeDiv.value.mission,
    established_year: activeDiv.value.established_year
  }
  try {
    await updateDivision(activeDiv.value.id, payload)
  } catch (err) {
    console.warn('Backend API updateDivision error:', err)
  }
  const idx = divisions.value.findIndex(d => d.id === activeDiv.value.id)
  if (idx >= 0) {
    Object.assign(divisions.value[idx], payload)
  }
}

async function confirmDelete() {
  if (deletingDiv.value) {
    try { await deleteDivision(deletingDiv.value.id) } catch (err) { console.warn(err) }
    divisions.value = divisions.value.filter(d => d.id !== deletingDiv.value.id)
  }
  showDelete.value = false
}

/* ── Tab 1: Anggota Management ───────────────────────────────────────────── */
const showMemberForm = ref(false)
const editingMember = ref(null)
const memberForm = reactive({ name: '', position: '', batch: '', phone: '', email: '' })

function openAddMember() {
  editingMember.value = null
  Object.assign(memberForm, { name: '', position: 'Anggota', batch: '2024', phone: '', email: '' })
  showMemberForm.value = true
}

function openEditMember(m) {
  editingMember.value = m
  Object.assign(memberForm, { name: m.name, position: m.position, batch: m.batch, phone: m.phone, email: m.email })
  showMemberForm.value = true
}

async function saveMember() {
  if (!activeDiv.value) return
  const payload = { ...memberForm }

  if (editingMember.value) {
    try {
      if (editingMember.value.id && editingMember.value.id < 1000) {
        await updateDivisionMember(editingMember.value.id, payload)
      }
    } catch (err) { console.warn(err) }
    Object.assign(editingMember.value, payload)
  } else {
    try {
      const res = await addDivisionMember(activeDiv.value.id, payload)
      if (res && res.data && res.data.id) payload.id = res.data.id
    } catch (err) { console.warn(err) }
    if (!payload.id) payload.id = Date.now()
    activeDiv.value.membersList.push(payload)
  }
  showMemberForm.value = false
}

async function deleteMemberItem(m) {
  if (!activeDiv.value) return
  if (confirm(`Hapus anggota "${m.name}"?`)) {
    try {
      if (m.id && m.id < 1000) await deleteDivisionMember(m.id)
    } catch (err) { console.warn(err) }
    activeDiv.value.membersList = activeDiv.value.membersList.filter(item => item !== m)
  }
}

/* ── Tab 2: Agenda Management ────────────────────────────────────────────── */
const showAgendaForm = ref(false)
const editingAgenda = ref(null)
const agendaConflictWarning = ref('')
const agendaForm = reactive({ title: '', start_time: '', end_time: '', location: '', pic: '', status: 'Mendatang', description: '' })

async function checkAgendaDateConflict() {
  if (!agendaForm.start_time) {
    agendaConflictWarning.value = ''
    return
  }

  const dateStr = agendaForm.start_time.substring(0, 10)
  try {
    const res = await checkEventConflict({
      date: dateStr,
      event_id: editingAgenda.value ? editingAgenda.value.id : null
    })
    if (res && res.has_conflict && res.conflicting_events?.length > 0) {
      const clashList = res.conflicting_events.map(c => `"${c.title}" (${c.division})`).join(', ')
      agendaConflictWarning.value = `Tanggal ${formatTanggalShort(dateStr)} sudah ada agenda dari divisi lain: ${clashList}.`
    } else {
      agendaConflictWarning.value = ''
    }
  } catch (err) {
    agendaConflictWarning.value = ''
  }
}

function openAddAgenda() {
  editingAgenda.value = null
  agendaConflictWarning.value = ''
  const today = new Date().toISOString().substring(0, 10)
  Object.assign(agendaForm, { 
    title: '', 
    start_time: today, 
    end_time: today, 
    location: 'Sekretariat HMJ', 
    pic: activeDiv.value ? activeDiv.value.coordinator : '', 
    status: 'Mendatang', 
    description: '' 
  })
  showAgendaForm.value = true
  checkAgendaDateConflict()
}

function openEditAgenda(ag) {
  editingAgenda.value = ag
  agendaConflictWarning.value = ''
  const startVal = ag.start_time ? String(ag.start_time).substring(0, 10) : (ag.date ? String(ag.date).substring(0, 10) : '')
  const endVal = ag.end_time ? String(ag.end_time).substring(0, 10) : startVal
  Object.assign(agendaForm, { 
    title: ag.title, 
    start_time: startVal, 
    end_time: endVal, 
    location: ag.location || '', 
    pic: ag.pic || '', 
    status: ag.status || 'Mendatang', 
    description: ag.description || '' 
  })
  showAgendaForm.value = true
  checkAgendaDateConflict()
}

async function saveAgenda() {
  if (!activeDiv.value) return
  if (agendaConflictWarning.value) {
    const proceed = confirm(`PERINGATAN TANGGAL BENTROK:\n${agendaConflictWarning.value}\n\nApakah Anda yakin ingin tetap menyimpan agenda ini?`)
    if (!proceed) return
  }

  const payload = { 
    ...agendaForm, 
    division: activeDiv.value.name 
  }

  if (editingAgenda.value) {
    try {
      if (editingAgenda.value.id && editingAgenda.value.id < 1000) {
        await updateEvent(editingAgenda.value.id, payload)
      }
    } catch (err) { console.warn(err) }
    Object.assign(editingAgenda.value, payload)
  } else {
    try {
      const res = await createEvent(payload)
      if (res && res.id) payload.id = res.id
    } catch (err) { console.warn(err) }
    if (!payload.id) payload.id = Date.now()
    activeDiv.value.agendaList.push(payload)
  }
  showAgendaForm.value = false
}

async function deleteAgendaItem(ag) {
  if (!activeDiv.value) return
  if (confirm(`Hapus agenda "${ag.title}"?`)) {
    try {
      if (ag.id && ag.id < 1000) await deleteEvent(ag.id)
    } catch (err) { console.warn(err) }
    activeDiv.value.agendaList = activeDiv.value.agendaList.filter(item => item !== ag)
  }
}

/* ── Tab 3: Proker Management ────────────────────────────────────────────── */
const showProkerForm = ref(false)
const editingProker = ref(null)
const prokerForm = reactive({ name: '', date: '', pic: '', status: 'Perencanaan', progress: 0 })

function openAddProker() {
  editingProker.value = null
  Object.assign(prokerForm, { name: '', date: '', pic: activeDiv.value ? activeDiv.value.coordinator : '', status: 'Perencanaan', progress: 0 })
  showProkerForm.value = true
}

function openEditProker(pr) {
  editingProker.value = pr
  Object.assign(prokerForm, { name: pr.name, date: pr.date, pic: pr.pic, status: pr.status, progress: pr.progress || 0 })
  showProkerForm.value = true
}

async function saveProker() {
  if (!activeDiv.value) return
  const payload = { ...prokerForm }

  if (editingProker.value) {
    try {
      if (editingProker.value.id && editingProker.value.id < 1000) {
        await updateWorkProgram(editingProker.value.id, payload)
      }
    } catch (err) { console.warn(err) }
    Object.assign(editingProker.value, payload)
  } else {
    try {
      const res = await addWorkProgram(activeDiv.value.id, payload)
      if (res && res.id) payload.id = res.id
    } catch (err) { console.warn(err) }
    if (!payload.id) payload.id = Date.now()
    activeDiv.value.prokerList.push(payload)
  }
  showProkerForm.value = false
}

async function deleteProkerItem(pr) {
  if (!activeDiv.value) return
  if (confirm(`Hapus proker "${pr.name}"?`)) {
    try {
      if (pr.id && pr.id < 1000) await deleteWorkProgram(pr.id)
    } catch (err) { console.warn(err) }
    activeDiv.value.prokerList = activeDiv.value.prokerList.filter(item => item !== pr)
  }
}
</script>

<style scoped>
.division-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
}
.bg-soft-primary {
  background-color: var(--primary-soft, #EFF6FF);
}
</style>
