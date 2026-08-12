<template>
  <div class="login-page">
    <div class="login-card animate__animated animate__zoomIn">
      <div class="login-logo"><i class="bi bi-calendar2-week"></i></div>
      <h2>Selamat Datang</h2>
      <p class="subtitle">Masuk untuk mengelola kegiatan himpunan mahasiswa</p>

      <div v-if="error" class="alert alert-danger py-2 px-3" style="font-size:0.85rem;border-radius:12px">
        <i class="bi bi-exclamation-circle me-1"></i> {{ error }}
      </div>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="mb-3 position-relative">
          <i class="bi bi-envelope input-icon"></i>
          <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email" required>
            <label for="email">Email</label>
          </div>
        </div>

        <div class="mb-3 position-relative">
          <i class="bi bi-lock input-icon"></i>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Kata Sandi" v-model="form.password" required>
            <label for="password">Kata Sandi</label>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="remember" v-model="form.remember">
            <label class="form-check-label small text-muted" for="remember">Ingat saya</label>
          </div>
          <a href="#" class="small text-decoration-none fw-semibold" style="color:var(--primary)">Lupa sandi?</a>
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="bi bi-box-arrow-in-right"></i>
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <div class="login-divider">atau</div>

      <button class="btn btn-light btn-lg w-100 mb-3" style="border:1.5px solid var(--border)">
        <i class="bi bi-google me-2" style="color:#EA4335"></i> Masuk dengan Google
      </button>

      <p class="back-home">
        Belum punya akun? <a href="#" class="fw-semibold text-decoration-none" style="color:var(--primary)">Daftar di sini</a>
      </p>
      <p class="back-home">
        <router-link to="/" class="text-decoration-none text-muted">
          <i class="bi bi-arrow-left"></i> Kembali ke Beranda
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ email: '', password: '', remember: false })
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await auth.login({ email: form.email, password: form.password })
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Email atau kata sandi salah. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>
