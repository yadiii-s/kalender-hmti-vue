import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/* ── Public Views ──────────────────────────────────────────────────────── */
import HomeView from '@/views/public/HomeView.vue'
import AgendaView from '@/views/public/AgendaView.vue'
import DivisiView from '@/views/public/DivisiView.vue'
import ProkerView from '@/views/public/ProkerView.vue'
import OrganisasiView from '@/views/public/OrganisasiView.vue'
import LoginView from '@/views/public/LoginView.vue'

/* ── Admin Views (lazy-loaded) ─────────────────────────────────────────── */
const AdminDashboardView = () => import('@/views/admin/AdminDashboardView.vue')
const ManageUsersView = () => import('@/views/admin/ManageUsersView.vue')
const ManageEventsView = () => import('@/views/admin/ManageEventsView.vue')
const ManageDivisionsView = () => import('@/views/admin/ManageDivisionsView.vue')
const AdminCalendarView = () => import('@/views/admin/AdminCalendarView.vue')

const routes = [
  /* ── Public Routes ───────────────────────────────────────────────────── */
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'HMTI BERANDA ' }
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: AgendaView,
    meta: { title: 'Agenda — SIPMA HMJ' }
  },
  {
    path: '/divisi',
    name: 'divisi',
    component: DivisiView,
    meta: { title: 'Divisi — SIPMA HMJ' }
  },
  {
    path: '/proker',
    name: 'proker',
    component: ProkerView,
    meta: { title: 'Program Kerja — SIPMA HMJ' }
  },
  {
    path: '/organisasi',
    name: 'organisasi',
    component: OrganisasiView,
    meta: { title: 'Organisasi — SIPMA HMJ' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Masuk — SIPMA HMJ', guest: true }
  },

  /* ── Admin Routes (requires auth + admin role) ──────────────────────── */
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: { title: 'Admin Dashboard — SIPMA HMJ', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/users',
    redirect: '/admin/divisions'
  },
  {
    path: '/admin/events',
    redirect: '/admin/divisions'
  },
  {
    path: '/admin/divisions',
    name: 'admin-divisions',
    component: ManageDivisionsView,
    meta: { title: 'Kelola Divisi — SIPMA HMJ', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/calendar',
    name: 'admin-calendar',
    component: AdminCalendarView,
    meta: { title: 'Kalender Agenda — SIPMA HMJ', requiresAuth: true, requiresAdmin: true }
  },

  /* ── Catch All → Home ───────────────────────────────────────────────── */
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

/* ── Navigation Guards ─────────────────────────────────────────────────── */
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'SIPMA HMJ'

  const auth = useAuthStore()

  // Guest-only routes (login): redirect to admin dashboard if already logged in
  if (to.meta.guest && auth.isAuthenticated) {
    return next('/admin/dashboard')
  }

  // Auth required
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  // Admin required
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next('/login')
  }

  next()
})

export default router
