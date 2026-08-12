import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginUser, registerUser, logoutUser, getMe } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  /* ── State ────────────────────────────────────────────────────────────── */
  const token = ref(localStorage.getItem('sipma_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('sipma_user') || 'null'))
  const isLoading = ref(false)
  const error = ref(null)

  /* ── Getters ──────────────────────────────────────────────────────────── */
  const isAuthenticated = computed(() => !!token.value)
  const role = computed(() => user.value?.role || user.value?.jabatan || 'guest')

  // Admin: Kahim & Wakahim (Pimpinan)
  const isAdmin = computed(() => {
    const r = role.value
    return ['kahim', 'wakahim', 'admin', 'pimpinan'].includes(r)
  })

  // Sekretaris: Sekum 1, Sekum 2, Sekdiv
  const isSekretaris = computed(() => {
    const r = role.value
    return ['sekum1', 'sekum2', 'sekdiv', 'sekretaris'].includes(r)
  })

  // Bendahara: Bendum 1, Bendum 2, Bendiv
  const isBendahara = computed(() => {
    const r = role.value
    return ['bendum1', 'bendum2', 'bendiv', 'bendahara'].includes(r)
  })

  // Kepala Divisi
  const isKadiv = computed(() => {
    const r = role.value
    return ['kadiv'].includes(r)
  })

  // Anggota / User biasa
  const isAnggota = computed(() => {
    const r = role.value
    return ['anggota', 'user', 'guest'].includes(r)
  })

  // Human readable role label
  const roleLabel = computed(() => {
    if (isAdmin.value) return 'Admin (Pimpinan)'
    if (isSekretaris.value) return 'Sekretaris'
    if (isBendahara.value) return 'Bendahara'
    if (isKadiv.value) return 'Kepala Divisi'
    if (isAnggota.value) return 'Anggota'
    return 'Pengguna'
  })

  const userName = computed(() => user.value?.name || 'Pengguna')
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase()
  })

  // Permissions
  const canCreateEvent = computed(() => isAdmin.value || isSekretaris.value || isKadiv.value)
  const canEditEvent = computed(() => isAdmin.value || isSekretaris.value || isKadiv.value)
  const canDeleteEvent = computed(() => isAdmin.value)
  const canManageFinances = computed(() => isAdmin.value || isBendahara.value)
  const canManageDocs = computed(() => isAdmin.value || isSekretaris.value)

  /* ── Actions ──────────────────────────────────────────────────────────── */

  async function login(credentials) {
    isLoading.value = true
    error.value = null
    try {
      const data = await loginUser(credentials)
      const authToken = data.token || data.access_token
      token.value = authToken
      user.value = data.user
      localStorage.setItem('sipma_token', authToken)
      localStorage.setItem('sipma_user', JSON.stringify(data.user))
      return data
    } catch (err) {
      error.value = err.response?.data?.message || 'Login gagal'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload) {
    isLoading.value = true
    error.value = null
    try {
      const data = await registerUser(payload)
      const authToken = data.token || data.access_token
      if (authToken) {
        token.value = authToken
        localStorage.setItem('sipma_token', authToken)
      }
      if (data.user) {
        user.value = data.user
        localStorage.setItem('sipma_user', JSON.stringify(data.user))
      }
      return data
    } catch (err) {
      error.value = err.response?.data?.message || 'Registrasi gagal'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await logoutUser()
    } catch {
      // Even if the API call fails, clear local state
    }
    token.value = null
    user.value = null
    localStorage.removeItem('sipma_token')
    localStorage.removeItem('sipma_user')
  }

  async function fetchMe() {
    try {
      const data = await getMe()
      user.value = data.user || data
      localStorage.setItem('sipma_user', JSON.stringify(user.value))
    } catch {
      await logout()
    }
  }

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated,
    role,
    isAdmin,
    isSekretaris,
    isBendahara,
    isKadiv,
    isAnggota,
    roleLabel,
    userName,
    userInitials,
    canCreateEvent,
    canEditEvent,
    canDeleteEvent,
    canManageFinances,
    canManageDocs,
    login,
    register,
    logout,
    fetchMe,
  }
})
