<template>
  <AdminLayout title="Kelola Users">
    <DataTable title="Daftar Users" :columns="columns" :items="users" @edit="openEdit" @delete="openDelete">
      <template #header-action>
        <button class="btn btn-primary btn-sm" @click="openCreate"><i class="bi bi-plus-lg me-1"></i> Tambah User</button>
      </template>
      <template #cell-role="{ value }">
        <span class="division-badge" :class="value === 'pimpinan' ? 'div-KWSB' : value === 'anggota' ? 'div-Internal' : 'div-Infokom'">{{ value }}</span>
      </template>
    </DataTable>

    <!-- Form Modal -->
    <FormModal :show="showForm" :title="editingUser ? 'Edit User' : 'Tambah User'" @close="showForm = false" @submit="saveUser">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Nama</label>
        <input type="text" class="form-control" v-model="form.name" style="border-radius:12px" placeholder="Nama lengkap">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Email</label>
        <input type="email" class="form-control" v-model="form.email" style="border-radius:12px" placeholder="email@kampus.ac.id">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Role</label>
        <select class="form-select" v-model="form.role" style="border-radius:12px">
          <option value="anggota">Anggota</option>
          <option value="pengurus">Pengurus</option>
          <option value="pimpinan">Pimpinan</option>
        </select>
      </div>
      <div class="mb-3" v-if="!editingUser">
        <label class="form-label small fw-semibold">Password</label>
        <input type="password" class="form-control" v-model="form.password" style="border-radius:12px" placeholder="Minimal 8 karakter">
      </div>
    </FormModal>

    <!-- Confirm Delete -->
    <ConfirmDialog :show="showDelete" @confirm="confirmDelete" @cancel="showDelete = false" />
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import FormModal from '@/components/admin/FormModal.vue'
import ConfirmDialog from '@/components/admin/ConfirmDialog.vue'
import { getUsers, createUser, updateUser, deleteUser } from '@/services/api'

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
]

const initialUsers = [
  { id: 1, name: 'Ahmad Fauzi Rahman', email: 'ahmad.f@kampus.ac.id', role: 'pimpinan' },
  { id: 2, name: 'Siti Nurhaliza', email: 'siti.n@kampus.ac.id', role: 'pimpinan' },
  { id: 3, name: 'Rizki Maulana', email: 'rizki.m@kampus.ac.id', role: 'pengurus' },
  { id: 4, name: 'Dewi Anjani', email: 'dewi.a@kampus.ac.id', role: 'pengurus' },
  { id: 5, name: 'Nadia Pramita', email: 'nadia.p@kampus.ac.id', role: 'pengurus' },
  { id: 6, name: 'Bayu Setiawan', email: 'bayu.s@kampus.ac.id', role: 'anggota' },
  { id: 7, name: 'Fajar Nugroho', email: 'fajar.n@kampus.ac.id', role: 'anggota' },
]

const users = ref([...initialUsers])
const loading = ref(false)

async function fetchUsersData() {
  loading.value = true
  try {
    const res = await getUsers()
    if (Array.isArray(res) && res.length > 0) {
      users.value = res.map(u => ({
        id: u.id,
        name: u.name || u.nama,
        email: u.email,
        role: u.role || 'anggota'
      }))
    }
  } catch (err) {
    console.warn('Backend API getUsers error, using initial dataset:', err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsersData()
})

const showForm = ref(false)
const showDelete = ref(false)
const editingUser = ref(null)
const deletingUser = ref(null)
const form = reactive({ name: '', email: '', role: 'anggota', password: '' })

function openCreate() {
  editingUser.value = null
  Object.assign(form, { name: '', email: '', role: 'anggota', password: '' })
  showForm.value = true
}

function openEdit(user) {
  editingUser.value = user
  Object.assign(form, { name: user.name, email: user.email, role: user.role, password: '' })
  showForm.value = true
}

function openDelete(user) {
  deletingUser.value = user
  showDelete.value = true
}

async function saveUser() {
  const payload = {
    name: form.name,
    email: form.email,
    role: form.role,
    ...(form.password ? { password: form.password } : {})
  }

  if (editingUser.value) {
    try {
      await updateUser(editingUser.value.id, payload)
    } catch (err) {
      console.warn('Backend API updateUser error:', err.message)
    }
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx >= 0) Object.assign(users.value[idx], { name: form.name, email: form.email, role: form.role })
  } else {
    try {
      const res = await createUser(payload)
      if (res && res.id) payload.id = res.id
    } catch (err) {
      console.warn('Backend API createUser error:', err.message)
    }
    if (!payload.id) payload.id = Date.now()
    users.value.push({ id: payload.id, name: form.name, email: form.email, role: form.role })
  }
  showForm.value = false
}

async function confirmDelete() {
  if (deletingUser.value) {
    try {
      await deleteUser(deletingUser.value.id)
    } catch (err) {
      console.warn('Backend API deleteUser error:', err.message)
    }
    users.value = users.value.filter(u => u.id !== deletingUser.value.id)
  }
  showDelete.value = false
}
</script>
